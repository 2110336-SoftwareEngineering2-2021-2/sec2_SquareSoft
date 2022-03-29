import axios from "axios";
import { getConfigWithToken, basedURL } from "../index";

async function changePassword(oldPass, newPass){
    const body = {
        oldPass: oldPass,
        newPass: newPass,
    }
    const response = await axios.patch(basedURL.concat("auth/change-password"), body, getConfigWithToken());
    return response;
}

export default changePassword