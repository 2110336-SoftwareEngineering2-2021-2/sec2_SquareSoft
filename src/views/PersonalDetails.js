import React from 'react'
import { registerProjectOwner } from '../api/registration/registrationProjectOwner';
import Navigator from "../components/navigator";
import {useNavigate} from 'react-router-dom'
import {basedURL, getToken} from "../api/index.js";
import axios from 'axios'

function AccountName(){
    return (
        <div className="mb-3">
            <label className="form-label">Account Name</label>
            <input name="accountName" className="form-control" id="accountName" />
        </div>
    );
}
function Password(){    
    return (
        <div className="mb-3">
            <label className="form-label">Update Password</label>
            <input name="password" type="password" className="form-control" id="password"/>
        </div>
    );
}
function ConfirmPassword(){
    return (
        <div className="mb-3">
            <label className="form-label">Comfirm Password</label>
            <input name="comfirmPassword" type="password" className="form-control" id="comfirmPassword"/>
        </div>
    );
}
function Email(){
    return (
        <div className="mb-3">
            <label className="form-label">Email address</label>
            <input type="email" name="email" className="form-control" id="inputEmail" placeholder="name@example.com" aria-describedby="emailHelp"/>
        </div>
    );
}
function Name(){
    return (
        <div className="mb-3">
            <label className="form-label">Name</label>
            <input name="name" className="form-control" id="name" />
        </div>
    );
}
function Surname(){
    return (
        <div className="mb-3">
            <label className="form-label">Surname</label>
            <input name="surname" className="form-control" id="surname" />
        </div>
    );
}
function IdentificationID(){
    return (
        <div className="mb-3">
            <label className="form-label">Identification ID</label>
            <input name="IdentificationID" type="number" className="form-control" id="IdentificationID" />
        </div>
    );
}
function Birthdate(){
    return (
        <div className="mb-3">
            <label className="form-label">Birthdate</label>
            <input name="date" type="date" className="form-control" id="date" placeholder="DD/MM/YYYY"/>
        </div>
    );
}
function PresentAddress(){
    return (
        <div className="mb-3">
            <label className="form-label">Present Address</label>
            <input name="presentAddress" className="form-control" id="presentAddress" />
        </div>
    );
}
function Province(){
    return (
        <div className="mb-3">
            <label className="form-label">Province</label>
            <input name="province" className="form-control" id="province" />
        </div>
    );
}
function District(){
    return (
        <div className="mb-3">
            <label className="form-label">District</label>
            <input name="district" className="form-control" id="district" />
        </div>
    );
}
function SubDistrict(){
    return (
        <div className="mb-3">
            <label className="form-label">Sub-District</label>
            <input name="subDistrict" className="form-control" id="subDistrict" />
        </div>
    );
}
function ZipCode(){
    return (
        <div className="mb-3">
            <label className="form-label">Zip Code</label>
            <input name="zipCode" type="number" className="form-control" id="zipCode" />
        </div>
    );
}
function BankAccountName(){
    return (
        <div className="mb-3">
            <label className="form-label">Bank Account Name</label>
            <input name="bankAccountName" className="form-control" id="bankAccountName" />
        </div>
    );
}
function BankAccountSurname(){
    return (
        <div className="mb-3">
            <label className="form-label">Bank Account Surname</label>
            <input name="bankAccountSurname" className="form-control" id="bankAccountSurname" />
        </div>
    );
}
function Bankbook(){
    return (
        <div> 
            <label className="form-label" >Bank Book</label>
            <input type="file" className = "form-control" id="bankbook" />
        </div>
    );
}
function IDCardPicture(){
    return (
        <div> 
            <label className="form-label" >ID Card Picture</label>
            <input type="file" className="form-control" id="IDCardPicture" />
        </div>
    );
}
const SignUpProjectOwner = (props) =>{
    const handleSubmit = async (e) => {
        e.preventDefault();
        let err = "";
        let state = true;
        for(var i=0;i<17;i++){
            if(e.target[i].value === "") state = false;
        }if(!state) err += "Fill in the missing information.\n"
        let accountName = e.target[0].value
        // let email = e.target[1].value
        // let password = e.target[1].value
        // let confirmPassword = e.target[2].value
        let name = e.target[1].value
        let surname = e.target[2].value
        // let identificationID = e.target[6].value
        let birthdate = e.target[3].value
        let presentAddress = e.target[4].value
        let province = e.target[5].value
        let district = e.target[6].value
        let subDistrict = e.target[7].value
        let zipCode = e.target[8].value
        let bankAccountName = e.target[9].value
        //let bankAccountSurname = e.target[14].value
        let bankAccountNumber = e.target[11].value
        let bankName = e.target[12].value
        let bankBook = e.target[13].files[0];
        let idCardPicture = e.target[14].files[0];
        //console.log(n1)
        //console.log(bankBook)
        console.log(accountName)
        console.log(bankName)
        let result = {
            "username": accountName,
            "firstname": name,
            "lastname": surname,
            "birthdate": birthdate,
            "address": presentAddress,
            "province": province,
            "district": district,
            "subDistrict": subDistrict,
            "postcode": zipCode,
            "bankAccountName": bankAccountName,
            "bankAccountNumber": bankAccountNumber,
            "bankAccountBank": bankName,
            "bankBookPicture": bankBook,
            "idCardPicture": idCardPicture
        }
        let real_result = {}
        for(let [field, value] of Object.entries(result)){
            if(value!== "" && value!= undefined){
                real_result[field] = value;
            }
        }
        // let real_result = {"bankAccountBank": "asdfasdf"}
        console.log(real_result)
        
        try{
            const response = await axios.patch(basedURL.concat('registration-system/edit-personal-details'), real_result, {
                headers: { Authorization: "Bearer " + getToken() }
            })
            console.log(response)
            alert("Success")
            return {status:"success",response}
        }catch(err){
            console.log(err.response.status)
            console.log(err.response.data)
            let data = err.response.data
            alert(err)
            if(data['msg'] == "update failed: database error"){
                if(data['err']['code'] == 11000 ){
                    return { status:"error", message:Object.keys(data['err']['keyPattern'])[0] + " used"}
                }
            }
            alert("Error")
        }
        

        // }
        // if(state){
        //     let result = await registerProjectOwner("projectOwner",accountName,email,password,name,surname,identificationID,birthdate,
        //         presentAddress,province,district,subDistrict,zipCode,bankAccountName,bankAccountNumber,bankName,bankBook,idCardPicture,
        //         "Submitted");
        //     if(result.status === "success"){
        //         alert("success")
        //         props.navigate("/login")
        //     }else{
        //         alert(result.message)
        //     }
        // }else{
        //     alert(err);
        // }
        
    }
    const handleBack =(props)=> {
        console.log("back complete")
        props.navigate("/login");
    }    

    return (
        <>
            <Navigator/>
            <div className='container mt-5'> 
            {/* <h1> Sign Up Project Owner</h1> */}
            <form onSubmit={handleSubmit}>
                <AccountName/>
                {/* <Email/>  */}
                {/* <Password/>
                <ConfirmPassword/> */}
                <h3> Personal information </h3>
                <Name/>
                <Surname/>
                {/* <IdentificationID/> */}
                <Birthdate/>
                <h3> Address </h3>
                <PresentAddress/>
                <Province/>
                <District/>
                <SubDistrict/>
                <ZipCode/>
                <h3> Bank information </h3>
                <BankAccountName/>
                <BankAccountSurname/>
                <div className="mb-3">
                    <label className="form-label">Bank Account Number</label>
                    <input name="bankAccountNumber" type="number" className="form-control" id="bankAccountNumber" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Bank Name</label>
                    <input name="bankName" className="form-control" id="bankName" />
                </div>
                <h3> Upload </h3>
                <Bankbook/>
                <br />
                <IDCardPicture/>
                <br />
                <button type="button" className="btn btn-outline-primary"  onClick={() => handleBack(props)} >Cancel</button>
                <button type="submit" className="btn btn-outline-primary">Update</button>
            </form>
            </div>
            
        </>
    )
}


function PersonalDetails(){
    let navigate = useNavigate();
    return <SignUpProjectOwner navigate={navigate}/>;
}


export default PersonalDetails;