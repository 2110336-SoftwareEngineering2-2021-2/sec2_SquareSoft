import axios from 'axios'
import { basedURL } from '..';

async function getOverviewProjectOwner() {
    const response = await axios.get(basedURL.concat('projectOwner'));
    return await response;
}


async function getProjectOwner(id) {
    const response = await axios.get(basedURL.concat('projectOwner/').concat(id));
    return await response;
}

export {getOverviewProjectOwner,getProjectOwner};