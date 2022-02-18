import React from 'react'
import { Center, Box, Container, HStack, InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react'
import FilterPopover from './FilterPopover';
import FilterModal from './FilterModal';


function SearchBar() {

  return (
      <Center>
        <HStack w='70%'>
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        placeholder='Search for projects'
                    />
                    <InputRightElement width='4.5rem'>
                        <FilterModal/>
                    </InputRightElement>
                </InputGroup>
                <Box as='Button' borderRadius='md' bg='purple' color='white' px={4} h={8} mt='4' w='10%'>
                    Search
                </Box>
        </HStack>
      </Center>
      
    
  )
}

export default SearchBar;