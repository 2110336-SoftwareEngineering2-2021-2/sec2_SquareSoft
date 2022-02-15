import React from "react";
import Navigator from "../../components/navigator";
import { useNavigate } from "react-router-dom";
import LoginFormAdmin from "../../components/LoginFormAdmin";

import 'bootstrap/dist/css/bootstrap.min.css';

function LoginAdmin(){

    const navigate = useNavigate();

    return (
        <div>
            <Navigator/>
            <LoginFormAdmin />
        </div>
    );
}

export default LoginAdmin