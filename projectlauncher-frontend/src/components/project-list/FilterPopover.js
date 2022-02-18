import React from 'react'
import { Text, VStack, Popover, PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverFooter,
  PopoverArrow,
  PopoverCloseButton, 
  Button, Radio, RadioGroup, Box, Stack } from '@chakra-ui/react'


function FilterPopover(props) {
    return (
        <Popover variant='responsive'>
            <PopoverTrigger>
                <Button h='1.75rem' size='sm'>
                    Filter
                </Button>
            </PopoverTrigger>
            <PopoverContent>
                <PopoverBody>
          Colors:
          <RadioGroup >
            <Radio value='red'>red</Radio>
            <Radio value='blue'>blue</Radio>
            <Radio value='green'>green</Radio>
            <Radio value='purple'>purple</Radio>
          </RadioGroup>
        </PopoverBody>
            </PopoverContent>
        </Popover>
    )
}

export default FilterPopover;