import Cookies from "js-cookie";

export const basedURL = "http://localhost:3001/"

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
