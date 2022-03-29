import axios from 'axios'
import {
    basedURL
} from '../index.js';
import {
    getFileURL
} from '../file-uploader/file-uploader.js'

function changeProjectStatus(projectid, status) {
    console.log(projectid + ' ' + status)
}

async function getProjectStatus(projectid, token) {
    try {
        const response = await axios.get(basedURL.concat(`project/find-publish-status-by-id?_id=${projectid}`), {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data

    } catch (err) {
        console.log(err)
        return 'unpublished'
    }
}

export {
    changeProjectStatus,
    getProjectStatus,
};