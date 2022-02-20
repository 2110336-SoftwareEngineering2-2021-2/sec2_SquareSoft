import React from "react";

import { HStack, VStack, ChakraProvider, Box, Grid, GridItem, Center, Flex, extendTheme, Heading } from '@chakra-ui/react'

import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectList from "./ProjectList";
import SearchBar from "./SearchBar";
import {getAllProjects, getFilteredProjects} from "../../api/project-list/project-list-api"

class HomeComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            searchValue: '', 
            filterStatusValue: 'All',
            filterTypeValue: 'All',
            filterCategoryValue: [],
            projectList: []
        }
        this.searchOnChange = this.searchOnChange.bind(this)
        this.searchOnSubmit = this.searchOnSubmit.bind(this)
        this.filterTypeOnChange = this.filterTypeOnChange.bind(this)
        this.filterStatusOnChange = this.filterStatusOnChange.bind(this)
        this.filterCategoryOnChange = this.filterCategoryOnChange.bind(this)
    }

    componentDidMount() {
        const projectList = getAllProjects()
        this.setState({projectList: projectList})
    }

    searchOnChange(e) {
        this.setState({
            searchValue: e.target.value
        }) 
    }

    searchOnSubmit() {
        const projectList = getFilteredProjects(this.state.searchValue, this.state.filterStatusValue, this.state.filterTypeValue, this.state.filterCategoryValue)
        this.setState({projectList: projectList})
    }

    filterStatusOnChange(e) {
        this.setState({filterStatusValue: e})
    }

    filterTypeOnChange(e) {
        this.setState({filterTypeValue: e})
    }

    filterCategoryOnChange(e) {
        this.setState({filterCategoryValue: e})
    }

    render() {
        return (
            <Center mt='5'>
                <VStack align='stretch' spacing='20px' w='80%'>
                    <SearchBar 
                        searchValue={this.state.searchValue} 
                        searchOnChange={this.searchOnChange}
                        filterStatusValue={this.state.filterStatusValue}
                        filterStatusOnChange={this.filterStatusOnChange}
                        filterTypeValue={this.state.filterTypeValue}
                        filterTypeOnChange={this.filterTypeOnChange}
                        filterCategoryValue={this.state.filterCategoryValue}
                        filterCategoryOnChange={this.filterCategoryOnChange}
                        searchOnSubmit={this.searchOnSubmit}
                    />
                    <ProjectList projectList={this.state.projectList}/>
                </VStack>
            </Center>
        );
    }
    
}

export default HomeComponent