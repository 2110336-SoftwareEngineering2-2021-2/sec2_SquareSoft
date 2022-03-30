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


// console.log(props.id)
//         let req = {"projectID": props.id, "fields": real_result}
//         try{
//             const response = await axios.patch(basedURL.concat('project/edit-project'), req, {
//                     headers: { Authorization: "Bearer " + getToken() }
//                 })
//                 console.log(response)
//         }catch(err){
//             console.log(err.response.status)
//             console.log(err.response.data)
//             let data = err.response.data
        // }
const test_data = 
{
    "_id": "621f84b4612d6c3c122a2b25",
    "projectName": "test",
    "objective": "kill everyone",
    "description": "asdfasdf",
    "fundingType": "asddfasdf",
    "category": "asdfasdfadsf",
    "deadline": "2022-03-10T14:49:18.000Z",
    "fundingGoal": 344234234,
    "fundingMoneyStatus": 0,
    "projectOwnerID": "620bc28bb193bdd8d0b53718",
    "projectPicture": "bb2d590a61d57afbc07bb9157001de0a127c5ed9.jpeg",
    "projectVideo": "test",
    "projectPublishStatus": "unpublished",
    "__v": 0,
    "progress": 21,
    "withdrawnAmount": 0
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
            var temp = await getProjectById(this.props.id)
            this.setState({
                isLoggedin: true,
                project: temp
            })
            console.log(temp)
        }
        else{
            this.setState({
                isLoggedin: false,
                project: null
            })
        }
    }
    refreshPage(){
        window.location.reload(false)
    }
    async handleConfirm(e, props){
        e.preventDefault();
        let objective = e.target[0].value
        let description = e.target[1].value
        let fundingType = e.target[2].value
        let category = e.target[3].value
        let deadline = e.target[4].value
        let fundingGoal = e.target[5].value
        let result = {
            "objective": objective,
            "description": description,
            "fundingType": fundingType,
            "category": category,
            "deadline": deadline,
            "fundingGoal": fundingGoal,    
        }
        if(result['fundingGoal']!==""){
            result['fundingGoal'] = Number(result['fundingGoal'])
        }
        let real_result = {}
        for(let [field, value] of Object.entries(result)){
            if(value!=="" && value!= undefined){
                real_result[field] = value
            }
        }
        // console.log(real_result)
        // let temp = await getProjectById(this.state)
        // console.log(props.id)
        let req = {"projectID": props.id, "fields": real_result}
        try{
            const response = await axios.patch(basedURL.concat('project/edit-project'), req, {
                    headers: { Authorization: "Bearer " + getToken() }
                })
                console.log(response)
                return {status:"success",response}
        }catch(err){
            console.log(err.response.status)
            console.log(err.response.data)
            let data = err.response.data
            if(data['msg'] == "update failed: database error"){
                if(data['err']['code'] == 11000 ){
                    return { status:"error", message:Object.keys(data['err']['keyPattern'])[0] + " used"}
                }
            }   
        }
        console.log(this.state.project)
        this.refreshPage()
    }
    render(){
        //test
        // this.project = test_data
        if(this.state.project!=null)
        return <div>
            <Navigator/>
            <div className ='header'>Update Project :{this.state.project.projectName}</div>
            <form onSubmit={(e) => {this.handleConfirm(e, this.props)}}> 
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
                            <Td> {this.state.project.objective}</Td>
                            <Td>{<Input placeholder='Enter New Objective' className='box'/>}</Td>
                            
                        </Tr>
                        <Tr className='item'>
                            <Td> 
                                <div className='topic'>
                                    Description :
                                </div>
                             </Td> 
                            <Td> {this.state.project.description}</Td>
                            <Td>{<Input placeholder='Enter New Description' className='box'/>}</Td>
                            
                        </Tr>
                        <Tr className='item'>
                            <Td> 
                                <div className='topic'>
                                    Funding Type :
                                </div>
                             </Td> 
                            <Td> {this.state.project.fundingType}</Td>
                            <Td>{<Input placeholder='Enter New FundingType' className='box'/>}</Td>
                            
                        </Tr>
                        <Tr className='item'>
                            <Td> 
                                <div className='topic'>
                                    Category :
                                </div>
                             </Td> 
                            <Td> {this.state.project.category}</Td>
                            <Td>{<Input placeholder='Enter New Category' className='box'/>}</Td>
                            
                        </Tr>
                        <Tr className='item'>
                            <Td> 
                                <div className='topic'>
                                    Deadline :
                                </div>
                             </Td> 
                            <Td> {this.state.project.deadline}</Td>
                            <Td>{<Input  type = "date" placeholder='Enter New Deadline' className='box'/>}</Td>
                        </Tr>
                        <Tr className='item'>
                            <Td> 
                                <div className='topic'>
                                    Funding Goal :
                                </div>
                             </Td> 
                            <Td> {this.state.project.fundingGoal}</Td>
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
            <div></div>
        </div>
    }
}
function WithEditProjectDetail(props){
    let navigate = useNavigate();
    let {id} = useParams()
    return <EditProjectDetail {...props} navigate= {navigate} id={id} />
}

export default WithEditProjectDetail