import React, { useEffect, useState } from "react";
import Cookies from "js-cookie"
import { useNavigate } from "react-router-dom";

import { HStack, VStack, ChakraProvider, Box, Grid, GridItem, Center, Flex, extendTheme, Heading, Alert, AlertIcon, CloseButton, AlertTitle } from '@chakra-ui/react'

import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectList from "./ProjectList";
import {getMyProjects, getAllUnpublishedProjects} from "../../api/project-list/project-list-api"

function MyProjectComponent() {
    const navigate = useNavigate();
    const [projectList, setProjectList] = useState([])

    useEffect(async () => {
        try {
            const newProjectList = await getAllUnpublishedProjects(Cookies.get('token'))
            setProjectList(newProjectList)
        } catch(err) {
            console.log(err)
            //navigate('/')
        }
        
    }, [])

    return (
        <Center mt='5'>
            <VStack align='stretch' spacing='20px' w='80%'>
                <Center><Heading>Manage Projects</Heading></Center>
                <ProjectList projectList={projectList} isOwner={false} isAdmin={true}/>
            </VStack>
        </Center>
    );
}

export default MyProjectComponent;