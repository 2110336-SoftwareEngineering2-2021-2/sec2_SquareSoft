import React from "react";

import { HStack, VStack, ChakraProvider, Box, Grid, GridItem, Center, Flex, extendTheme, Heading } from '@chakra-ui/react'

import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectList from "./ProjectList";
import SearchBar from "./SearchBar";

function HomeComponent(){

    return (
        <Center mt='5'>
            <VStack align='stretch' spacing='20px'>
                <SearchBar />
                <ProjectList />
            </VStack>
        </Center>
    );
}

export default HomeComponent