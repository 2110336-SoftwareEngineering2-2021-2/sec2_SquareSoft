import React, {useState} from 'react'
import Navigator from "../../components/navigator";
import { Flex, Center, Text, Container, VStack } from '@chakra-ui/react'
import VerificcationBox from '../../components/donation-system/admin/transaction-verification';
import { useEffect } from 'react';


function Donation(){
    
    const [load, setLoad] = useState(false);
    return(
        <div>
            <Navigator />
            <Container maxW = "container.xl" p = {0}>
                <Flex px = {20} alignContent = "center">
                    <Center w='full' py = {5}>
                        <VStack>
                            <Text fontSize='3xl' fontWeight="bold" >Transaction Verification</Text>
                            <VerificcationBox/>
                            <VerificcationBox/>
                        </VStack>
                    </Center>
                </Flex>
            </Container>
        </div>
    )
}

export default Donation