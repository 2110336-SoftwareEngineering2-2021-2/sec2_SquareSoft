import React from 'react'
import { Center, Box, Container, HStack, InputGroup, Input, InputRightElement, Button } from '@chakra-ui/react'
import FilterModal from './FilterModal';


function SearchBar(props) {

  return (
      <Center>
        <HStack w='70%'>
                <InputGroup size='md'>
                    <Input
                        pr='4.5rem'
                        placeholder='Search for projects'
                        value={props.searchValue}
                        onChange={props.searchOnChange}
                    />
                    <InputRightElement width='4.5rem'>
                        <FilterModal
                            filterStatusValue={props.filterStatusValue}
                            filterStatusOnChange={props.filterStatusOnChange}
                            filterTypeValue={props.filterTypeValue}
                            filterTypeOnChange={props.filterTypeOnChange}
                            filterCategoryValue={props.filterCategoryValue}
                            filterCategoryOnChange={props.filterCategoryOnChange}
                            searchOnSubmit={props.searchOnSubmit}
                        />
                    </InputRightElement>
                </InputGroup>
                <Button borderRadius='md' px={4} h={8} mt='5' w='10%' colorScheme='purple' variant='solid' onClick={() => props.searchOnSubmit()}>
                        Search
                </Button>
        </HStack>
      </Center>
      
    
  )
}

export default SearchBar;