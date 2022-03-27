import { VStack, Text, HStack, Box, Button, Badge, useDisclosure,
Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, 
Input, Image } from '@chakra-ui/react'
import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {basedURL, getToken} from "../../../api/index.js"



function loadingHandle(){

}

function rejectHandle(){

}

function approveHandle(){

}

function VerificationModal({isOpen, onClose, data, setHide}){
    const [load, setLoad] = useState(false);
    const [value, setValue] = useState('');
    const handleChange = (event) => setValue(event.target.value);

    const hideComponent = () =>{
        setHide(true);
    }
    //const [data, setData] = useState({});
    //On real implementation delete this data
    
    //Uncomment to load data and set load
    /*useEffect(()=>{
        if (!load){
            getData().then(res => {
                    setData(res.data); 
                    setLoad(true);
                }).error();
        }
    });*/

    /*
    if(!load)
    return (
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>{data.name} {data.surname}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    loading data ...
                </ModalBody>
                </ModalContent>
            </Modal>
        </div>
    );
    */

    return(
        <div>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                <ModalHeader>{data.name} {data.surname}</ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                    <VStack alignItems="flex-start">
                        <HStack>
                            <Text>ชื่อ : </Text>
                            <Text>{data.name}</Text>
                            <Text>สกุล : </Text>
                            <Text>{data.surname}</Text>
                        </HStack>
                        <HStack>
                            <Text>Usename : </Text>
                            <Text>{data.username}</Text>
                        </HStack>
                        <HStack>
                            <Text>Bank : </Text>
                            <Text fontWeight="bold" >{data.bank}</Text>
                            <Text>Amount : </Text>
                            <Text fontWeight="bold" >{data.amount}</Text>
                        </HStack>
                        <HStack>
                            <Text>Account name : </Text>
                            <Text fontWeight="bold" >{data['bank-name']}</Text>
                        </HStack>
                        <HStack>
                            <Text>Time : </Text>
                            <Text fontWeight="bold" >{data.time}</Text>
                            <Text>Date : </Text>
                            <Text fontWeight="bold" >{data.date}</Text>
                        </HStack>
                        <Image src = {data['slip-image']} w = {400} h = {550} py = {5} borderWidth="1px"></Image>
                        <Text>Type admin PIN : </Text>
                        <Input placeholder='Admin Pin' value={value} onChange={handleChange} type = "password"/>
                    </VStack>
                </ModalBody>
                <ModalFooter>
                    <Button variant='ghost' onClick={onClose} mx = {1}>Close</Button>
                    <Button colorScheme='pink' variant='solid' mx = {1} onClick={hideComponent}>Reject</Button>
                    <Button colorScheme='teal' variant='solid' mx = {1} onClick={hideComponent}>Approve</Button>
                </ModalFooter>
                </ModalContent>
            </Modal>
        </div>
    );
}
// adminGetUnfinishedUserTX

async function getUserTransaction(){
    try{let inp_data = await axios.get(basedURL.concat('transaction/adminGetUnfinishedUserTX'), {
        headers: { Authorization: "Bearer " + getToken() }
    })
    return inp_data.data}
    catch(err){
        console.log(err)
    }
}

function VerificcationBox(props){
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [ hide, setHide ] = useState(false);
    // let inp_data = props.data
    
    // const [data, setData] = useState(null)

    // useEffect(() => {axios.get(basedURL.concat('transaction/adminGetUnfinishedUserTX'), {
    //     headers: { Authorization: "Bearer " + getToken() }
    // }).then(res => {if(res){ setData(res.data) }
    // })}, [])
    const data = {"name":"Sompong", 
            "surname":"Khaingam",
            "username":"Sompong.K",
            "bank":"Kasikorn Bank",
            "time":"19:20",
            "date":"19/7/2022",
            "amount":200,
            "bank-name":"Sompong Khaingam",
            "slip-image" : "https://scontent.fhdy4-1.fna.fbcdn.net/v/t1.18169-9/25498309_530873967291327_1223835557041491412_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8bfeb9&_nc_eui2=AeF_jJDd37Lo_Sj3yIJd2YxAhYgla7dAzDSFiCVrt0DMNLDFvF5HFFbc5jC3UPVME9s4E6C63I81eHIdoXzGN5OT&_nc_ohc=GR0s57yFea8AX-UKBaj&_nc_ht=scontent.fhdy4-1.fna&oh=00_AT9oFjpI44ZOfzIpGV10UE22Z9zy1v3RtxRHKkqjGWvipA&oe=62391651"}
    
    return(
        !hide&&<div>
        <Box p="5" w="1000px" borderWidth="1px">
            <HStack spacing='50px'>
                <HStack>
                    <Text>ชื่อ : </Text>
                    <Text fontWeight="bold">สมพงษ์</Text>
                    <Text>นามสกุล : </Text>
                    <Text fontWeight="bold">ไข่งาม</Text>
                    <Text>Username : </Text>
                    <Text fontWeight="bold">Sompong Khaingam</Text>
                </HStack>
                <Badge borderRadius='full' colorScheme='teal'>เติมเงิน</Badge>
                <Text fontWeight="bold" >จำนวน : 1,000,000 บาท</Text>
                <Button onClick={onOpen}>ตรวจสอบ</Button>
            </HStack>
        </Box>
        <VerificationModal isOpen = {isOpen} onClose = {onClose} data = {data} setHide = {setHide}/>
        </div>
    );
}

// class VerificcationBox extends React.Component{
//     constructor(props){
//         super(props);
//         this.setState({data: {"name":"Sompong", 
//         "surname":"Khaingam",
//         "username":"Sompong.K",
//         "bank":"Kasikorn Bank",
//         "time":"19:20",
//         "date":"19/7/2022",
//         "amount":200,
//         "bank-name":"Sompong Khaingam",
//         "slip-image" : "https://scontent.fhdy4-1.fna.fbcdn.net/v/t1.18169-9/25498309_530873967291327_1223835557041491412_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8bfeb9&_nc_eui2=AeF_jJDd37Lo_Sj3yIJd2YxAhYgla7dAzDSFiCVrt0DMNLDFvF5HFFbc5jC3UPVME9s4E6C63I81eHIdoXzGN5OT&_nc_ohc=GR0s57yFea8AX-UKBaj&_nc_ht=scontent.fhdy4-1.fna&oh=00_AT9oFjpI44ZOfzIpGV10UE22Z9zy1v3RtxRHKkqjGWvipA&oe=62391651"}
//     })

//     }
//     render(){
//         return <FVerificcationBox data = {this.state.data}/>
//     }
// }

export default VerificcationBox;