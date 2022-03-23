import React, {useState} from "react";
import {Navbar, Container, NavDropdown, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css'
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import coinIcon from './coin-icon.png';
import axios from 'axios'
import {basedURL} from '../api/index.js';
import {getToken} from '../api/index.js';

import { BellIcon } from '@chakra-ui/icons';
import { HStack } from '@chakra-ui/react'
import NotificationModal from './notification-modal';
// 
async function numCoins(token){
    try{
        const response = await axios.get(basedURL.concat('transaction/getUserBalance'), {
            headers: { Authorization: "Bearer " + token }
        })
        console.log(response)
        return response.data.balance;
    }catch(err){
        console.log(err)
        // console.log("sdfdfdf")
        // console.log(err.response.status)
        // console.log(err.response.data)
        // let data = err.response.data
        // if(data['msg'] == "register failed: database error"){
        //     if(data['err']['code'] == 11000 ){
        //         return { status:"error", message:Object.keys(data['err']['keyPattern'])[0] + " used"}
        //     }}
        // console.log("error")
        
    }
}

class Navigator extends React.Component{
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
        this.setNumberOfNotification = this.setNumberOfNotification.bind(this);
        this.setNotificationIsOpen = this.setNotificationIsOpen.bind(this);
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

    setNumberOfNotification(value){
        this.setState({numberOfNotifcation: value});
    }

    setNotificationIsOpen(value){
        this.setState({notificationIsOpen: value});
    }

    render(){
        
        return <div>
            
            <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">ProjectLauncher</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    {(this.state.isLoggedin && this.props.balance!=="undefined")&&<Nav.Link href='donation'>
                        <div class = "hstack gap-2">
                            <div> {this.state.balance}</div>
                            <img src={coinIcon} alt="" width="28" height="28"/>
                        </div>
                    </Nav.Link>}
                </Nav>
                <Nav>
                    <HStack>
                        <BellIcon color='red.500'/>
                        <NavDropdown title={(this.state.username === null)? "Guest": this.state.username} id="basic-nav-dropdown">
                            {(!this.state.isLoggedin)&&<NavDropdown.Item onClick = {() => {this.props.navigate('/login')}}>Login</NavDropdown.Item>}
                            {(!this.state.isLoggedin)&&<NavDropdown.Item onClick = {() => {this.props.navigate('/sign-up')}}>Sign Up</NavDropdown.Item>}
                            {(!this.state.isLoggedin)&&<NavDropdown.Item onClick = {() => {this.props.navigate('/sign-up-projectOwner')}}>Sign Up-PO</NavDropdown.Item>}
                            {<NavDropdown.Item onClick = {() => {this.setNotificationIsOpen(true);}}>Notification({this.state.numberOfNotifcation})</NavDropdown.Item>}
                            {(this.state.isLoggedin && this.state.role === 'projectOwner')&&<NavDropdown.Item onClick = {() => {this.props.navigate('/projects/my-project')}}>My Projects</NavDropdown.Item>}
                            {(this.state.isLoggedin && this.state.role === 'projectOwner')&&<NavDropdown.Item onClick = {() => {this.props.navigate('/create-project')}}>Create Project</NavDropdown.Item>}
                            {(this.state.isLoggedin)&&<NavDropdown.Divider />}
                            {(this.state.isLoggedin)&&<NavDropdown.Item onClick = {() => this.onClickLogOut()}>Log out</NavDropdown.Item>}
                            {/* <NavDropdown.Divider /> <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
                        </NavDropdown>
                    </HStack>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>

            <NotificationModal 
                setNumberOfNotification = {this.setNumberOfNotification} 
                setNotificationIsOpen = {this.setNotificationIsOpen} 
                notificationIsOpen = {this.state.notificationIsOpen}
            />

            {/* <div>{(numCoins(getToken())).toString()}</div> */}

        </div>;
    }
}

function WithNavigate(props){
    let navigate = useNavigate();
    return <Navigator {...props} navigate= {navigate}/>
}

export default WithNavigate;