import React from "react";
import Navigator from "../../components/navigator";
import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";

import 'bootstrap/dist/css/bootstrap.min.css';

function Login(){

    const navigate = useNavigate();

    return (
        <div>
            <Navigator />
            <LoginForm />
        </div>
    );
}

export default Login