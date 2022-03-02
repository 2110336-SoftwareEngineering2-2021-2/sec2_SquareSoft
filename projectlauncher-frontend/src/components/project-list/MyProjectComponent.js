import React from "react";
import Cookies from "js-cookie"

import { HStack, VStack, ChakraProvider, Box, Grid, GridItem, Center, Flex, extendTheme, Heading } from '@chakra-ui/react'

import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectList from "./ProjectList";
import {getMyProjects} from "../../api/project-list/project-list-api"

class MyProjectComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            projectList: []
        }
    }

    async componentDidMount() {
        const projectList = await getMyProjects(Cookies.get('token'))
        this.setState({
            projectList: projectList
        })
    }

    render() {
        return (
            <Center mt='5'>
                <VStack align='stretch' spacing='20px' w='80%'>
                    <Center><Heading>My Projects</Heading></Center>
                    <ProjectList projectList={this.state.projectList} isOwner={true}/>
                </VStack>
            </Center>
        );
    }
    
}

export default MyProjectComponent;