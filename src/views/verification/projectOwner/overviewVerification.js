import React, {useEffect, useState} from "react";

import { useNavigate } from "react-router-dom";

import Navigator from "../../../components/navigator";
import { getOverviewProjectOwner } from "../../../api/verification/projectOwner/projectOwner-verification-api";

import { Flex, Center, Text, Container, VStack } from '@chakra-ui/react'
import VerificationBox from './../../../components/verification/verification-box';

import 'bootstrap/dist/css/bootstrap.min.css';
import './verification.css'

function OverviewVerification(){

    const navigate = useNavigate();
    const [data, setData] = useState([0, [{"username" : "", "_id" : ""}]]);
    const specifiedRoute = "/admin/project-owner/specified/";

    useEffect(() => {
        getOverviewProjectOwner()
            .then(res => {setData(res.data)})
            .catch(() => {navigate("/")})
    }, []);

    return(
        <>
            <Navigator/>
            <Container maxW = "container.xl" p = {0}>
                <Flex px = {20} alignContent = "center">
                    <Center w='full' py = {5}>
                        <VStack>
                            <Text fontSize='3xl' fontWeight="bold" >Project Owner Verification</Text>
                            {
                                Array
                                .from({ length: data[0] })
                                .map((_, idx) => (
                                    <VerificationBox 
                                        _id = {data[1][idx]._id}  
                                        firstname = {data[1][idx].firstname} 
                                        lastname ={data[1][idx].lastname}
                                    />
                                ))
                            }
                        </VStack>
                    </Center>
                </Flex>
            </Container>
        </>
    )
}

export default OverviewVerification