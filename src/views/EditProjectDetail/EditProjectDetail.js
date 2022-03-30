import React, {useState} from 'react'
import Navigator from "../../components/navigator";
import { useNavigate, useParams} from "react-router-dom";
import './EditProjectDetail.css'
import {getProjectById} from '../../api/project-detail/project-detail-api'
import {basedURL, getToken} from "../../api/index.js";
import axios from 'axios'
import Cookies from 'js-cookie'

import { 
    Button, Image, Th, Table,AspectRatio ,
    Thead,
    Tbody,
    Tr,
    Td,Input} from '@chakra-ui/react'

function refreshPage(){
    window.location.reload(false)
}

const test_data = 
    {
        url: 'https://bit.ly/dan-abramov',
        objective : 'เพื่อสร้างเกมแนวเนื้อเรื่อง',
        description: 'โครงการ Are we still alive? เป็นโครงการที่เราจะสร้างเกมแนวเนื้อเรื่องขึ้นมา',
        fundingType:'โครงการเชิงพาณิชย์',
        category:'เทคโนโลยี',
        deadline:'01/09/2025',
        fundingGoal:'200,000'
    }
async function handleConfirm(e){
    e.preventDefault();
    let objective = e.target[0].value
    let description = e.target[1].value
    let fundingType = e.target[2].value
    let category = e.target[3].value
    let deadline = e.target[4].value
    let fundingGoal = e.target[5].value
    // axios.post

    alert("Update Successful")
    refreshPage()

}
class EditProjectDetail extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            data: [], 
            isLoggedin: false,
            project: null,
            id:0,
        }
    }
    async componentDidMount() {
        // Check if logged in
        if (Cookies.get('token')) {
            let temp = await getProjectById(this.props.id)
            this.setState({
                isLoggedin: true,
                project: temp
            })
        }
        else{
            this.setState({
                isLoggedin: false,
                project: null
            })
        }
    }
    render(){
        //test
        this.project = test_data

        if(this.project!=null)
        return <div>
            <Navigator/>
            <div className ='header'>Update Project :{this.props.id}</div>
            <form onSubmit={handleConfirm}> 
            <div className='grid'>
                <Table variant='simple' colorScheme='teal' size='lg'>
                    <Thead>
                        <Tr>
                            <Th></Th>
                            <Th></Th>
                            <Th></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        <Tr className='item'>
                            <Td> 
                                <div className='topic'>
                                    Objective :
                                </div>
                             </Td>
                            <Td> {this.project.objective}</Td>
                            <Td>{<Input placeholder='Enter New Objective' className='box'/>}</Td>
                            
                        </Tr>
                        <Tr className='item'>
                            <Td> 
                                <div className='topic'>
                                    Description :
                                </div>
                             </Td> 
                            <Td> {this.project.description}</Td>
                            <Td>{<Input placeholder='Enter New Description' className='box'/>}</Td>
                            
                        </Tr>
                        <Tr className='item'>
                            <Td> 
                                <div className='topic'>
                                    Funding Type :
                                </div>
                             </Td> 
                            <Td> {this.project.fundingType}</Td>
                            <Td>{<Input placeholder='Enter New FundingType' className='box'/>}</Td>
                            
                        </Tr>
                        <Tr className='item'>
                            <Td> 
                                <div className='topic'>
                                    Category :
                                </div>
                             </Td> 
                            <Td> {this.project.category}</Td>
                            <Td>{<Input placeholder='Enter New Category' className='box'/>}</Td>
                            
                        </Tr>
                        <Tr className='item'>
                            <Td> 
                                <div className='topic'>
                                    Deadline :
                                </div>
                             </Td> 
                            <Td> {this.project.deadline}</Td>
                            <Td>{<Input  type = "date" placeholder='Enter New Deadline' className='box'/>}</Td>
                            
                        </Tr>
                        <Tr className='item'>
                            <Td> 
                                <div className='topic'>
                                    Funding Goal :
                                </div>
                             </Td> 
                            <Td> {this.project.fundingGoal}</Td>
                            <Td>{<Input type="number" placeholder='Enter New Funding Goal' className='box'/>}</Td>
                        </Tr>
                    </Tbody>
                </Table>
            </div>
            <div className='grid2'>
                <Button className='box2' type="submit" colorScheme='green' variant='solid'>Update</Button>
            </div>
            </form>
        </div>
        else
        return <div>
            <Navigator/>
            <div> second</div>
        </div>
    }
}
function WithEditProjectDetail(props){
    let navigate = useNavigate();
    let {id} = useParams()
    return <EditProjectDetail {...props} navigate= {navigate} id={id} />
}

export default WithEditProjectDetail

