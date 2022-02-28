import React from "react";
import {
  Box,
  VStack,
  Heading,
  FormControl,
  HStack,
  FormLabel,
  Input,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";

class CreateProjectForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <Box
        borderColor="purple.500"
        borderWidth="2px"
        borderRadius="10px"
        margin="50px"
        padding="50px"
      >
        <VStack spacing={4}>
          <Box>
            <Heading fontSize="x-large">สร้างโครงการ</Heading>
          </Box>

          <FormControl id="projectName" isRequired>
            <HStack>
              <FormLabel htmlFor="projectName" width="20ch">
                ชื่อโครงการ
              </FormLabel>
              <Input
                type="text"
                borderColor="purple.500"
                focusBorderColor="lime"
              />
            </HStack>
          </FormControl>

          <FormControl id="purpose" isRequired>
            <HStack>
              <FormLabel htmlFor="purpose" width="20ch">
                วัตถุประสงค์
              </FormLabel>
              <Input
                type="text"
                borderColor="purple.500"
                focusBorderColor="lime"
              />
            </HStack>
          </FormControl>

          <FormControl id="description" isRequired>
            <HStack>
              <FormLabel htmlFor="description" width="20ch">
                คำอธิบายโครงการ
              </FormLabel>
              <Textarea
                type="text"
                borderColor="purple.500"
                focusBorderColor="lime"
              />
            </HStack>
          </FormControl>

          <FormControl id="targetAmount" isRequired>
            <HStack>
              <FormLabel htmlFor="targetAmount" width="17ch">
                เป้าหมายการระดมทุน
              </FormLabel>
              <NumberInput
                defaultValue={0}
                min={0}
                allowMouseWheel
                borderColor="purple.500"
                focusBorderColor="lime"
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </HStack>
          </FormControl>

          <Box></Box>

          <FormControl id="videoLink" isRequired>
            <HStack>
              <FormLabel htmlFor="videoLink" width="20ch">
                ลิงค์วิดีโอโครงการ
              </FormLabel>
              <Input
                type="text"
                borderColor="purple.500"
                focusBorderColor="lime"
              />
            </HStack>
          </FormControl>
        </VStack>
      </Box>
    );
  }
}

export default CreateProjectForm;
