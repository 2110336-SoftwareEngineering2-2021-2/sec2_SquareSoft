import axios from 'axios'
import { basedURL, getConfigWithToken } from '../index';

async function getImageURL(image_path) {
    const config = getConfigWithToken();
    const response = await axios.get(basedURL.concat('file-uploader/').concat(image_path), config);
    return await response.data;
}

export {getImageURL};