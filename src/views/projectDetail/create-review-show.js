
import React from "react";
import { Box, Text } from "@chakra-ui/react";
import ReactStars from "react-rating-stars-component";
// import './create-area-show.css'
function ReviewItem(props){
    const {data} = props;
    return(
        <Box p="5" maxW="1000px" borderWidth="1px">
            <ReactStars count={data.star} size={25}/>
            <Text mt={2} fontSize="xl" fontWeight="semibold" lineHeight="short">
                {data.txt}
            </Text>
            <Text mt={2} fontSize="m" fontWeight="semibold" lineHeight="short">
                วันที่รีวิว {data.date}
            </Text>
        </Box>
    )
}
const data_arr = [
    {
        "txt":"Hello 123",
        "date" :"12-10-21",
        "star" : 3
    },
    {
        "txt":"Hello 456",
        "date" :"12-10-21",
        "star" :5
    },
    {
        "txt":"Hello 456",
        "date" :"12-10-21",
        "star" :5
    },
    {
        "txt":"Hello 456",
        "date" :"12-10-21",
        "star" :5
    },
    {
        "txt":"Hello 456",
        "date" :"12-10-21",
        "star" :5
    }

]
function AreaShow({ projectID }){
        const showReview = data_arr.map((data,index) => {
            return <ReviewItem key={index} data={data} />
        }) 
        const average_star = 4;
        return (
            <div>
                <div className="text-show">
                    <Text mt={20} fontSize="4xl" fontWeight="semibold" lineHeight="short">
                            รีวิว
                    </Text>
                    <Text mt={5} fontSize="xl" fontWeight="semibold" lineHeight="short">
                            Average Rating : {average_star} {<ReactStars count={average_star} size={25} />} 
                    </Text>
                </div>
                <br></br>
                <div className="review-show">{showReview}</div>
            </div>
      )
}

export default AreaShow