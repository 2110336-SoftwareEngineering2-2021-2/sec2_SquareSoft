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
} from "@chakra-ui/react";
import changePassword from "../../api/change-password/change-password-api";

function ChangePasswordForm() {
  const navigate = useNavigate();
  const [oldPass, setOldPass] = useState("");
  const [newPass, setNewPass] = useState("");
  const [loading, setLoading] = useState(false);

  const onClickChangePassword = () => {
    if (oldPass.length > 0 && newPass.length > 0) {
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
            alert("Old password incorrect.");
          } else {
            alert("There is an error. Please try again.");
          }
        });
    } else alert("Please check for empty value.");
  };

  return (
    <Box
      borderColor="purple.500"
      borderWidth="2px"
      borderRadius="10px"
      marginX="100px"
      padding="50px"
    >
      <VStack spacing={14} margin={10}>
        <Box>
          <Heading fontSize="x-large">Change Password</Heading>
        </Box>

        <FormControl id="oldPassword" isRequired>
          <VStack>
            <FormLabel htmlFor="oldPassword">Old Password</FormLabel>
            <Input
              type="password"
              borderColor="purple.500"
              focusBorderColor="lime"
              onChange={(e) => {
                setOldPass(e.target.value);
              }}
            />
          </VStack>
        </FormControl>

        <FormControl id="newPassword" isRequired>
          <VStack>
            <FormLabel htmlFor="newPassword">New Password</FormLabel>
            <Input
              type="password"
              borderColor="purple.500"
              focusBorderColor="lime"
              onChange={(e) => {
                setNewPass(e.target.value);
              }}
            />
          </VStack>
        </FormControl>
      </VStack>

      <Flex>
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
  );
}

export default ChangePasswordForm;
