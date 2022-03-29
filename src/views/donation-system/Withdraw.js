import React, {useState} from 'react'
import Navigator from "../../components/navigator";
import './Donation.css'
import Cookies from 'js-cookie'
import './Withdraw.css'
import {Input,InputGroup, InputLeftAddon,Stack,Button}  from '@chakra-ui/react'
import {getToken} from '../../api/index.js';
import axios from 'axios'
import {basedURL} from '../../api/index.js';

async function numCoins(token){
    try{
        const response = await axios.get(basedURL.concat('transaction/getUserBalance'), {
            headers: { Authorization: "Bearer " + token }
        })
        console.log(response)
        return response.data.balance;
    }catch(err){
        console.log(err)
    }
}

async function handleConfirm(e){
    e.preventDefault();
    let amount = e.target[0].value
    amount = Number(amount)
    try{

        let inp_data = await axios.post(basedURL.concat('transaction/newUserWithdraw'), 
            {   
                 "amount": amount
            },
            {
                headers: { Authorization: "Bearer "+ getToken() },
            }
        )
    

        return inp_data.data;
    }
    catch(err){
        console.log(err)
    }
}


class Withdraw extends React.Component{
    constructor(props) {
        super(props);
        this.state = { 
            username: null, 
            isLoggedin: false, 
            role: null, 
            balance: 0, 
            numberOfNotifcation: 0, 
            notificationIsOpen: false
        }
    }
    componentDidMount() {
        // Check if logged in
        if (Cookies.get('token')) {
            this.setState({isLoggedin: true})
            this.tick()
            this.interval = setInterval(() => this.tick(), 100);
            this.setState({username: Cookies.get('username',), role:Cookies.get('role')})
        }
        
    }
    componentWillUnmount(){
        clearInterval(this.interval)
    }

    onClickLogOut() {
        // remove token
        this.setState({isLoggedin: false})
        Cookies.remove('token')
        Cookies.remove('username')
        Cookies.remove('role')
        this.props.navigate('/login')
    }
    async tick(){
        this.setState({
            balance: await numCoins(getToken())
        });
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
        this.tick()
        return <div>
                    <Navigator/>
                    <div className='withdraw'> 
                        Withdraw
                    </div>
                    <form onSubmit={handleConfirm}>
                        <Stack spacing={3} className='box-input'>
                            <div className='balance'>Your Balance:     {this.state.balance} </div>
                            <InputGroup> 
                                <InputLeftAddon className='box1' children='$ Withdraw Amount'/>
                                <Input placeholder='Enter amount withdraw' className='box'/>
                            </InputGroup>
                            <Button className='box2' type="submit" colorScheme='green' variant='solid'>Confirm</Button>
                        </Stack>
                    </form>
                </div>
    }
}

export default Withdraw