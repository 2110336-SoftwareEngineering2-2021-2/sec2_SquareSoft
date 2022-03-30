import { Flex, Center, Text, Container, VStack } from '@chakra-ui/react'
import VerificcationBox from '../../../components/donation-system/admin/transaction-verification';
import { useEffect, useState } from 'react';
import NavigatorAdmin from "../../../components/navigator-admin";
import useForAdmin from '../../../components/for-admin';

function TransactionVerification(){
    useForAdmin();
    const [load, setLoad] = useState(false);

    //uncomment to edit loading API
    /*
    useEffect(()=>{
        if (!load){
            getData()
            .then(res => {
                    setData(res.data); 
                    setLoad(true);
            })
            .error();
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
        // Do not forget to add key to each verification box
    return(
        <div>
            <NavigatorAdmin />
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
    );
}

export default TransactionVerification;