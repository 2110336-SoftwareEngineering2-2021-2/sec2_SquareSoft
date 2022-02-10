import { useNavigate } from "react-router-dom";
import LoginForm from "../../components/LoginForm";

function Login(){

    const navigate = useNavigate();

    return (
        <div>
            <LoginForm/>
        </div>
    );
}

export default Login