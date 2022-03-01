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
  Alert,
  AlertIcon,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  AlertTitle,
  CloseButton,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

import DatePicker, { registerLocale } from "react-datepicker";
import th from "date-fns/locale/th";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from "react-router-dom";
import createProject from "../../api/create-project/create-project-api";

registerLocale("th", th);

function CreateProjectForm() {
  const navigate = useNavigate();
  const [projectName, setProjectName] = useState("");
  const [projectPurpose, setProjectPurpose] = useState("");
  const [projectDescription, setProjectDescription] = useState("");
  const [projectType, setProjectType] = useState("");
  const [projectCategory, setProjectCategory] = useState("");
  const [projectEndDate, setProjectEndDate] = useState(new Date());
  const [projectTargetAmount, setProjectTargetAmount] = useState(0);
  const [projectImage, setProjectImage] = useState("");
  const [projectVideoLink, setProjectVideoLink] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState(
    "Please check for any empty value."
  );
  const [loading, setLoading] = useState(false);

  return !success ? (
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
              onChange={(e) => {
                setProjectName(e.target.value);
              }}
            />
          </HStack>
        </FormControl>

        <FormControl id="projectPurpose" isRequired>
          <HStack>
            <FormLabel htmlFor="projectPurpose" width="20ch">
              วัตถุประสงค์
            </FormLabel>
            <Input
              type="text"
              borderColor="purple.500"
              focusBorderColor="lime"
              onChange={(e) => {
                setProjectPurpose(e.target.value);
              }}
            />
          </HStack>
        </FormControl>

        <FormControl id="projectDescription" isRequired>
          <HStack>
            <FormLabel htmlFor="projectDescription" width="20ch">
              คำอธิบายโครงการ
            </FormLabel>
            <Textarea
              type="text"
              borderColor="purple.500"
              focusBorderColor="lime"
              onChange={(e) => {
                setProjectDescription(e.target.value);
              }}
            />
          </HStack>
        </FormControl>

        <FormControl id="projectType" isRequired>
          <HStack>
            <FormLabel htmlFor="projectType" width="20ch">
              ประเภทการระดมทุน
            </FormLabel>
            <RadioGroup onChange={setProjectType}>
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

        <FormControl id="projectCategory" isRequired>
          <HStack>
            <FormLabel htmlFor="projectCategory" width="17ch">
              หมวดหมู่โครงการ
            </FormLabel>
            <Select
              placeholder="กรุณาเลือกหมวดหมู่โครงการ"
              borderColor="purple.500"
              focusBorderColor="lime"
              w="50ch"
              onChange={(e) => {
                setProjectCategory(e.target.value);
              }}
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

        <FormControl id="projectEndDate" isRequired>
          <HStack>
            <FormLabel htmlFor="projectEndDate" width="20ch">
              วันสิ้นสุดการระดมทุน
            </FormLabel>
            <Box borderColor="purple.500">
              <DatePicker
                locale="th"
                selected={projectEndDate}
                onChange={(date) => setProjectEndDate(date)}
              />
            </Box>
          </HStack>
        </FormControl>

        <FormControl id="projectTargetAmount" isRequired>
          <HStack>
            <FormLabel htmlFor="projectTargetAmount" width="17ch">
              เป้าหมายการระดมทุน
            </FormLabel>
            <NumberInput
              defaultValue={0}
              min={1}
              allowMouseWheel
              borderColor="purple.500"
              focusBorderColor="lime"
              onChange={setProjectTargetAmount}
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
              onChange={(e) => {
                setProjectImage(e.target.value);
              }}
            />
          </HStack>
        </FormControl>

        <FormControl id="projectVideoLink" isRequired>
          <HStack>
            <FormLabel htmlFor="projectVideoLink" width="20ch">
              ลิงค์วิดีโอโครงการ
            </FormLabel>
            <Input
              type="text"
              borderColor="purple.500"
              focusBorderColor="lime"
              onChange={(e) => {
                setProjectVideoLink(e.target.value);
              }}
            />
          </HStack>
        </FormControl>
      </VStack>

      <Flex>
        <Button
          id="goBack"
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
        <Button
          isLoading={loading}
          loadingText="Submitting"
          id="submit"
          colorScheme="purple"
          variant="solid"
          w="200px"
          onClick={() => {
            console.log([
              projectName,
              projectPurpose,
              projectDescription,
              projectType,
              projectCategory,
              projectEndDate,
              projectTargetAmount,
              projectImage,
              projectVideoLink,
            ]);

            if (
              projectName &&
              projectPurpose &&
              projectDescription &&
              projectType &&
              projectCategory &&
              projectEndDate &&
              projectTargetAmount &&
              projectImage &&
              projectVideoLink
            ) {
              setLoading(true);
              const response = createProject(
                projectName,
                projectPurpose,
                projectDescription,
                projectType,
                projectCategory,
                projectEndDate,
                projectTargetAmount,
                projectImage,
                projectVideoLink
              );
              response
                .then((res) => {
                  setLoading(false);
                  if (res.status < 400) {
                    setSuccess(true);
                  } else {
                    setErrorMessage("There is an error. Please try again.");
                    onOpen();
                  }
                })
                .catch(() => {
                  setLoading(false);
                  console.log("there is an error");
                  setErrorMessage(
                    "There is a connection error. Please try again."
                  );
                  onOpen();
                });
            } else {
              setErrorMessage("Please check for any empty value.");
              onOpen();
            }
          }}
        >
          สร้างโครงการ
        </Button>
      </Flex>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent backgroundColor="red.100">
          <ModalBody>
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>{errorMessage}</AlertTitle>
              <CloseButton
                position="absolute"
                right="8px"
                top="8px"
                onClick={onClose}
              />
            </Alert>
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  ) : (
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
        <Text fontSize="xx-large">กรุณารอการยืนยันการสร้างโครงการจากระบบ</Text>
        <Button
          id="ok"
          colorScheme="purple"
          variant="solid"
          w="200px"
          borderRadius={16}
          fontSize="x-large"
          onClick={() => {
            navigate("/home");
          }}
        >
          ตกลง
        </Button>
      </VStack>
    </Box>
  );
}

export default CreateProjectForm;
