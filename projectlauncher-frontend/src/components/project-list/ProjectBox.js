import React from 'react'
import { Box, Center, Image, Button, VStack } from '@chakra-ui/react'

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
                    {/* navigate */}
                    {
                        (props.isOwner)? 
                            <VStack w='100%'>
                                <Button borderRadius='md' px={4} h={8} mt='5' w='100%' colorScheme='purple' variant='solid'>
                                    Update Project
                                </Button>
                                <Button borderRadius='md' px={4} h={8} mt='5' w='100%' colorScheme='gray' variant='solid'>
                                    Edit Project
                                </Button>
                            </VStack>
                            :
                            <Button borderRadius='md' px={4} h={8} mt='5' w='100%' colorScheme='purple' variant='solid'>
                                View Project
                            </Button>
                    }
                </Center>
            </Box>
        </Box>
    )
}

export default ProjectBox