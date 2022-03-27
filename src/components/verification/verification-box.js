import { 
    VStack, Text, HStack, Box, Button, useDisclosure,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, 
    ModalBody, ModalFooter, Image, Grid, GridItem, CircularProgress
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { getProjectOwner, approveProjectOwner, rejectProjectOwner } from "../../api/verification/projectOwner/projectOwner-verification-api";

function VerificationModal({isOpen, onClose, _id, setHide}){
    const [load, setLoad] = useState(false);
    const [data, setData] = useState({});

    const approve = () =>{
        approveProjectOwner(_id);
        setHide(true);
    }

    const reject = () =>{
        rejectProjectOwner(_id);
        setHide(true);
    }
    
    useEffect(()=>{
        if (isOpen && !load){
            getProjectOwner(_id)
                .then(res => {setData(res.data);setLoad(true);})
        }
    }, [isOpen]);

    if(!load)
        return(
            <>
                <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
                    <ModalOverlay/>
                    <ModalContent>
                    <ModalHeader></ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <CircularProgress isIndeterminate color='green.300' />
                    </ModalBody>
                    </ModalContent>
                </Modal>
            </>
        )
        
    return(
        <div>
            <Modal isOpen={isOpen} onClose={onClose} size={'xl'}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>{data.firstname} {data.lastname}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack alignItems="flex-start">
                        <HStack>
                            <Text xs={2} fontWeight="semibold">ข้อมูลส่วนบุคคล :</Text>
                        </HStack>
                        <HStack>
                            <Text>ชื่อ : </Text>
                            <Text>{data.firstname}</Text>
                            <Text>สกุล : </Text>
                            <Text>{data.lastname}</Text>
                        </HStack>
                        <HStack>
                            <Text xs={2}>เลขบัตรประชาชน :</Text>
                            <Text xs={2}>{data.idCardNumber}</Text>
                        </HStack>
                        <HStack>
                            <Text xs={2}>วันเดือนปีเกิด :</Text>
                            <Text xs={2}>{data.birthdate.slice(0, 10)}</Text>
                        </HStack>
                        <HStack>
                            <Text xs={2} fontWeight="semibold">ที่อยู่ :</Text>
                        </HStack>
                        <HStack>
                            <Text xs={2}>จังหวัด :</Text>
                            <Text xs={2}>{data.province}</Text>
                            <Text xs={2}>อำเภอ/เขต :</Text>
                            <Text xs={2}>{data.district}</Text>
                        </HStack>
                        <HStack>
                            <Text xs={2}>ตำบล/แขวง :</Text>
                            <Text xs={2}>{data.subdistrict}</Text>
                            <Text xs={2}>รหัสไปรษณีย์ :</Text>
                            <Text xs={2}>{data.postcode}</Text>
                        </HStack>
                        <HStack>
                            <Text xs={2} fontWeight="semibold">ข้อมูลบัญชีธนาคาร :</Text>
                        </HStack>
                        <HStack>
                            <Text xs={2}>ชื่อบัญชีธนาคาร :</Text>
                            <Text xs={2}>{data.bankAccountName}</Text>
                        </HStack>
                        <HStack>
                            <Text xs={2}>เลขที่ปัญชี :</Text>
                            <Text xs={2}>{data.bankAccountNumber}</Text>
                        </HStack>
                        <HStack>
                            <Text xs={2}>ธนาคาร :</Text>
                            <Text xs={2}>{data.bankAccountBank}</Text>
                        </HStack>
                        <HStack>
                            <Text xs={2} fontWeight="semibold">รูปถ่ายหน้าสมุดบัญชี :</Text>
                        </HStack>
                        <Image  src="https://www.kasikornbank.com/th/personal/Digital-banking/PublishingImages/KCID/ESA11.jpg" 
                                alt="รูปถ่ายหน้าสมุดบัญชี" 
                                alignSelf="center"
                                width="400" 
                                height="600">
                        </Image>
                        <HStack>
                            <Text xs={2} fontWeight="semibold">รูปบัตรประชาชน :</Text>
                        </HStack>
                        <Image  src="https://tdc-images.tolunastart-tdcprod.com/2018/03/19/e4aff31c-15a1-4717-826d-8e7a9ca83cb1.jpg" 
                                alt="รูปบัตรประชาชน" 
                                alignSelf="center"
                                width="400" 
                                height="600">
                        </Image>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button variant='ghost' onClick={onClose} mx = {1}>Close</Button>
                    <Button colorScheme='pink' variant='solid' mx = {1} onClick = {reject}>Reject</Button>
                    <Button colorScheme='teal' variant='solid' mx = {1} onClick = {approve}>Approve</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

function VerificcationBox({ _id, firstname, lastname }){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ hide, setHide ] = useState(false);
    return(
        !hide&&<>
            <Box  w="1000px" borderWidth="1px">
                <Grid templateColumns='repeat(5, 1fr)' gap={4} p={1} >
                    <GridItem colSpan={2}>
                        <HStack>
                            <Text>ชื่อ : </Text>
                            <Text fontWeight="bold">{firstname}</Text>
                        </HStack>
                    </GridItem>
                    <GridItem colSpan={2}>
                        <HStack>
                            <Text>นามสกุล : </Text>
                            <Text fontWeight="bold">{lastname}</Text>
                        </HStack>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Button onClick={onOpen}>ตรวจสอบ</Button>
                    </GridItem>
                </Grid>
            </Box>
            <VerificationModal isOpen = {isOpen} onClose = {onClose} _id = {_id} setHide = {setHide}/>
        </>
    );
}

export default VerificcationBox;