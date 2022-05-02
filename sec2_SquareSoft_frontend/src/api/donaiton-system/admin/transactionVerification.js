import axios from 'axios'
import { basedURL, getToken, getConfig } from '../../index';

async function getTransactionVerification() {
    const token = getToken();
    const config = getConfig(token);
     
    const response = await axios.get(basedURL.concat('transaction/adminGetUnfinishedUserTX'), config);
    console.log(response);
    return await response;
}


export {getTransactionVerification};