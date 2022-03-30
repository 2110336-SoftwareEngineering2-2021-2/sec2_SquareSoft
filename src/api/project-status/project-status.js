import axios from 'axios'
import {
    basedURL
} from '../index.js';
import {
    getFileURL
} from '../file-uploader/file-uploader.js'

async function changeProjectStatus(projectid, status, token) {
    await axios.post(basedURL.concat(`project/edit-status?_id=${projectid}&status=${status}`), {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    })
}

async function getProjectStatus(projectid, token) {
    try {
        const response = await axios.get(basedURL.concat(`project/find-publish-status-by-id?_id=${projectid}`), {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        console.log(response)
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