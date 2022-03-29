import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  VStack,
  Heading,
  FormControl,
  FormLabel,
  Input,
  Flex,
  Button,
  Spacer,
  Center,
} from "@chakra-ui/react";
import changePassword from "../../api/change-password/change-password-api";

function ChangePasswordForm() {
  const navigate = useNavigate();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [loading, setLoading] = useState(false);

  const onClickChangePassword = () => {
    // Check if oldPass and newPass are not empty string
    if (oldPass.length > 0 && newPass.length > 0) {
      if (oldPass === newPass)
        alert("New password must not be the same as old password.");
      else {
        setLoading(true);

        const respone = changePassword(oldPass, newPass);

        respone
          .then(() => {
            setLoading(false);
            alert("Password changed successfully.");
            navigate("/");
          })
          .catch((error) => {
            setLoading(false);
            if (error.toJSON().status === 412) {
              alert("Old password is incorrect.");
            } else {
              alert("There is an error. Please try again.");
            }
          });
      }
    } else alert("Please check for empty value.");
  };

  return (
    <Center>
      <Box
        borderColor="purple.500"
        borderWidth="2px"
        borderRadius="10px"
        margin="25px"
        padding="25px"
        width="lg"
        overflow="hidden"
      >
        <VStack spacing={5}>
          <Box>
            <Heading fontSize="x-large">Change Password</Heading>
          </Box>

          <FormControl id="oldPassword" isRequired>
            <FormLabel htmlFor="oldPassword">Old Password</FormLabel>
            <Input
              type="password"
              borderColor="purple.500"
              focusBorderColor="lime"
              onChange={(e) => {
                setOldPass(e.target.value);
              }}
            />
          </FormControl>

          <FormControl id="newPassword" isRequired>
            <FormLabel htmlFor="newPassword">New Password</FormLabel>
            <Input
              type="password"
              borderColor="purple.500"
              focusBorderColor="lime"
              onChange={(e) => {
                setNewPass(e.target.value);
              }}
            />
          </FormControl>
        </VStack>

        <Flex marginTop={5}>
          <Button
            id="goBack"
            colorScheme="purple"
            variant="solid"
            w="200px"
            borderRadius="12px"
            onClick={() => {
              navigate("/");
            }}
          >
            Cancel
          </Button>
          <Spacer />
          <Button
            isLoading={loading}
            loadingText="Changing Password"
            id="change-password"
            colorScheme="purple"
            variant="solid"
            w="200px"
            borderRadius="12px"
            onClick={onClickChangePassword}
          >
            Change Password
          </Button>
        </Flex>
      </Box>
    </Center>
  );
}

export default ChangePasswordForm;
