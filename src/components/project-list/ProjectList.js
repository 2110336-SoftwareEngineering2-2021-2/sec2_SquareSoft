import React from 'react'
import { HStack, VStack, ChakraProvider, Box, Grid, GridItem, Center, Flex, extendTheme } from '@chakra-ui/react'
import ProjectBox from './ProjectBox'

function ProjectList(props) {
    
    return (
        <Grid templateColumns='repeat(3, 1fr)' gap={6} bg='white'>
            {
              props.projectList.map((e) => 
                <GridItem key={e._id}>
                  <Center ><ProjectBox  _id={e._id} 
                                        imageUrl={e.imageUrl} 
                                        title={e.title} 
                                        description={e.description} 
                                        isOwner={props.isOwner} 
                                        isAdmin={props.isAdmin} 
                                        fundingMoneyStatus={e.fundingMoneyStatus} 
                                        withdrawnAmount={e.withdrawnAmount}
                                        removeProject={props.removeProject}
                                        /></Center>
                </GridItem>
              )
            }
        </Grid>
    )
}

export default ProjectList
