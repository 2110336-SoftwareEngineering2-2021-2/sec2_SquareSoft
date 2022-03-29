import axios from 'axios'
import { basedURL, getToken, getConfig } from '../index';

async function getProjectProgressByID(id) {
    const response = await axios.get(basedURL.concat('project/project-progress/').concat(id));
    return await response;
}


export {getProjectProgressByID};