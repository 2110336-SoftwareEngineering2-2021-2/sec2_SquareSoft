import React from 'react'
import { Box, Center, Image, Button } from '@chakra-ui/react'

function ProjectBox(props) {
    
    
    return (
        <Box maxW='sm' borderWidth='2px' borderRadius='lg' overflow='hidden'>
            <Center><Image src={props.imageUrl} /></Center>
            <Box p='6'>
                <Box fontWeight='semibold' as='h4' lineHeight='tight'>
                    {props.title}
                </Box>

                <hr style={{borderTop: '2px solid gray'}}/>

                <Box display='flex' mt='2' alignItems='center'>
                    <Box as='span' color='gray.600' fontSize='sm' noOfLines={3}>
                        {props.description}
                    </Box>
                </Box>
                
                <Center>
                    <Button borderRadius='md' px={4} h={8} mt='5' w='100%' colorScheme='purple' variant='solid'>
                        {(props.isOwner)? 'Edit Project': 'View Project'} 
                        {/* navigate */}
                    </Button>
                </Center>
            </Box>
        </Box>
    )
}

export default ProjectBox