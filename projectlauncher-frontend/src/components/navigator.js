import React from "react";
import {Navbar, Container, NavDropdown, Nav} from "react-bootstrap";
import 'bootstrap/dist/css/bootstrap.min.css';
import './navbar.css'
import Cookies from 'js-cookie'
class Navigator extends React.Component{

    constructor(props) {
        super(props);
        this.state = {username: null, isLoggedin: false}
    }

    componentDidMount() {
        if (Cookies.get('token')) {
            this.setState({isLoggedin: true})
            this.setState({username: Cookies.get('username')})
        }
    }

    onClickLogOut() {
        this.setState({isLoggedin: false})
        Cookies.remove('token')
        Cookies.remove('username')
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

    // render(){
    //     return <div>
    //         <Navbar bg="dark" variant="dark">
    //         <Container>
    //             <Navbar.Brand href="#home">ProjectLauncher</Navbar.Brand>
    //             <Navbar.Toggle aria-controls="basic-navbar-nav" />
    //             <Navbar.Collapse id="basic-navbar-nav">
    //             <Nav className="me-auto">
    //                 <Nav.Link href="#home">Home</Nav.Link>
    //                 <Nav.Link href="#link">{this.state.username}</Nav.Link>
    //                 <NavDropdown title="Dropdown" id="basic-nav-dropdown">
    //                     <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
    //                     <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
    //                     <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
    //                     <NavDropdown.Divider />
    //                     <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
    //                 </NavDropdown>
    //                 <Nav.Link href="#link">{this.state.username}</Nav.Link>
    //             </Nav>
    //             </Navbar.Collapse>
    //         </Container>
    //         </Navbar>
    //     </div>;
    // }
}

export default Navigator;