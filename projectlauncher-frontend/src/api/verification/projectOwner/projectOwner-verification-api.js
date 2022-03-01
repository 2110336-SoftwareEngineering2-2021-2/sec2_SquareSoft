import axios from 'axios'
import { basedURL, getToken} from '../..';

function getConfig(token){
    const config = {
        headers: {
           Authorization: "Bearer " + token
        }
    }
    return config
}

async function getOverviewProjectOwner() {
    const token = getToken();
    const config = getConfig(token);
     
    const response = await axios.get(basedURL.concat('projectOwner'), config);
    return await response;
}


async function getProjectOwner(id) {
    const token = getToken();
    const config = getConfig(token);
    const response = await axios.get(basedURL.concat('projectOwner/').concat(id), config);
    return await response;
}

async function approveProjectOwner(id) {
    const token = getToken();
    const config = getConfig(token);
    const response = await axios.patch(basedURL.concat('projectOwner/approve'), 
                                        {id : id}, 
                                        config);
    return await response;
}

async function rejectProjectOwner(id) {
    const token = getToken();
    const config = getConfig(token);
    const response = await axios.patch(basedURL.concat('projectOwner/reject'),
                            {id : id},
                            config);
    return await response;
}

export {getOverviewProjectOwner,getProjectOwner, approveProjectOwner, rejectProjectOwner};