import React from "react";
import {Navbar, Container, NavDropdown, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css'
import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
//
class Navigator extends React.Component{
    constructor(props) {
        super(props);
        this.state = {username: null, isLoggedin: false, role: null}
    }

    componentDidMount() {
        // Check if logged in
        if (Cookies.get('token')) {
            this.setState({
                isLoggedin: true,
                username: Cookies.get('username'),
                role: Cookies.get('role')
            })
        }
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
        return <div>
            <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand href="/">ProjectLauncher</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <NavDropdown title={(this.state.username === null)? "Guest": this.state.username} id="basic-nav-dropdown">
                    {(!this.state.isLoggedin)&&<NavDropdown.Item onClick = {() => {this.props.navigate('/login')}}>Login</NavDropdown.Item>}
                    {(!this.state.isLoggedin)&&<NavDropdown.Item onClick = {() => {this.props.navigate('/sign-up')}}>Sign Up</NavDropdown.Item>}
                    {(!this.state.isLoggedin)&&<NavDropdown.Item onClick = {() => {this.props.navigate('/sign-up-projectOwner')}}>Sign Up-PO</NavDropdown.Item>}
                    {(this.state.isLoggedin && this.state.role === 'projectOwner')&&<NavDropdown.Item onClick = {() => {this.props.navigate('/projects/my-project')}}>My Projects</NavDropdown.Item>}
                    {(this.state.isLoggedin && this.state.role === 'projectOwner')&&<NavDropdown.Item onClick = {() => {this.props.navigate('/create-project')}}>Create Project</NavDropdown.Item>}
                    {(this.state.isLoggedin)&&<NavDropdown.Divider />}
                    {(this.state.isLoggedin)&&<NavDropdown.Item onClick = {() => this.onClickLogOut()}>Log out</NavDropdown.Item>}
                    {/* <NavDropdown.Divider />
                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
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