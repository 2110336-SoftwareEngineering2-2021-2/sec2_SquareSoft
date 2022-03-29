import React from "react";
import {Navbar, Container, NavDropdown, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css'
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";


class NavigatorAdmin extends React.Component{
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

    render(){
        
        return <>
            <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">ProjectLauncher</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                </Nav>
                <Nav>
                    <NavDropdown title={"admin"} id="basic-nav-dropdown">
                        {(this.state.isLoggedin)&&<NavDropdown.Item onClick = {() => {this.props.navigate('/change-password')}}>Change Password</NavDropdown.Item>}
                        {(this.state.isLoggedin)&&<NavDropdown.Divider />}
                        {(this.state.isLoggedin)&&<NavDropdown.Item onClick = {() => this.onClickLogOut()}>Log out</NavDropdown.Item>}
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </>;
    }
}


export default NavigatorAdmin;