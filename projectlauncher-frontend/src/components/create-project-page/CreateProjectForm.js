import React, { useState } from "react";
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
  Flex,
  Button,
  Spacer,
} from "@chakra-ui/react";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";

function CreateProjectForm() {
  const [startDate, setStartDate] = useState(new Date());
  const navigate = useNavigate();

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

        <FormControl id="endDate" isRequired>
          <HStack>
            <FormLabel htmlFor="endDate" width="20ch">
              วันสิ้นสุดการระดมทุน
            </FormLabel>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
            />
          </HStack>
        </FormControl>
      </VStack>

      <Box marginTop={20}>
        <Text fontSize="x-large" fontWeight="semibold">
          อัพโหลดภาพและวิดีโอ
        </Text>
      </Box>

      <Divider color="purple.500" />

      <VStack spacing={14} marginY={10}>
        <FormControl id="projectImage" isRequired>
          <HStack>
            <FormLabel htmlFor="projectImage" width="20ch">
              รูปภาพโครงการ
            </FormLabel>
            <Input
              type="text"
              borderColor="purple.500"
              focusBorderColor="lime"
              placeholder="Temporary"
            />
          </HStack>
        </FormControl>

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

      <Flex>
        <Button
          colorScheme="purple"
          variant="solid"
          w="200px"
          onClick={() => {
            navigate("/home");
          }}
        >
          ย้อนกลับ
        </Button>
        <Spacer />
        <Button colorScheme="purple" variant="solid" w="200px">
          สร้างโครงการ
        </Button>
      </Flex>
    </Box>
  );
}

export default CreateProjectForm;
