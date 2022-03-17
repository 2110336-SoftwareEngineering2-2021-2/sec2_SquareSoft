import React from "react";
import Cookies from "js-cookie"

import { HStack, VStack, ChakraProvider, Box, Grid, GridItem, Center, Flex, extendTheme, Heading } from '@chakra-ui/react'

import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectList from "./ProjectList";
import {getProjectsOfAnOwner} from "../../api/project-list/project-list-api"

class ProjectListOfAnOwnerComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            projectList: []
        }
    }

    async componentDidMount() {
        const projectList = await getProjectsOfAnOwner(this.props.ownerid, Cookies.get('token'))
        this.setState({
            projectList: projectList
        })
    }

    render() {
        return (
            <Center mt='5'>
                <VStack align='stretch' spacing='20px' w='80%'>
                    <ProjectList projectList={this.state.projectList} isOwner={false}/>
                </VStack>
            </Center>
        );
    }
    
}

export default ProjectListOfAnOwnerComponent