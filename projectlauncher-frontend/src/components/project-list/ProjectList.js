import React from 'react'
import { HStack, VStack, ChakraProvider, Box, Grid, GridItem, Center, Flex, extendTheme } from '@chakra-ui/react'
import ProjectBox from './ProjectBox'

function ProjectList(props) {
    
    return (
        <Grid templateColumns='repeat(3, 1fr)' gap={6} bg='white'>
            {
              props.projectList.map((e) => 
                <GridItem key={e.title}>
                  <Center ><ProjectBox imageUrl={e.imageUrl} title={e.title} description={e.description} isOwner={props.isOwner}/></Center>
                </GridItem>
              )
            }
        </Grid>
    )
}

export default ProjectList