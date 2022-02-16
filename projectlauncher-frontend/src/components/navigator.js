import React from "react";
import {Navbar, Container, NavDropdown, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css'
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";

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
    }

    logout(){
        this.props.navigate('/login')
    }
    render(){
        return <div>
            <Navbar bg="light" variant="light">
            <Container>
                <Navbar.Brand href="#home">ProjectLauncher</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="justify-content-end" style={{ width: "100%" }}>
                    {(this.state.isLoggedin)? <NavDropdown title={this.state.username} id="basic-nav-dropdown">
                        <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item onClick={() => this.onClickLogOut()}>Log out</NavDropdown.Item>
                    </NavDropdown>: 
                    <Nav>
                        <Nav.Link href="register">Register</Nav.Link>
                        <Nav.Link href="login">Log in</Nav.Link>
                    </Nav>
                        }
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>;
    }
}

function WithNavigate(props){
    let navigate = useNavigate();
    let logout = props.logoutbutton;
    if(props.logoutbutton === undefined){
        logout = false;
    }
    return <Navigator {...props} navigate= {navigate} logoutbutton = {logout}/>
}

export default WithNavigate;