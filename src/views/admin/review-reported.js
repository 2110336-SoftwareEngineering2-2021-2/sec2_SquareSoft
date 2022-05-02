import { Flex, Center, Text, Container, VStack } from '@chakra-ui/react'
import { useEffect, useState } from 'react';
import NavigatorAdmin from "../../components/navigator-admin";
import useForAdmin from '../../components/for-admin';
import ReportedReviewBox from '../../components/admin/review-reported-box';
import {basedURL, getToken} from "../../api/index.js"
import axios from 'axios'

async function getReportedReviews() {
    const token = getToken();
    const response = await axios.get(basedURL.concat('review/admin/reported'),{
        headers: { Authorization: "Bearer " + getToken() }
    });
    // console.log(response);
    return await response;
}

function ReviewReported(){
    useForAdmin();
    const [data, setData] = useState(null);
    
    //=============================Change here to get all reported reviews =============================
    useEffect(()=>{
        if(!data){
                getReportedReviews()
                .then(res => {
                console.log(res);
                setData(res.data);
                })
                // setData({
                //     "_id":"1234567890",
                //     "review_id":"1234567890",
                //     "datetime" :"2022-02-24T07:23:43.618+00:00",
                //     "status":"unreviewed"
                // });
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
                                .from({ length: data.length })
                                .map((_, idx) => (
                                    <ReportedReviewBox 
                                        id = {idx}
                                        data = {data[idx]}
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