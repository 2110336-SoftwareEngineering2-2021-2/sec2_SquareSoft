import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import { Box, Text, Badge, Button, VStack , HStack, Textarea, Center } from '@chakra-ui/react'
import { Slider, SliderTrack, SliderFilledTrack, SliderThumb } from '@chakra-ui/react'
import { Progress } from '@chakra-ui/react'
import Navigator from './../../components/navigator'


function UpdateProjectProgression(){

    const navigate = useNavigate(); 
    const [startValueOfSlider, setStartValueOfSlider] = useState(30);

    const [valueOfSlider, setValueOfSlider] = useState(startValueOfSlider);

    return (
    <>
        <Navigator/>
        <Center p = {5}>
            <Box p = {10} borderWidth="1px" width = {1000} height = {400} >
                <VStack>
                    <Text fontWeight="bold" fontSize={30} >ปรับปรุงความเคือบหน้าของโครงการ</Text>
                    <Text fontWeight="bold" fontSize={25} >Are we still alive ?</Text>
                    <HStack p = {5}>
                        <Text>กิจกรรมปัจจุบัน</Text>
                        <Textarea width = {500} minH = {10} maxH = {10}></Textarea>
                    </HStack>
                    <HStack p = {1}>
                        <Text>ความคืบหน้า</Text>
                        <Badge>{valueOfSlider} %</Badge>
                        <Slider aria-label='slider-ex-1' 
                                defaultValue={valueOfSlider} 
                                width = {500} 
                                value = {valueOfSlider} 
                                onChange={
                                    (val) => { 
                                        if(val>=startValueOfSlider)
                                            setValueOfSlider(val)
                                    }
                                }
                                colorScheme='purple'>
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb />
                        </Slider>
                    </HStack>
                    <HStack>
                        <Button onClick = {() => {navigate(-1); console.log("Back")}}>ย้อนกลับ</Button>
                        <Button colorScheme='purple' onClick = {() => {navigate("/projects/my-project"); console.log("Back")}}>ยืนยัน</Button>
                    </HStack>
                    <HStack>
                    </HStack>
                </VStack>
            </Box>
        </Center>

        <Box w = {100} h = {10}>
            <Progress value={valueOfSlider} colorScheme='purple' isAnimated hasStripe/>
        </Box>
    </>
    );
}

export default UpdateProjectProgression
