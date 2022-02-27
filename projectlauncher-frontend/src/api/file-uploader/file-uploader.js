import axios from 'axios'
import {
    basedURL,
    getConfigWithToken
} from '../index.js';

async function uploadImage(image) {
    const formData = new FormData();
    formData.append('file', image);
    //const config = getConfigWithToken();
    const response = await axios.post(basedURL.concat('file-uploader'), formData);
    return await response;
}

async function getFileURL(fileName) {
    //const config = getConfigWithToken();
    const response = axios.get(basedURL.concat('file-uploader/').concat(fileName)); 
    return await response;
}

export {uploadImage, getFileURL};