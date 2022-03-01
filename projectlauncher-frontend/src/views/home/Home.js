import React from "react";
import Navigator from "../../components/navigator";
import { useNavigate } from "react-router-dom";

import 'bootstrap/dist/css/bootstrap.min.css';

function Home(){

    const navigate = useNavigate();

    return (
        <div>
            <Navigator/>
        </div>
    );
}

export default Home