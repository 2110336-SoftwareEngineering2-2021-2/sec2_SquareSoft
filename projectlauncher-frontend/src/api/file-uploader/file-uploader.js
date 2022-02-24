import axios from 'axios'
import {
    basedURL
} from '../index.js';
import {encode} from 'base-64'

async function uploadImage(image) {
    const response = await axios.post(basedURL.concat('file-uploader'), encode(image));
    return await response;
}

export default uploadImage;