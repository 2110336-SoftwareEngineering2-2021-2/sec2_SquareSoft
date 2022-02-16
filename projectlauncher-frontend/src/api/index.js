import Cookies from "js-cookie";

export const basedURL = "http://localhost:3001/"

export function getToken(){
    return Cookies.get('token');
};
