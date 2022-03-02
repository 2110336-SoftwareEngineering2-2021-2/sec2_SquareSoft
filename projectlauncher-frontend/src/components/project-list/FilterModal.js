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
                                        <Radio value='all'>All</Radio>
                                    </GridItem>
                                    <GridItem>
                                        <Radio value='incoming'>Incoming</Radio>
                                    </GridItem>
                                    <GridItem>
                                        <Radio value='in-progress'>In progress</Radio>
                                    </GridItem>
                                    <GridItem>
                                        <Radio value='successful'>Successful</Radio>
                                    </GridItem>
                                </Grid>
                            </RadioGroup>
                        </Box>
                        
                        <Box borderWidth='2px' borderRadius='lg' p='3'>
                            <Heading as='h4' size='md' mb='5'>Type</Heading>
                            <RadioGroup onChange={(e) => {props.filterTypeOnChange(e)}} value={props.filterTypeValue}>
                                <Grid templateColumns='repeat(4, 1fr)' gap={5} bg='white'>
                                    <GridItem>
                                        <Radio value='all'>All</Radio>
                                    </GridItem>
                                    <GridItem>
                                        <Radio value='non-profit'>Non-profit</Radio>
                                    </GridItem>
                                    <GridItem>
                                        <Radio value='commercial'>Commercial</Radio>
                                    </GridItem>
                                </Grid>
                            </RadioGroup>
                        </Box>
                        
                        <Box borderWidth='2px' borderRadius='lg' p='3'>
                            <Heading as='h4' size='md' mb='5'>Category</Heading>
                            <CheckboxGroup isInline onChange={(e) => props.filterCategoryOnChange(e)} value={props.filterCategoryValue}>
                                <Grid templateColumns='repeat(4, 1fr)' gap={5} bg='white'>
                                    <GridItem>
                                        <Checkbox value='art'>Art</Checkbox>
                                    </GridItem>
                                    <GridItem>
                                        <Checkbox value='food'>Food</Checkbox>
                                    </GridItem>
                                    <GridItem>
                                        <Checkbox value='music'>Music</Checkbox>
                                    </GridItem>
                                    <GridItem>
                                        <Checkbox value='technology'>Technology</Checkbox>
                                    </GridItem>
                                    <GridItem>
                                        <Checkbox value='fashion'>Fashion</Checkbox>
                                    </GridItem>
                                    <GridItem>
                                        <Checkbox value='health'>Health</Checkbox>
                                    </GridItem>
                                    <GridItem>
                                        <Checkbox value='research'>Research</Checkbox>
                                    </GridItem>
                                    <GridItem>
                                        <Checkbox value='social'>Social</Checkbox>
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