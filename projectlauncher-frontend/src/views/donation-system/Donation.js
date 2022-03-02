import React, {useState} from 'react'
import Navigator from "../../components/navigator";
import VerificcationBox from '../../components/donation-system/admin/transaction-verification';
import { useEffect } from 'react';
import './Donation.css'
import { Stack,Select,
    Input, Image,  Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,} from '@chakra-ui/react'

function HistoryItem(props){
    const {data,state} = props;
    if(state == 0){
        return (
            <Tr className='item'>
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
]
function Donation(){
    let [stateHistory,setStateHistory] = useState(0)

    const filterHistory = test_data.filter((his) => {
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

export default Donation