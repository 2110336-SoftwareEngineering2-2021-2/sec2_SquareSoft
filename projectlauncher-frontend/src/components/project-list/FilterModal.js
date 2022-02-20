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
                            <Heading as='h4' size='md' mb='5'>Status</Heading>
                            <RadioGroup onChange={(e) => {props.filterStatusOnChange(e)}} value={props.filterStatusValue}>
                                <Grid templateColumns='repeat(4, 1fr)' gap={5} bg='white'>
                                    <GridItem>
                                        <Radio value='All'>All</Radio>
                                    </GridItem>
                                    <GridItem>
                                        <Radio value='2'>Second</Radio>
                                    </GridItem>
                                    <GridItem>
                                        <Radio value='3'>Third</Radio>
                                    </GridItem>
                                    <GridItem>
                                        <Radio value='4'>Forth</Radio>
                                    </GridItem>
                                </Grid>
                            </RadioGroup>
                        </Box>
                        
                        <Box borderWidth='2px' borderRadius='lg' p='3'>
                            <Heading as='h4' size='md' mb='5'>Type</Heading>
                            <RadioGroup onChange={(e) => {props.filterTypeOnChange(e)}} value={props.filterTypeValue}>
                                <Grid templateColumns='repeat(4, 1fr)' gap={5} bg='white'>
                                    <GridItem>
                                        <Radio value='All'>All</Radio>
                                    </GridItem>
                                    <GridItem>
                                        <Radio value='2'>Second</Radio>
                                    </GridItem>
                                    <GridItem>
                                        <Radio value='3'>Third</Radio>
                                    </GridItem>
                                </Grid>
                            </RadioGroup>
                        </Box>
                        
                        <Box borderWidth='2px' borderRadius='lg' p='3'>
                            <Heading as='h4' size='md' mb='5'>Category</Heading>
                            <CheckboxGroup isInline onChange={(e) => props.filterCategoryOnChange(e)} value={props.filterCategoryValue}>
                                <Grid templateColumns='repeat(4, 1fr)' gap={5} bg='white'>
                                    <GridItem>
                                        <Checkbox value='kakashi1'>kakashi</Checkbox>
                                    </GridItem>
                                    <GridItem>
                                        <Checkbox value='kakashi2'>kakashi</Checkbox>
                                    </GridItem>
                                    <GridItem>
                                        <Checkbox value='kakashi3'>b</Checkbox>
                                    </GridItem>
                                    <GridItem>
                                        <Checkbox value='kakashi4'>a</Checkbox>
                                    </GridItem>
                                    <GridItem>
                                        <Checkbox value='kakashi5'>kakashi</Checkbox>
                                    </GridItem>
                                    <GridItem>
                                        <Checkbox value='kakashi6'>kakashi</Checkbox>
                                    </GridItem>
                                    <GridItem>
                                        <Checkbox value='kakashi7'>kakashi</Checkbox>
                                    </GridItem>
                                    <GridItem>
                                        <Checkbox value='kakashi8'>kakashi</Checkbox>
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