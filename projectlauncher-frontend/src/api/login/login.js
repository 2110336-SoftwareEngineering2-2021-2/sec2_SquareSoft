import axios from 'axios'
import {
    basedURL
} from '../..';

function userLogin(username, password, isProjectOwner) {
    // const response = await axios.post(basedURL.concat('auth/login'), {
    //     username: username,
    //     password: password,
    //     role: (isProjectOwner) ? 'ProjectOwner' : 'Donator'
    // })
    // return await response;
    // return {
    //     username: username,
    //     password: password,
    //     role: (isProjectOwner) ? 'ProjectOwner' : 'Donator'
    // }
    return "thisistokenforuser"
}

function adminLogin(username, password) {
    // const response = await axios.post(basedURL.concat('auth/login'), {
    //     username: username,
    //     password: password,
    //     role: 'Admin'
    // })
    // return await response;
    // return {
    //     username: username,
    //     password: password,
    //     role: 'Admin'
    // }
    return "thisistokenadmin"
}

export {
    userLogin,
    adminLogin
};