import React from "react";
import Navigator from "../../components/navigator";
import { Navigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";

import 'bootstrap/dist/css/bootstrap.min.css';

import Cookies from 'js-cookie'

class Login extends React.Component{

    constructor(props) {
        super(props)
        this.state = {isLoggedin: false}
    }

    componentDidMount() {
        // Check if logged in
        if (Cookies.get('token')) {
            this.setState({isLoggedin: true})
        }
    }

    render() {
        return (
            <div>
                <Navigator/>
                <LoginForm />
                {(this.state.isLoggedin)? <Navigate to="/home" replace={true}/>: null}
            </div>
        );
    }
    
}

export default Login