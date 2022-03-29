import axios from 'axios'
import { basedURL, getToken, getConfig } from '../..';

async function getNotification() {
    const token = getToken();
    const config = getConfig(token);
     
    const response = await axios.get(basedURL.concat('notification/find-by-owner'), config);
    return await response;
}

async function deleteNotification(id) {
    const token = getToken();
    const config = getConfig(token);
     
    const response = await axios.delete(basedURL.concat('notification/').concat(id), config);
    return await response;
}


export {getNotification, deleteNotification};