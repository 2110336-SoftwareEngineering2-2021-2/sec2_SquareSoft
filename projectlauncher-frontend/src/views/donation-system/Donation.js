import React, {useState} from 'react'
import Navigator from "../../components/navigator";
import { useEffect } from 'react';
import './Donation.css'
import { Stack,Select,
    Input, Image,  Table,Button,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,} from '@chakra-ui/react'
import {basedURL, getToken} from "../../api/index.js";
import axios from 'axios'
import Cookies from 'js-cookie'

function HistoryItem(props){
    const {data,state} = props;
    const date = new Date(data.timestamp)
    function pending(isPending){
        if(isPending){
            return (
                <Button colorScheme='blue' variant='solid' > Cancel </Button>
            )
        }
    }
    if(state == 0){
        return (
            <Tr className='item'>
                <Td> {date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()}</Td>
                <Td> {date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()}</Td>
                <Td>{data.type}</Td>
                <Td>{data.username.username}</Td>
                <Td>{data.status}</Td>
                <Td>{data.amount}</Td>

                <Td>Tranfer to projectID: {data.data.data.toProjectID}</Td>

            </Tr>
        )
    }if(state == 1){
        return (
            <Tr className='item'>
                <Td> {date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()}</Td>
                <Td> {date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()}</Td>
                <Td>{data.type}</Td>
                <Td>{data.username.username}</Td>
                <Td>{data.status}</Td>
                <Td>{data.amount}</Td>
                <Td>Payment method: {data.data.paymentMethod} <br></br><br></br> Bank Name: {data.data.bank}</Td>
            </Tr>
        )
    }if(state == 2){
        return (
            <Tr className='item'>
                <Td> {date.getDate()+"/"+(date.getMonth()+1)+"/"+date.getFullYear()}</Td>
                <Td> {date.getHours()+":"+date.getMinutes()+":"+date.getSeconds()}</Td>
                <Td>{data.type}</Td>
                <Td>{data.username.username}</Td>
                <Td>{data.status}</Td>
                <Td>{data.amount}</Td>
                <Td>Payment method: {data.data.paymentMethod} <br></br><br></br> Bank Name: {data.data.bank}</Td>
            </Tr>
        )
    }
}

const test_data = [
    {
        "_id": "621d36694e124822dd1f869a",
        "timestamp": "2022-02-28T20:54:01.456Z",
        "username": {
            "username": "test",
            "role": "Donator"
        },
        "type": "Transfer",
        "amount": 32.244,
        "status": "Completed",
        "data": {
            "transferType": "Donate",
            "data": {
                "toProjectID": "62190524b7065ef37abccf61"
            }
        },
        "__v": 0
    },
    {
        "_id": "621d360a4e124822dd1f8690",
        "timestamp": "2022-02-28T20:52:26.396Z",
        "username": {
            "username": "test",
            "role": "Donator"
        },
        "type": "Withdraw",
        "amount": 32.244,
        "status": "Pending",
        "data": {
            "paymentMethod": "bank transfer",
            "bank": "kbank",
            "txRef": null
        },
        "__v": 0
    },
    {
        "_id": "621d297e685e425a4ffec28a",
        "timestamp": "2022-02-28T19:58:54.397Z",
        "username": {
            "username": "test",
            "role": "Donator"
        },
        "type": "Deposit",
        "amount": 321421904902.244,
        "status": "Pending",
        "data": {
            "paymentMethod": "bank transfer",
            "bank": "kbank",
            "txRef": null
        },
        "__v": 0
    },
    {
        "_id": "621d2844685e425a4ffec285",
        "timestamp": "2022-02-28T19:53:40.749Z",
        "username": {
            "username": "test",
            "role": "Donator"
        },
        "type": "Deposit",
        "amount": 321421904902.244,
        "status": "Pending",
        "data": {
            "paymentMethod": "bank transfer",
            "bank": "kbank",
            "txRef": null
        },
        "__v": 0
    },
    {
        "_id": "621d2765685e425a4ffec282",
        "timestamp": "2022-02-28T19:49:57.882Z",
        "username": {
            "username": "test",
            "role": "Donator"
        },
        "type": "Deposit",
        "amount": 321421904902.244,
        "status": "Pending",
        "data": {
            "paymentMethod": "bank transfer",
            "bank": "kbank",
            "txRef": null
        },
        "__v": 0
    },
    {
        "_id": "621d1c249bb4a2a51527d363",
        "timestamp": "2022-02-28T19:01:56.656Z",
        "username": {
            "username": "test",
            "role": "Donator"
        },
        "type": "Deposit",
        "amount": 321421904902.244,
        "status": "Pending",
        "data": {
            "paymentMethod": "bank transfer",
            "bank": "kbank",
            "txRef": null
        },
        "__v": 0
    },
    {
        "_id": "621b65395a84117d8dfa8107",
        "timestamp": "2022-02-27T11:49:13.424Z",
        "username": {
            "username": "test",
            "role": "Donator"
        },
        "type": "Deposit",
        "amount": 321421904902.244,
        "status": "Pending",
        "data": {
            "paymentMethod": "bank transfer",
            "bank": "kbank",
            "txRef": null
        },
        "__v": 0
    },
    {
        "_id": "621b60f5c4d2d9e054390b44",
        "timestamp": "2022-02-27T11:31:01.969Z",
        "username": {
            "username": "test",
            "role": "Donator"
        },
        "type": "Deposit",
        "amount": 321421904902.244,
        "status": "Pending",
        "data": {
            "paymentMethod": "bank transfer",
            "bank": "kbank",
            "txRef": null
        },
        "__v": 0
    },
    {
        "_id": "621b6047ce6f1abc98ada9de",
        "timestamp": "2022-02-27T11:28:07.838Z",
        "username": {
            "username": "test",
            "role": "Donator"
        },
        "type": "Deposit",
        "amount": 321421904902.244,
        "status": "Pending",
        "data": {
            "paymentMethod": "bank transfer",
            "bank": "kbank",
            "txRef": null
        },
        "__v": 0
    },
    {
        "_id": "621908ddc77a6e7e79ba93ad",
        "timestamp": "2022-02-25T16:50:37.221Z",
        "username": {
            "username": "test",
            "role": "Donator"
        },
        "type": "Transfer",
        "amount": 50,
        "status": "Completed",
        "data": {
            "transferType": "Donate",
            "data": {
                "toProjectID": "62190524b7065ef37abccf61"
            }
        },
        "__v": 0
    }
]

async function getUserTransaction(){
    try{let inp_data = await axios.get(basedURL.concat('transaction/getUserTransaction'), {
        headers: { Authorization: "Bearer " + getToken() }
    })
    return inp_data.data}
    catch(err){
        console.log(err)
    }
    
}



function DataDonation(props){
    let [stateHistory,setStateHistory] = useState(0)
    // let inp_data = await getUserTransaction();
    let inp_data = props.data
    const data_arr = Object.values(inp_data)
    const filterHistory = data_arr.filter((his) => {
        if(stateHistory == 0) return (his.type == 'Transfer')
        if(stateHistory == 1) return (his.type == 'Withdraw')
        if(stateHistory == 2) return (his.type == 'Deposit')
        if(stateHistory == 3) return his   
    }) 

    const historyElement = filterHistory.map((his,index) => {
        return <HistoryItem key={index} data={his} state={stateHistory}/>
    }) 
    const handleChange = (event) => {
        setStateHistory(event.target.value)
    }
    return(
        <div>
            <Navigator/>
            <div className='tran'> 
                Transaction History
            </div>
            <Select placeholder='Select Type' onChange={handleChange} >
                <option value='0'>Transfer</option>
                <option value='1'>Withdraw</option>
                <option value='2'>Deposit</option>
            </Select>
            <Table variant='striped' colorScheme='teal'>
                <Thead>
                    <Tr>
                        <Th>Date</Th>
                        <Th>Time </Th>
                        <Th>Type</Th>
                        <Th>Username</Th>
                        <Th>Status</Th>
                        <Th>Amount</Th>
                        <Th>Description</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {historyElement}
                </Tbody>
            </Table>
        </div>
    )
}

class Donation extends React.Component{
    constructor(props) {
        super(props);
        this.state = {data: [], isLoggedin: false}
    }

    async componentDidMount() {
        // Check if logged in
        if (Cookies.get('token')) {
            let temp = await getUserTransaction()
            this.setState({isLoggedin: true, data: temp})
        }
        else{
            this.setState({isLoggedin: false, data: []})
        }
        
    }
    render(){
        return <DataDonation  data = {this.state.data}/>
    }
}

export default Donation