import { useNavigate } from "react-router-dom";
import { Box, Text, Button, VStack , Center, Flex, Spacer } from '@chakra-ui/react'
import NavigatorAdmin from './../../components/navigator-admin'
import useForAdmin from '../../components/for-admin';

function AdminHome(){
    const navigate = useNavigate();
    useForAdmin();

    return (
    <>
        <NavigatorAdmin/>
        <Center>
            <VStack>
                <Text fontWeight="bold" fontSize = "xl" m = "15px">Admin Home</Text>
                <Box  w="1000px" h="50px" borderWidth="1px" p = "10px">
                    <Flex align="center">
                        <Text fontWeight="bold">Project Owner Verification</Text>
                        <Spacer/>
                        <Button size = "sm" onClick = {()=>{navigate('/admin/project-owner');}}>
                            Go
                        </Button>
                    </Flex>
                </Box>
                <Box  w="1000px" h="50px" borderWidth="1px" p = "10px">
                    <Flex align="center">
                        <Text fontWeight="bold">Transaction Verification</Text>
                        <Spacer/>
                        <Button size = "sm" onClick = {()=>{navigate('/admin/transaction');}}>
                            Go
                        </Button>
                    </Flex>
                </Box>
                <Box  w="1000px" h="50px" borderWidth="1px" p = "10px">
                    <Flex align="center">
                        <Text fontWeight="bold">Project Approval</Text>
                        <Spacer/>
                        <Button size = "sm" onClick = {()=>{navigate('/admin/projects');}}>
                            Go
                        </Button>
                    </Flex>
                </Box>
                <Box  w="1000px" h="50px" borderWidth="1px" p = "10px">
                    <Flex align="center">
                        <Text fontWeight="bold">Reported Review Consideration</Text>
                        <Spacer/>
                        <Button size = "sm" onClick = {()=>{navigate('/admin/review-reported');}}>
                            Go
                        </Button>
                    </Flex>
                </Box>
            </VStack>
        </Center>
    </>
    );
}

export default AdminHome;