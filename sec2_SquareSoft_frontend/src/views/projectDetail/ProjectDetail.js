import React, {useState} from 'react'
import Navigator from "../../components/navigator";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import './ProjectDetail.css'
import {getProjectById, donate} from '../../api/project-detail/project-detail-api'
import {getProjectProgressByID} from '../../api/project-detail/update-project-progression'
import {getImageURL} from '../../api/image/image';
import { 
    Button, Image,  Table,
    Thead,
    Tbody,
    Tr,
    Td,
    Box,
    VStack,
    Text,
    HStack,
    Badge,
    Progress,
    Input,
    Center} from '@chakra-ui/react'
import CreateReviewBox from './create-review-box';
import AreaShow from './create-review-show.js';

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

const ProjectDetail =()=>{
    
    const [project,setProject]=useState(0);
    const [progress,setProgress]=useState(null);
    const [ imageURL, setImageURL ] = useState(null);
    const { id } = useParams();

    const navigate = useNavigate();

    const onSupport = (id, value) => {
        donate(id, Number(value))
        .then(() =>{
            navigate(-1);
        })
        .catch(() => {
            alert("Insufficient fund.");
        }); 
    }

    const [value, setValue] = useState('0')
    const handleChange = (event) => setValue(event.target.value)

    useEffect(() => {
        if(!project){
            getProjectById(id)
            .then(res => {
                setProject(res);
            })
        }
        if(project){
            if(!imageURL){
                getImageURL(project.projectPicture).then(res => {
                    setImageURL(res);
                });
            }
            if(!progress){
                getProjectProgressByID(id)
                .then((res) => {
                    setProgress(res.data.progress!==undefined ? res.data.progress:0);
                })
                .catch(() => {
                    setProgress(0);
                });
            }
        }
    }, [progress, project, imageURL]);

    if (project!==undefined)
    return (
        <div>
            <Navigator/>
            <Image boxSize='300px' objectFit='cover' src={imageURL} className='image-logo'/>
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
            <Center>
                <VStack>
                    <HStack>
                        <Text>Donate Amount : </Text>
                        <Input  w = {100} minH = {10} maxH = {10} 
                                value={value}
                                onChange={handleChange}/>
                    </HStack>
                    <HStack>
                        <Button colorScheme='blue' variant='solid' onClick={() => {navigate(-1);}}> BACK </Button>
                        <Button colorScheme='red' variant='solid' onClick={() => {onSupport(project._id, value);}}> SUPPORT </Button>
                    </HStack>
                </VStack>
            </Center>
            </div>
            <CreateReviewBox projectID={project._id}/>
            <br/>
            <hr></hr>
            <AreaShow projectID={project._id} avgStar = {project.avgStar}/>
            
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