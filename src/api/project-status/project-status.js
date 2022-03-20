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

function getProjectStatus(projectid) {
    return 'unpublished'
}

export {
    changeProjectStatus,
    getProjectStatus,
};