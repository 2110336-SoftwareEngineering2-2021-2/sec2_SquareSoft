import React from 'react'
import { HStack, VStack, ChakraProvider, Box, Grid, GridItem, Center, Flex, extendTheme } from '@chakra-ui/react'
import ProjectBox from './ProjectBox'

function ProjectList(props) {
    const property = {
        imageUrl: 'https://picsum.photos/500/300?random=1',
        title: 'Lorem ipsum dolor sit amet',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
    }
    
    return (
        <Grid templateColumns='repeat(3, 1fr)' gap={6} bg='white'>
            <GridItem>
              <Center ><ProjectBox imageUrl={property.imageUrl} title={property.title} description={property.description} /></Center>
            </GridItem>
            <GridItem>
              <Center ><ProjectBox imageUrl={property.imageUrl} title={property.title} description={property.description} /></Center>
            </GridItem>
            <GridItem>
              <Center ><ProjectBox imageUrl={property.imageUrl} title={property.title} description={property.description} /></Center>
            </GridItem>
            <GridItem>
              <Center ><ProjectBox imageUrl={property.imageUrl} title={property.title} description={property.description} /></Center>
            </GridItem>
        </Grid>
    )
}

export default ProjectList