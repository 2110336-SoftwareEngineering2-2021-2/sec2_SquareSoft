import React from "react";

import { HStack, VStack, ChakraProvider, Box, Grid, GridItem, Center, Flex, extendTheme, Heading, Badge, Text } from '@chakra-ui/react'

import 'bootstrap/dist/css/bootstrap.min.css';
import ProjectList from "./ProjectList";
import SearchBar from "./SearchBar";
import {getAllProjects, getFilteredProjects, getRecommendedProjects} from "../../api/project-list/project-list-api"

class HomeComponent extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            searchValue: '', 
            filterStatusValue: ['published'],
            filterTypeValue: ['โครงการไม่แสวงหาผลกำไร', 'โครงการเชิงพาณิชย์'],
            filterCategoryValue: ['ศิลปะ', 'อาหาร', 'ดนตรี', 'เทคโนโลยี', 'แฟชัน', 'สุขภาพ', 'วิจัย', 'สังคม'],
            projectList: [],
            isRecommended: true
        }
        this.searchOnChange = this.searchOnChange.bind(this)
        this.searchOnSubmit = this.searchOnSubmit.bind(this)
        this.filterTypeOnChange = this.filterTypeOnChange.bind(this)
        this.filterStatusOnChange = this.filterStatusOnChange.bind(this)
        this.filterCategoryOnChange = this.filterCategoryOnChange.bind(this)
    }

    async componentDidMount() {
        const projectList = await getRecommendedProjects()
        this.setState({projectList: projectList})
    }

    searchOnChange(e) {
        this.setState({
            searchValue: e.target.value
        }) 
    }

    async searchOnSubmit() {
        const projectList = await getFilteredProjects(this.state.searchValue, this.state.filterStatusValue, this.state.filterTypeValue, this.state.filterCategoryValue)
        this.setState({projectList: projectList, isRecommended: false})
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
                    {this.state.isRecommended && <Text fontSize='20'>Recommended Projects</Text>}
                    {this.state.projectList.length === 0 && <Center ><Text mt='50' fontSize='20'>Sorry, we couldn't find any results for your search</Text></Center>}
                    <ProjectList projectList={this.state.projectList} isOwner={false}/>
                </VStack>
            </Center>
        );
    }
    
}

export default HomeComponent