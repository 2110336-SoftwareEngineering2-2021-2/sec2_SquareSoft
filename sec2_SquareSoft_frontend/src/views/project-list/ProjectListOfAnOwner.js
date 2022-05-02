import React from "react";
import Navigator from "../../components/navigator";
import { useNavigate, useParams } from "react-router-dom";


import { HStack, VStack, ChakraProvider, Box, Grid, GridItem, Center, Flex, extendTheme, Header } from '@chakra-ui/react'

import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectListOfAnOwnerComponent from "../../components/project-list/ProjectListOfAnOwnerComponent"

function ProjectListOfAnOwner(props){

    const navigate = useNavigate();
    const {ownerid} = useParams();

    return (
        <div>
            <Navigator/>
            <ProjectListOfAnOwnerComponent ownerid={ownerid}/>
        </div>
    );
}

export default ProjectListOfAnOwner