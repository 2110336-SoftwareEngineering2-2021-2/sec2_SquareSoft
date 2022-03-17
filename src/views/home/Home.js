import React from "react";
import Navigator from "../../components/navigator";
import { useNavigate } from "react-router-dom";

import { HStack, VStack, ChakraProvider, Box, Grid, GridItem, Center, Flex, extendTheme } from '@chakra-ui/react'

import 'bootstrap/dist/css/bootstrap.min.css';
import HomeComponent from "../../components/project-list/HomeComponent";
import ProjectBox from "../../components/project-list/ProjectBox";
import ProjectList from "../../components/project-list/ProjectList";

function Home(){

    const navigate = useNavigate();

    return (
        <div>
            <Navigator/>
            <HomeComponent/>
        </div>
    );
}

export default Home