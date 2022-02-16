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
                <Nav className="me-auto">
                    <Nav.Link href="#home">Home</Nav.Link>
                    <Nav.Link href="#link">Link</Nav.Link>
                    <NavDropdown title={(this.state.username === null)? "Guest": this.state.username} id="basic-nav-dropdown">
                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                    {(this.state.isLoggedin)&&<NavDropdown.Item onClick = {() => this.logout()}>Log out</NavDropdown.Item>}
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                </Navbar.Collapse>
            </Container>
            </Navbar>
        </div>;
    }
}

function WithNavigate(props){
    let navigate = useNavigate();
    return <Navigator {...props} navigate= {navigate}/>
}

export default WithNavigate;