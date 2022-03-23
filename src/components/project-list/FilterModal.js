import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Button,
  VStack,
  Radio, RadioGroup, Stack, Checkbox, CheckboxGroup, Box, Text, HStack, Grid, GridItem, Center, Heading
} from '@chakra-ui/react'

function FilterModal(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <>
      <Button onClick={onOpen}>Filter</Button>

      <Modal isOpen={isOpen} onClose={onClose} size='3xl'>
            <ModalOverlay />
            <ModalContent>
                <ModalBody>
                    <VStack align='stretch'>
                        <Box borderWidth='2px' borderRadius='lg' p='3'>
                            <Heading as='h4' size='md' mb='5'>สถานะโครงการ</Heading>
                            <CheckboxGroup isInline onChange={(e) => props.filterStatusOnChange(e)} value={props.filterStatusValue}>
                                <Grid templateColumns='repeat(2, 1fr)' gap={5} bg='white'>
                                    <GridItem>
                                        <Checkbox value='in-progress'>ดำเนินการอยู่</Checkbox>
                                    </GridItem>
                                    <GridItem>
                                        <Checkbox value='successful'>สำเร็จ</Checkbox>
                                    </GridItem>
                                </Grid>
                            </CheckboxGroup>
                        </Box>
                        
                        <Box borderWidth='2px' borderRadius='lg' p='3'>
                            <Heading as='h4' size='md' mb='5'>ประเภทการระดมทุน</Heading>
                            <CheckboxGroup isInline onChange={(e) => props.filterTypeOnChange(e)} value={props.filterTypeValue}>
                                <Grid templateColumns='repeat(2, 1fr)' gap={5} bg='white'>
                                    <GridItem>
                                        <Checkbox value='โครงการไม่แสวงหาผลกำไร'>โครงการไม่แสวงหาผลกำไร</Checkbox>
                                    </GridItem>
                                    <GridItem>
                                        <Checkbox value='โครงการเชิงพาณิชย์'>โครงการเชิงพาณิชย์</Checkbox>
                                    </GridItem>
                                </Grid>
                            </CheckboxGroup>
                        </Box>
                        
                        <Box borderWidth='2px' borderRadius='lg' p='3'>
                            <Heading as='h4' size='md' mb='5'>หมวดหมู่โครงการ</Heading>
                            <CheckboxGroup isInline onChange={(e) => props.filterCategoryOnChange(e)} value={props.filterCategoryValue}>
                                <Grid templateColumns='repeat(4, 1fr)' gap={5} bg='white'>
                                    <GridItem>
                                        <Checkbox value='ศิลปะ'>ศิลปะ</Checkbox>
                                    </GridItem>
                                    <GridItem>
                                        <Checkbox value='อาหาร'>อาหาร</Checkbox>
                                    </GridItem>
                                    <GridItem>
                                        <Checkbox value='ดนตรี'>ดนตรี</Checkbox>
                                    </GridItem>
                                    <GridItem>
                                        <Checkbox value='เทคโนโลยี'>เทคโนโลยี</Checkbox>
                                    </GridItem>
                                    <GridItem>
                                        <Checkbox value='แฟชัน'>แฟชัน</Checkbox>
                                    </GridItem>
                                    <GridItem>
                                        <Checkbox value='สุขภาพ'>สุขภาพ</Checkbox>
                                    </GridItem>
                                    <GridItem>
                                        <Checkbox value='วิจัย'>วิจัย</Checkbox>
                                    </GridItem>
                                    <GridItem>
                                        <Checkbox value='สังคม'>สังคม</Checkbox>
                                    </GridItem>
                                </Grid>
                            </CheckboxGroup>
                        </Box>
                    </VStack>
                </ModalBody>

                <ModalFooter>
                    <Button colorScheme='gray' mr={3} onClick={onClose}>
                        Close
                    </Button>
                    <Button colorScheme='purple' mr={3} onClick={() => {
                        props.searchOnSubmit()
                        onClose()
                    }}>
                        Search
                    </Button>
                </ModalFooter>
            </ModalContent>
      </Modal>
    </>
  )
}

export default FilterModal