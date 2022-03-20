import React, {useState, useEffect} from 'react'
import { Box, Center, Image, Button, VStack, Select, Stack, useToast } from '@chakra-ui/react'
import { useNavigate } from "react-router-dom";
import { changeProjectStatus, getProjectStatus } from '../../api/project-status/project-status.js'

function ProjectBox(props) {
    
    const navigate = useNavigate();
    const toast = useToast();
    const [status, setStatus] = useState('option3');

    useEffect(() => {
        const projectStatus = getProjectStatus(props._id)
        setStatus(projectStatus)
    }, [])

    const handleSave = () => {
        try {
            changeProjectStatus(props._id, status)
            toast({
                position: 'top',
                title: `Project status has been changed successfully.`,
                status: 'success',
                duration: 3000,
                isClosable: true,
            })
        } catch {
            toast({
                position: 'top',
                title: `An error occured.`,
                status: 'error',
                duration: 3000,
                isClosable: true,
            })
        }
        
    }

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
                            (props.isAdmin)?
                                <VStack w='100%'>
                                    
                                    <Select mt='5' value={status} onChange={(e) => {setStatus(e.target.selectedOptions[0].value)}}>
                                        <option value='unpublished'>Unpublished</option>
                                        <option value='in-progress'>In Progress</option>
                                        <option value='successful'>Successful</option>
                                    </Select>
                                    <Button borderRadius='md' px={4} h={8} mt='5' w='100%' colorScheme='gray' variant='solid' onClick={() => navigate(`/projects/${props._id}`)}>
                                        View Project
                                    </Button>
                                    <Button borderRadius='md' px={4} h={8} mt='5' w='100%' colorScheme='purple' variant='solid' onClick={() => handleSave()}>
                                        Save
                                    </Button>
                                </VStack>
                                :
                                <Button borderRadius='md' px={4} h={8} mt='5' w='100%' colorScheme='purple' variant='solid' onClick={() => navigate(`/projects/${props._id}`)}>
                                    View Project
                                </Button>
                    }
                </Center>
            </Box>
        </Box>
    )
}

export default ProjectBox