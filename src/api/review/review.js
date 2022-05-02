import axios from 'axios'
import { basedURL, getConfigWithToken } from '../index';

async function getReviews(projectID) {
    const config = getConfigWithToken();
    const response = await axios.get(basedURL.concat('review?projectID=').concat(projectID), config);
    return await response;
}

async function report(reviewID) {
    const config = getConfigWithToken();
    const payload = {
        reviewID : reviewID
    }
    const response = await axios.post(basedURL.concat('review/report'), payload, config);
    return await response;
}
export {getReviews, report};