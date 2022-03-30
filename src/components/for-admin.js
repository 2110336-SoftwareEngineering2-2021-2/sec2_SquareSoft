import Cookies from 'js-cookie'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

function useForAdmin(){
    const username = Cookies.get('username');
    const navigate = useNavigate();
    useEffect(()=>{
        if(username!=="admin"){
            navigate('/');
        }
    }, [username]);
}

export default useForAdmin;