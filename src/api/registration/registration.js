import axios from 'axios'
import {basedURL} from '../index.js';


export async function register(role,username,password,firstname,lastname,birthdate,email,bankAccountFirstname,bankAccountLastname,bankAccountNumber,bankAccountBank) {
    
    try{
        const response = await axios.post(basedURL.concat('registration-system/'+ role), {
            username,
            password,
            firstname,
            lastname,
            birthdate,
            email,
            bankAccountFirstname,
            bankAccountLastname,
            bankAccountNumber,
            bankAccountBank
        })
        console.log(response)
        return {status:"succeed",response}
    }catch(err){
        console.log("sdfdfdf")
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

