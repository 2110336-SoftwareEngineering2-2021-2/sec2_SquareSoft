import React from "react";
import Navigator from "../../components/navigator";
import { useNavigate, useParams } from "react-router-dom";


import { HStack, VStack, ChakraProvider, Box, Grid, GridItem, Center, Flex, extendTheme, Header } from '@chakra-ui/react'

import 'bootstrap/dist/css/bootstrap.min.css';
import AdminProjectListComponent from "../../components/project-list/AdminProjectListComponent"

function AdminProjectList(props){

    const navigate = useNavigate();

    return (
        <div>
            <Navigator/>
            <AdminProjectListComponent />
        </div>
    );
}

export default AdminProjectList