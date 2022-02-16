import axios from 'axios'
import { basedURL, getToken} from '../..';

async function getOverviewProjectOwner() {
    const token = getToken();
    const response = await axios.get(basedURL.concat('projectOwner'));
    return await response;
}


async function getProjectOwner(id) {
    const response = await axios.get(basedURL.concat('projectOwner/').concat(id));
    return await response;
}

async function approveProjectOwner(id) {
    const response = await axios.patch(basedURL.concat('projectOwner/approve'), 
                                        {id : id});
    return await response;
}

async function rejectProjectOwner(id) {
    const response = await axios.patch(basedURL.concat('projectOwner/reject'),
                            {id : id});
    return await response;
}

export {getOverviewProjectOwner,getProjectOwner, approveProjectOwner, rejectProjectOwner};