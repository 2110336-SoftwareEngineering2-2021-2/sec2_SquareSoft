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
  RadioGroup,
  Radio,
  Select,
  Text,
  Divider,
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
        <VStack spacing={14}>
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

          <FormControl id="type" isRequired>
            <HStack>
              <FormLabel htmlFor="type" width="20ch">
                ประเภทการระดมทุน
              </FormLabel>
              <RadioGroup>
                <HStack>
                  <Radio colorScheme="purple" value="โครงการไม่แสวงหาผลกำไร">
                    โครงการไม่แสวงหาผลกำไร
                  </Radio>
                  <Radio colorScheme="purple" value="โครงการเชิงพาณิชย์">
                    โครงการเชิงพาณิชย์
                  </Radio>
                </HStack>
              </RadioGroup>
            </HStack>
          </FormControl>

          <FormControl id="category" isRequired>
            <HStack>
              <FormLabel htmlFor="category" width="17ch">
                หมวดหมู่โครงการ
              </FormLabel>
              <Select
                placeholder="กรุณาเลือกหมวดหมู่โครงการ"
                borderColor="purple.500"
                focusBorderColor="lime"
                w="50ch"
              >
                <option value="ศิลปะ">ศิลปะ</option>
                <option value="อาหาร">อาหาร</option>
                <option value="ดนตรี">ดนตรี</option>
                <option value="เทคโนโลยี">เทคโนโลยี</option>
                <option value="แฟชัน">แฟชัน</option>
                <option value="สุขภาพ">สุขภาพ</option>
                <option value="วิจัย">วิจัย</option>
                <option value="สังคม">สังคม</option>
              </Select>
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
        </VStack>

        <Box marginTop={20}>
          <Text fontSize="x-large" fontWeight="semibold">
            อัพโหลดภาพและวิดีโอ
          </Text>
        </Box>

        <Divider color="purple.500" marginBottom={10}/>

        <VStack spacing={14}>
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
