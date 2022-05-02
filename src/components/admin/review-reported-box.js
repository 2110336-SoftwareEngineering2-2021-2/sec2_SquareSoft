import { 
    VStack, Text, HStack, Box, Button, useDisclosure,
    Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, 
    ModalBody, ModalFooter, Grid, GridItem, CircularProgress, Spacer,
    Icon
} from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import { StarIcon } from '@chakra-ui/icons'
import { useNavigate } from 'react-router-dom';
import axios from 'axios'
import {basedURL, getConfigWithToken, getToken} from "../../api/index.js"
async function getReportedReviewByReviewID(reviewID){
    const token = getToken();
    const response = await axios.get(basedURL.concat('review/admin/reported/reviewID?reviewID='+reviewID), {
        headers: { Authorization: "Bearer " + getToken() }
    }
    )
    return await response

}
async function passReportedReview(reportID) {
    const config = getConfigWithToken();
    const response = await axios.post(basedURL.concat('review/admin/reported?reportID='+reportID), {
        headers: config
    }
    )
    return await response
}

async function rejectReportedReview(reportID){
    const config = getConfigWithToken();
    const response = await axios.delete(basedURL.concat('review/admin/reported?reportID='+reportID), {
        headers: config
    }
    )
    return await response

}

function ReportedReviewModal({isOpen, onClose, setHide, reviewID, reportID}){
    const [data, setData] = useState(null);
    const navigate = useNavigate();

    //=============================Change here to get a review detail by review id =============================
    useEffect(()=>{
        if(!data){
            // setData({
            //     "_id":_id,
            //     "user_id":"1234567890",
            //     "project_id" :"62190f37b7065ef37abccf64",
            //     "text":"This is review",
            //     "star":4
            // });
            getReportedReviewByReviewID(reviewID)
            .then(res => {
            console.log(res);
            setData(res.data);
            })
        }
    }, [data]);

    const approve = () =>{
        setHide(true);
        console.log(reportID)
        passReportedReview(reportID)
            .then(res => {
            console.log(res);
            })
    }

    const reject = () =>{
        setHide(true);
        /*rejectReportedReview(reportID)
            .then(res => {
            console.log(res);
            })*/
    }
    

    if(!data)
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
                <ModalHeader>
                    <HStack spacing={50}>
                        <Text xs={2} fontWeight="semibold">Report_id : {reportID}</Text>
                        <Button onClick={()=>{navigate('/projects/'.concat(data.projectID))}}>Goto Project</Button>
                    </HStack>
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack alignItems="flex-start">
                        <HStack>
                            <Text xs={2} fontWeight="semibold">Project_id : {data.projectID}</Text>
                            <Spacer/>
                            <Text xs={2} fontWeight="semibold">User_id : {data.userID}</Text>
                        </HStack>
                        <Text xs={2} fontWeight="semibold">Text : </Text>
                        <HStack>
                            <Text xs={2}>{data.text}</Text>
                        </HStack>
                        <HStack>
                            {
                                [...Array(data.star)]
                                .map((_, idx) => (
                                    <Icon id = {idx} as={StarIcon} color="yellow.400"/>
                                ))
                            }
                            {
                                [...Array(5-data.star)]
                                .map((_, idx) => (
                                    <Icon id = {idx} as={StarIcon}/>
                                ))
                            }
                            <Text xs={2} fontWeight="semibold"> Star : </Text>
                            <Text xs={2}> {data.star}</Text>
                        </HStack>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button variant='ghost' onClick={onClose} mx = {1}>Close</Button>
                    <Button colorScheme='pink' variant='solid' mx = {1} onClick = {reject}>Delete</Button>
                    <Button colorScheme='teal' variant='solid' mx = {1} onClick = {approve}>Pass</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}

function ReportedReviewBox({ data }){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ hide, setHide ] = useState(false);

    return(
        !hide&&<>
            <Box  w="1000px" borderWidth="1px">
                <Grid templateColumns='repeat(5, 1fr)' gap={4} p={1} >
                    <GridItem colSpan={4}>
                        <HStack>
                            <Text>ID : </Text>
                            <Text fontWeight="bold">{data.reviewID}</Text>
                            <Text>วัน : </Text>
                            <Text fontWeight="bold">{data.datetime.slice(0, 9)}</Text>
                            <Text>เวลา : </Text>
                            <Text fontWeight="bold">{data.datetime.slice(11, 19)}</Text>
                        </HStack>
                    </GridItem>
                    <GridItem colSpan={1}>
                        <Button onClick={onOpen}>ตรวจสอบ</Button>
                    </GridItem>
                </Grid>
            </Box>
            <ReportedReviewModal isOpen={isOpen} onClose={onClose} setHide={setHide} reviewID={data.reviewID} reportID = {data._id}/>
        </>
    );
}

export default ReportedReviewBox;