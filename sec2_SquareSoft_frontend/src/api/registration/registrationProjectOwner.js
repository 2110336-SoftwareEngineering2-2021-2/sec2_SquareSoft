import axios from 'axios'
import {basedURL} from '../index.js';


export async function registerProjectOwner(role,username,email,password,firstname,lastname,idCardNumber,birthdate,
    address,province,district,subdistrict,postcode,bankAccountName,bankAccountNumber,bankAccountBank,bankBookPicture,idCardPicture,
    verification_status) {
    try{
        const response = await axios.post(basedURL.concat('registration-system/'+ role), {
            username,
            email,
            password,
            firstname,
            lastname,
            idCardNumber,
            birthdate,
            address,
            province,
            district,
            subdistrict,
            postcode,
            bankAccountName,
            bankAccountNumber,
            bankAccountBank,
            bankBookPicture,
            idCardPicture,
            verification_status
        })
        console.log(response)
        return {status:"success",response}
    }catch(err){
        console.log(err.response.status)
        console.log(err.response.data)
        let data = err.response.data
        if(data['msg'] == "register failed: database error"){
            if(data['err']['code'] == 11000 ){
                return { status:"error", message:Object.keys(data['err']['keyPattern'])[0] + " used"}
            }
        }
    }
}

