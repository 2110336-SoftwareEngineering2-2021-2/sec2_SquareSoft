import { Box, Button, Heading, Text, VStack } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import React from "react";
import { useNavigate } from "react-router-dom";
import Navigator from "../../components/navigator";

function Success() {
  const navigate = useNavigate();

  return (
    <Box>
      <Navigator />
      <Box
        borderColor="purple.500"
        borderWidth="2px"
        borderRadius="10px"
        margin="50px"
        padding="50px"
      >
        <VStack spacing={10}>
          <Heading>ส่งคำขอสร้างโครงการสำเร็จ</Heading>
          <CheckCircleIcon w={200} h={200} color="purple.500" />
          <Text fontSize="xx-large">
            กรุณารอการยืนยันการสร้างโครงการจากระบบ
          </Text>
          <Button
            id="ok"
            colorScheme="purple"
            variant="solid"
            w="200px"
            borderRadius={16}
            fontSize="x-large"
            onclick={navigate("/home")}
          >
            ตกลง
          </Button>
        </VStack>
      </Box>
    </Box>
  );
}

export default Success;
