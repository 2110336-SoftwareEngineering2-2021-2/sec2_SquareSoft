import React, {useState} from 'react'
import Navigator from "../../components/navigator";
import './Donation.css'
import Cookies from 'js-cookie'
import './Withdraw.css'
import {Input,InputGroup, InputLeftAddon,Stack,Button}  from '@chakra-ui/react'
import {getToken} from '../../api/index.js';
import axios from 'axios'
import {basedURL} from '../../api/index.js';
import {   Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,} from '@chakra-ui/react'
    function handleConfirm(e){
        e.preventDefault();
        let bankName = e.target[0].value
        let bankAccountName = e.target[1].value
        let amount = e.target[2].value
        let slip = e.target[3].files[0]
    }
function ProjectItem(props){
    const {data,state} = props;
    return (
        <Tr className='item'>
            <Td> {data.projectName}</Td>
            <Td> {data.amount}</Td>
            <Td>{<Button colorScheme='red' variant='solid'>withdraw</Button>}</Td>
        </Tr>
    )
}
const test_data = [
    {"projectName":"project 1","amount":100},
    {"projectName":"project 2","amount":200},
    {"projectName":"project 3","amount":300}
]
class WithdrawProjectOwner extends React.Component{
    constructor(props) {
        super(props);

    }

    render(){
        const data_arr = test_data
        const projectElement = data_arr.map((pro,index) => {
            return <ProjectItem data={pro} key={index}/>
        }) 
        return <div>
                    <Navigator/>
                    <div className='withdraw'> 
                        Withdraw
                    </div>
                    <Table variant='simple' colorScheme='teal'>
                        <Thead>
                            <Tr>
                                <Th>Project Name</Th>
                                <Th> Amont </Th>
                                <Th> Button </Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {projectElement}
                        </Tbody>
                    </Table>
                    
                </div>
    }
}

export default WithdrawProjectOwner