import React, {useState} from 'react'
import Navigator from "../../components/navigator";
import VerificcationBox from '../../components/donation-system/admin/transaction-verification';
import { useEffect } from 'react';
import './ProjectDetail.css'

import { 
    Button, Image,  Table,
    Thead,
    Tbody,
    Tr,
    Td,} from '@chakra-ui/react'

const data = 
    {
        url: 'https://bit.ly/dan-abramov',
        objective : 'เพื่อสร้างเกมแนวเนื้อเรื่อง',
        describe: 'โครงการ Are we still alive? เป็นโครงการที่เราจะสร้างเกมแนวเนื้อเรื่องขึ้นมา',
        type:'โครงการเชิงพาณิชย์',
        category:'เทคโนโลยี',
        endDate:'01/09/2025',
        targetMoney:'200,000'
    }

function onSupport(){
    return (
        alert('SUPPORT SUCCESS')
    )
}
function onBack(){
    return (
        alert('BACK SUCCESS')
    )
}

function ProjectDetail(){
    return (
        <div>
            <Navigator/>
            <Image boxSize='300px' objectFit='cover' src={data.url} className='image-logo'/>
            <Table variant='simple'>
                <Thead>
                </Thead>
                <Tbody>
                    <Tr className='item'>
                        <Td>Objective :</Td>
                        <Td>{data.objective}</Td>
                    </Tr>
                    <Tr className='item'>
                        <Td>Describe :</Td>
                        <Td>{data.describe}</Td>
                    </Tr>
                    <Tr className='item'>
                        <Td>Type :</Td>
                        <Td>{data.type}</Td>
                    </Tr>
                    <Tr className='item'>
                        <Td>Category :</Td>
                        <Td>{data.category}</Td>
                    </Tr>
                    <Tr className='item'>
                        <Td>End-Date :</Td>
                        <Td>{data.endDate}</Td>
                    </Tr>
                    <Tr className='item'>
                        <Td>Target Money</Td>
                        <Td>{data.targetMoney}</Td>
                    </Tr>                 
                </Tbody>
            </Table>
            <div className='button-grid'>  
                <Button colorScheme='blue' variant='solid' onClick={onBack}> BACK </Button>
                <Button colorScheme='red' variant='solid' onClick={onSupport}> SUPPORT </Button>
            </div>
        </div>
    )
}

export default ProjectDetail