
import React, { useEffect, useState } from "react";
import { Box, Button, HStack, Icon, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Spacer, Text, useDisclosure, VStack } from "@chakra-ui/react";
import { getReviews, report } from './../../api/review/review';
import { StarIcon } from "@chakra-ui/icons";


function Star({number}){
    return(<div>
        {
            [...Array(number)]
            .map((_, idx) => (
                <Icon id = {idx} as={StarIcon} color="yellow.400"/>
            ))
        }
        {
            [...Array(5-number)]
            .map((_, idx) => (
                <Icon id = {idx} as={StarIcon}/>
            ))
        }
    </div>);
}
function ReviewModal({isOpen, onClose, text, star, reviewID, setAppear}){
    return(
        <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>คุณต้องการรายงานจริงๆ หรอ</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
              <VStack>
                <Text>ข้อความ : {text}</Text>
                <HStack>
                    <Text>ดาว : </Text>
                    <Star number = {star}/>
                </HStack>
              </VStack>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button variant='ghost' onClick = {()=>{
                report(reviewID);
                onClose();
                setAppear(false);
            }}>Report</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    );
}

function ReviewItem(props){
    const {data} = props;
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [ appear, setAppear ] = useState(true);
    return(
        <Box p="5" maxW="100%" borderWidth="1px">
            <HStack>
                <Star number = {data.star}/>
                <Text mt={2} fontSize="xl" lineHeight="short">
                    {data.text}
                </Text>
                <Spacer/>
                {appear && <Button onClick = {onOpen}>Report</Button>}
                <ReviewModal    isOpen = {isOpen} 
                                onClose = {onClose} 
                                text = {data.text} 
                                star = {data.star} 
                                reviewID = {data._id}
                                setAppear = {setAppear}/>
            </HStack>
        </Box>
    )
}

function AreaShow({ projectID }){
        const [data, setData ] = useState(null);
        useEffect(()=>{
            if(!data & projectID != undefined){
                getReviews(projectID)
                .then((res) => {
                    setData(res.data);
                })
                .catch()
            }
        }, [data, projectID]);

        if(!data ){
            return(<div>Loading</div>);
        }
        if(data.length<=0){
            return(<div>No review yet</div>);
        }

        var average_star = 0;
        for (let i = 0; i < data.length; i++) {
            average_star += data[i].star;
        }
        average_star /= data.length;
        average_star = Math.floor(average_star);

        const showReview = data.map((element,index) => {
            return <ReviewItem key={index} data={element} />
        }) 
        return (
            <div>
                <div className="text-show">
                    <Text mt={20} fontSize="4xl" fontWeight="semibold" lineHeight="short">
                            รีวิว
                    </Text>
                    <Text mt={5} fontSize="xl" fontWeight="semibold" lineHeight="short">
                            Average Rating : {average_star} {<Star number = {average_star}/>} 
                    </Text>
                </div>
                <br></br>
                <div className="review-show">{showReview}</div>
            </div>
      )
}

export default AreaShow