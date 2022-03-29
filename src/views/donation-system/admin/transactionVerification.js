import { Flex, Center, Text, Container, VStack } from '@chakra-ui/react'
import VerificcationBox from '../../../components/donation-system/admin/transaction-verification';
import { useEffect, useState } from 'react';
import Navigator from "../../../components/navigator";
import {Row, Col, Card, Button} from "react-bootstrap";
import axios from 'axios';
import {basedURL, getToken} from "../../../api/index.js"

function TransactionVerification(){

    const [load, setLoad] = useState(false);

    //uncomment to edit loading API
    /*
    useEffect(()=>{
        if (!load){
            getData().then(res => {
                    setData(res.data); 
                    setLoad(true);
                }).error();
        }
    });
    */

    //uncomment to eding loading state views
    /*if(!load)
    return(
        <div>
            <Navigator />
            <Text>loading data...</Text>
        </div>
    );*/
    // useEffect(() => {
    //     realData();
    // }, []);
    const realData = () => {axios.get(basedURL.concat('transaction/adminGetUnfinishedUserTX'), {
        headers: { Authorization: "Bearer " + getToken() }
    }).then((result)=>{console.log("Fuck code")})
    }
    // console.log(realData)
    
    const data =[
        {
            "_id": "621b5ae5cfc2c5df4d712363",
            "timestamp": "2022-02-27T11:05:09.041Z",
            "username": {
                "username": "test",
                "role": "ProjectOwner"
            },
            "type": "Deposit",
            "amount": 321421904902.244,
            "status": "Pending",
            "data": {
                "paymentMethod": "bank transfer",
                "bank": "kbank",
                "txRef": null
            },
            "__v": 0
        }
    ]
    
    
    

    return(
        <div>
            <Navigator />
            <Container maxW = "container.xl" p = {0}>
                <Flex px = {20} alignContent = "center">
                    <Center w='full' py = {5}>
                        <VStack>
                            <Text fontSize='3xl' fontWeight="bold" >Transaction Verification</Text>
                            {Array.from({ length: data.length }).map((_, idx) => (
                                <VerificcationBox data = {data[idx]}/>
                            ))}
                        </VStack>
                    </Center>
                </Flex>
            </Container>
        </div>
    );
}

export default TransactionVerification;