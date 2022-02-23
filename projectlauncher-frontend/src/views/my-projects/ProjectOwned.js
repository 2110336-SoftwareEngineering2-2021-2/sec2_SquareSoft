import React from "react";
import Navigator from "../../components/navigator";
import { useNavigate } from "react-router-dom";

import { HStack, VStack, ChakraProvider, Box, Grid, GridItem, Center, Flex, extendTheme, Header } from '@chakra-ui/react'

import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectOwnedComponent from "../../components/project-list/ProjectOwnedComponent";

function Home(){

    const navigate = useNavigate();

    return (
        <div>
            <Navigator/>
            <ProjectOwnedComponent/>
        </div>
    );
}

export default Home