import axios from 'axios'
import {
    basedURL
} from '../index.js';

async function userLogin(username, password, isProjectOwner) {
    const response = await axios.post(basedURL.concat('auth/login'), {
        username: username,
        password: password,
        role: (isProjectOwner) ? 'ProjectOwner' : 'Donator'
    })
    return await response;
}

async function adminLogin(username, password) {
    const response = await axios.post(basedURL.concat('auth/login'), {
        username: username,
        password: password,
        role: 'Admin'
    })
    return await response
}

export {
    userLogin,
    adminLogin
};