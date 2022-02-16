import React from "react";
import Navigator from "../../components/navigator";
import { Navigate } from "react-router-dom";
import LoginFormAdmin from "../../components/LoginFormAdmin";
import Cookies from 'js-cookie'

import 'bootstrap/dist/css/bootstrap.min.css';

class LoginAdmin extends React.Component{

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
                <LoginFormAdmin />
                {(this.state.isLoggedin)? <Navigate to="/home" replace={true}/>: null}
            </div>
        );
    }

    
}

export default LoginAdmin