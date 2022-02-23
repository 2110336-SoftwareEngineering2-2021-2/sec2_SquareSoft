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
            projectList: [],
            isOwner: null
        }
    }

    componentDidMount() {
        const {projectList, isOwner} = getProjectsOfAnOwner(this.props.ownerid, Cookies.get('token'))
        this.setState({
            projectList: projectList,
            isOwner: isOwner
        })
    }

    render() {
        return (
            <Center mt='5'>
                <VStack align='stretch' spacing='20px' w='80%'>
                    <ProjectList projectList={this.state.projectList} isOwner={this.state.isOwner}/>
                </VStack>
            </Center>
        );
    }
    
}

export default ProjectListOfAnOwnerComponent