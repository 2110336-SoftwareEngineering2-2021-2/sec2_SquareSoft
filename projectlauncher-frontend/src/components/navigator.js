import React from "react";
import {Navbar, Container, NavDropdown, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css'
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import coinIcon from './coin-icon.png';
import axios from 'axios'
import {basedURL} from '../api/index.js';
//
async function numCoins(token){
    try{
        const response = await axios.get(basedURL.concat('transaction/getUserBalance'), {}, {
            headers: { Authorization: `Bearer ${token}` }
        })
        console.log(response)
        return response
    }catch(err){
        console.log("asdfasdfadf")
        // console.log("sdfdfdf")
        // console.log(err.response.status)
        // console.log(err.response.data)
        // let data = err.response.data
        // if(data['msg'] == "register failed: database error"){
        //     if(data['err']['code'] == 11000 ){
        //         return { status:"error", message:Object.keys(data['err']['keyPattern'])[0] + " used"}
        //     }}
        console.log("error")
        
    }
}

class Navigator extends React.Component{
    constructor(props) {
        super(props);
        this.state = {username: null, isLoggedin: false}
    }

    componentDidMount() {
        // Check if logged in
        if (Cookies.get('token')) {
            this.setState({isLoggedin: true})
            this.setState({username: Cookies.get('username')})
        }
    }
    onClickLogOut() {
        // remove token
        this.setState({isLoggedin: false})
        Cookies.remove('token')
        Cookies.remove('username')
        this.props.navigate('/login')
    }
    render(){
        return <div>
            <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="#home">ProjectLauncher</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    {/* {(this.state.isLoggedin)&&<Nav.Link href='#'>{numCoins(Cookies.get("token"))}</Nav.Link>} */}
                    {(this.state.isLoggedin)&&<Nav.Link href='#'><img src={coinIcon} alt="" width="28" height="28"/></Nav.Link>}
                    <NavDropdown title={(this.state.username === null)? "Guest": this.state.username} id="basic-nav-dropdown">
                    {(!this.state.isLoggedin)&&<NavDropdown.Item onClick = {() => {this.props.navigate('/login')}}>Login</NavDropdown.Item>}
                    {(!this.state.isLoggedin)&&<NavDropdown.Item onClick = {() => {this.props.navigate('/sign-up')}}>Sign Up</NavDropdown.Item>}
                    {(!this.state.isLoggedin)&&<NavDropdown.Item onClick = {() => {this.props.navigate('/sign-up-projectOwner')}}>Sign Up-PO</NavDropdown.Item>}
                    {(this.state.isLoggedin)&&<NavDropdown.Item onClick = {() => this.onClickLogOut()}>Log out</NavDropdown.Item>}
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
            <div>{(numCoins(Cookies.get("token"))).toString()}</div>
        </div>;
    }
}

function WithNavigate(props){
    let navigate = useNavigate();
    return <Navigator {...props} navigate= {navigate}/>
}

export default WithNavigate;