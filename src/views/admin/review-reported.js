import { Flex, Center, Text, Container, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import NavigatorAdmin from "../../components/navigator-admin";
import useForAdmin from '../../components/for-admin';
import ReportedReviewBox from '../../components/admin/review-reported-box';

function ReviewReported(){
    useForAdmin();
    const [data, setData] = useState(null);
    // Mock up data

    useEffect(()=>{
        if(!data){
            setData({
                "_id":"1234567890",
                "review_id":"1234567890",
                "datetime" :"2022-02-24T07:23:43.618+00:00",
                "status":"unreviewed",
                "numberOfReported":0
            });
        }
    }, [data]);

    if(!data) return(<><NavigatorAdmin /></>);

    return(
        <>
            <NavigatorAdmin />
            <Container maxW = "container.xl" p = {0}>
                <Flex px = {20} alignContent = "center">
                    <Center w='full' py = {5}>
                        <VStack>
                            <Text fontSize='3xl' fontWeight="bold" >Reported Review Consideration</Text>
                            {
                                Array
                                .from({ length: 5 })
                                .map((_, idx) => (
                                    <ReportedReviewBox 
                                        id = {idx}
                                        data = {data}
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

export default ReviewReported;