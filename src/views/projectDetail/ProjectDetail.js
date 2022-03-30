import React, {useState} from 'react'
import Navigator from "../../components/navigator";
import VerificcationBox from '../../components/donation-system/admin/transaction-verification';
import { useNavigate, useParams} from "react-router-dom";
import { useEffect } from 'react';
import './ProjectDetail.css'
import {getProjectById} from '../../api/project-detail/project-detail-api'
import {getProjectProgressByID} from '../../api/project-detail/update-project-progression'
import { 
    Button, Image,  Table, AspectRatio,
    Thead,
    Tbody,
    Tr,
    Td,
    Box,
    VStack,
    Text,
    HStack,
    Badge,
    Progress,} from '@chakra-ui/react'
import Cookies from 'js-cookie';

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

const ProjectDetail =()=>{
    
    const [project,setProject]=useState(0);
    const [progress,setProgress]=useState(null);
    const { id } = useParams();

    useEffect(() => {
        getProjectById(id)
            .then(res => {
                setProject(res);
            })
        if(!progress && project){
            getProjectProgressByID(id)
            .then((res) => {
                console.log(res)
                setProgress(res.data.progress!==undefined ? res.data.progress:0);
            })
            .catch(() => {
                setProgress(0);
            });
        }
    }, [progress, project]);

    if (project!==undefined)
    return (
        <div>
            <Navigator/>
            <Image boxSize='300px' objectFit='cover' src={project.imageUrl} className='image-logo'/>
            <Table variant='simple'>
                <Thead>
                </Thead>
                <Tbody>
                    <Tr className='item'>
                        <Td>Name :</Td>
                        <Td>{project.projectName}</Td>
                    </Tr>
                    <Tr className='item'>
                        <Td>Objective :</Td>
                        <Td>{project.objective}</Td>
                    </Tr>
                    <Tr className='item'>
                        <Td>Describe :</Td>
                        <Td>{project.description}</Td>
                    </Tr>
                    <Tr className='item'>
                        <Td>Type :</Td>
                        <Td>{project.fundingType}</Td>
                    </Tr>
                    <Tr className='item'>
                        <Td>Category :</Td>
                        <Td>{project.category}</Td>
                    </Tr>
                    <Tr className='item'>
                        <Td>End-Date :</Td>
                        <Td>{project.deadline}</Td>
                    </Tr>
                    <Tr className='item'>
                        <Td>Target Money</Td>
                        <Td>{project.fundingGoal}</Td>
                    </Tr>                 
                    <Tr className='item'>
                        <Td>Current Fund</Td>
                        <Td>{project.fundingMoneyStatus}</Td>
                    </Tr>                 
                </Tbody>
            </Table>
            <Box w = "100%" h = {10} m = {5}>
                <VStack align="left">
                    <HStack>
                        <Text>ความคืบหน้า : </Text>
                        <Badge>{progress} %</Badge>
                    </HStack>
                    <Progress w = "97%" value={progress} colorScheme='purple' isAnimated hasStripe/>
                </VStack>
            </Box>
            <div className='button-grid'>  
                <Button colorScheme='blue' variant='solid' onClick={onBack}> BACK </Button>
                <Button colorScheme='red' variant='solid' onClick={onSupport}> SUPPORT </Button>
            </div>
        </div>
    )
    else 
        return (<div>
            
            <Navigator/>
            <Image  boxSize='300px' objectFit='cover' src="https://cdn2.vectorstock.com/i/1000x1000/39/51/error-404-page-not-found-vector-14463951.jpg" className='image-logo'/>
            <h1 style={{'display':'flex',justifyContent: 'center',fontSize:'30px'}}>ไม่พบโปรเจคที่ต้องการหา</h1>
            </div>
            )
}

export default ProjectDetail