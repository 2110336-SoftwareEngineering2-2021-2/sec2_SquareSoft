import Cookies from "js-cookie";

export const basedURL = process.env.NODE_ENV === "production" ? "https://project-launcher-backend.herokuapp.com" : "http://localhost:3001/";

export function getToken(){
    return Cookies.get('token');
};

export function getConfig(token){
    const config = {
        headers: {
           Authorization: "Bearer " + token
        }
    }
    return config
}

export function getConfigWithToken(){
    const token = getToken();
    const config = {
        headers: {
           Authorization: "Bearer " + token
        }
    }
    return config
}
