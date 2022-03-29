import React, {useState} from 'react'
import Navigator from "../../components/navigator";
import './Donation.css'
import Cookies from 'js-cookie'
import './Deposit.css'
import {Input,InputGroup, InputLeftAddon,Stack,Button}  from '@chakra-ui/react'
import axios from 'axios'
import {basedURL, getToken} from "../../api/index.js";
async function handleConfirm(e){
    e.preventDefault();
    let bankName = e.target[0].value
    let bankAccountName = e.target[1].value
    let amount = e.target[2].value
    let slip = e.target[3].files[0]
    let err = ""
    let state = true;
    amount = Number(amount)
    for(var i=0;i<4;i++)
        if(e.target[i].value === "") state = false
    if(!state) err+= "Fill in the missing information.\n"
    if(state){
        try{

            let inp_data = await axios.post(basedURL.concat('transaction/newUserDeposit'), 
                {    "amount": amount,
                "paymentMethod": "bank transfer",
                "bank": bankName},
                {
                    headers: { Authorization: "Bearer "+getToken() },
                    // data: {amount,paymentMethod:"bank transfer",bank:bankName}
                }
            );
    
            let inp_data2 = await axios.patch(basedURL.concat('transaction/updateUserDepositRef'), 
            {    
                
                    "internalTXID": inp_data.data.transaction._id,
                    "txRef": "https://www.kasikornbank.com/SiteCollectionDocuments/personal/digital-banking/kplus/functions/bill-payment/img/img-08-en.png"
            },
            {
                headers: { Authorization: "Bearer "+getToken() },
                // data: {amount,paymentMethod:"bank transfer",bank:bankName}
            }
        );
    
            return inp_data.data;
        }
        catch(err){
            console.log(err)
        }
    }else{
        alert(err)
    }
    



}

class Deposit extends React.Component{
    constructor(props) {
        super(props);

    }

    async componentDidMount() {
        // Check if logged in
        if (Cookies.get('token')) {
            this.setState({isLoggedin: true})
        }
        else{
            this.setState({isLoggedin: false})
        }
        
    }
    render(){
        return <div>
                    <Navigator/>
                    <form onSubmit={handleConfirm}>
                    <div className='deposit'> 
                        Deposit
                    </div>
                    <div className='control'>
                        <Stack spacing={5} className='box-input'>
                            <InputGroup> 
                                <InputLeftAddon className='box1' children='Bank Name'/>
                                <Input placeholder='Enter Bank Name' className='box'/>
                            </InputGroup>
                            <InputGroup> 
                                <InputLeftAddon className='box1' children='Bank Account'/>
                                <Input placeholder='Enter Bank Account Name' className='box'/>
                            </InputGroup>
                            <InputGroup> 
                                <InputLeftAddon className='box1' children='$ Amount'/>
                                <Input placeholder='Enter amount' className='box'/>
                            </InputGroup>
                            <InputGroup> 
                                <InputLeftAddon className='box1' children='Deposit Slip'/>
                                <Input type="file" className='box'/>
                            </InputGroup>
                            <Button className='box2' type="submit" colorScheme='green' variant='solid'>Confirm</Button>
                        </Stack>
                    </div>
                    </form>
                </div>
    }
}

export default Deposit