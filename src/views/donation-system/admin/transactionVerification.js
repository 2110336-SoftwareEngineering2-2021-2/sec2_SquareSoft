import { Flex, Center, Text, Container, VStack } from '@chakra-ui/react'
import VerificcationBox from '../../../components/donation-system/admin/transaction-verification';
import { useEffect, useState } from 'react';
import Navigator from "../../../components/navigator";
import {Row, Col, Card, Button} from "react-bootstrap";

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
    
    const data = [{"name":"Sompong", 
    "surname":"Khaingam",
    "username":"Sompong.K",
    "bank":"Kasikorn Bank",
    "time":"19:20",
    "date":"19/7/2022",
    "amount":200,
    "bank-name":"Sompong Khaingam",
    "slip-image" : "https://scontent.fhdy4-1.fna.fbcdn.net/v/t1.18169-9/25498309_530873967291327_1223835557041491412_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8bfeb9&_nc_eui2=AeF_jJDd37Lo_Sj3yIJd2YxAhYgla7dAzDSFiCVrt0DMNLDFvF5HFFbc5jC3UPVME9s4E6C63I81eHIdoXzGN5OT&_nc_ohc=GR0s57yFea8AX-UKBaj&_nc_ht=scontent.fhdy4-1.fna&oh=00_AT9oFjpI44ZOfzIpGV10UE22Z9zy1v3RtxRHKkqjGWvipA&oe=62391651"}
    , {"name":"Somp", 
    "surname":"Khain",
    "username":"So.K",
    "bank":"Kasikorn Bank",
    "time":"19:20",
    "date":"19/7/2022",
    "amount":200,
    "bank-name":"Sompong Khaingam",
    "slip-image" : "https://scontent.fhdy4-1.fna.fbcdn.net/v/t1.18169-9/25498309_530873967291327_1223835557041491412_n.jpg?_nc_cat=104&ccb=1-5&_nc_sid=8bfeb9&_nc_eui2=AeF_jJDd37Lo_Sj3yIJd2YxAhYgla7dAzDSFiCVrt0DMNLDFvF5HFFbc5jC3UPVME9s4E6C63I81eHIdoXzGN5OT&_nc_ohc=GR0s57yFea8AX-UKBaj&_nc_ht=scontent.fhdy4-1.fna&oh=00_AT9oFjpI44ZOfzIpGV10UE22Z9zy1v3RtxRHKkqjGWvipA&oe=62391651"}]
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