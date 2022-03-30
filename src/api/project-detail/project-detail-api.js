import axios from 'axios'
import {
    basedURL, getToken, getConfigWithToken
} from '../index.js';
const getProjectById=async (id)=> {
    const response = await axios.get(basedURL.concat(`project/find-by-id?_id=${id}`), {
    })
    const project=response.data

    return project
    
}

const donate = async(id,amount)=> {
    let req = { "projectID": id, "amount": amount}
    const config = getConfigWithToken();
    const response = await axios.post(basedURL.concat('transaction/userDonateProject'), req, config);
    return response
}

export {
    getProjectById,
    donate
};