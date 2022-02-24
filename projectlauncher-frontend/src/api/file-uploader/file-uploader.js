import axios from 'axios'
import {
    basedURL
} from '../index.js';
import { encode, decode } from 'base-64'

async function uploadImage(image) {
    const formData = new FormData()
    formData.append('file', image)
    const response = await axios.post(basedURL.concat('file-uploader'), formData);
    return await response;
}

export default uploadImage;