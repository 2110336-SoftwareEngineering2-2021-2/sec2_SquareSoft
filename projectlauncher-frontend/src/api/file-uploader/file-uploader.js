import axios from 'axios'
import {
    basedURL
} from '../index.js';

async function uploadImage(image) {
    const formData = new FormData()
    formData.append('file', image)
    const response = await axios.post(basedURL.concat('file-uploader'), formData);
    return await response;
}

async function getFileURL(fileName) {
    const response = axios.get(basedURL.concat('file-uploader/').concat(fileName)); 
    return await response;
}

export {uploadImage, getFileURL};