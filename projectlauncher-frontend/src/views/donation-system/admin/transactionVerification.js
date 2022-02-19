import { Flex, Center, Text, Container, VStack, HStack, Box, Button, Badge } from '@chakra-ui/react'
import Navigator from "../../../components/navigator";

function VerificcationBox(){
    return(
        <Box p="5" w="1000px" borderWidth="1px">
            <HStack spacing='50px'>
                <Text>ชื่อ : นายสมพง นามสกุล : ไข่งาม</Text>
                <Text>Username : Sompong Khaingam</Text>
                <Badge variant='outline' colorScheme='green'>เติมเงิน</Badge>
                <Text>จำนวน : 1,000,000 บาท</Text>
                <Button>ตรวจสอบ</Button>
            </HStack>
        </Box>
    );
}

function TansactionVerification(){

    return(
        <div>
            <Navigator />
            <Container maxW = "container.xl" p = {0}>
                <Flex px = {20} alignContent = "center">
                    <Center w='full' py = {5}>
                        <VStack>
                            <Text fontSize='3xl'>Transaction Verification</Text>
                            <VerificcationBox/>
                            <VerificcationBox/>
                        </VStack>
                    </Center>
                </Flex>
            </Container>
        </div>
    );
}

export default TansactionVerification;