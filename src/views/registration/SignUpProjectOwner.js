import React, {useState} from 'react'
import {Navigate, Redirect} from 'react-router-dom';
import { registerProjectOwner } from '../../api/registration/registrationProjectOwner';
import Navigator from "../../components/navigator";
import {useNavigate} from 'react-router-dom'


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
            <label className="form-label">Password</label>
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
        let email = e.target[1].value
        let password = e.target[2].value
        let confirmPassword = e.target[3].value
        let name = e.target[4].value
        let surname = e.target[5].value
        let identificationID = e.target[6].value
        let birthdate = e.target[7].value
        let presentAddress = e.target[8].value
        let province = e.target[9].value
        let district = e.target[10].value
        let subDistrict = e.target[11].value
        let zipCode = e.target[12].value
        let bankAccountName = e.target[13].value
        let bankAccountSurname = e.target[14].value
        let bankAccountNumber = e.target[15].value
        let bankName = e.target[16].value
        let bankBook = e.target[17].files[0];
        let idCardPicture = e.target[18].files[0];
        //console.log(n1)
        //console.log(bankBook)
        if (confirmPassword!=password){
            state = false;
            err += "Password isn't equal to Confirm Password\n"
        }
        if(state){
            let result = await registerProjectOwner("projectOwner",accountName,email,password,name,surname,identificationID,birthdate,
                presentAddress,province,district,subDistrict,zipCode,bankAccountName,bankAccountNumber,bankName,bankBook,idCardPicture,
                "Submitted");
            if(result.status === "success"){
                alert("success")
                props.navigate("/login")
            }else{
                alert(result.message)
            }
        }else{
            alert(err);
        }
        
    }
    const handleBack =(props)=> {
        console.log("back complete")
        props.navigate("/login");
    }    

    return (
        <>
            <Navigator/>
            <div className='container mt-5'> 
            <h1> Sign Up Project Owner</h1>
            <form onSubmit={handleSubmit}>
                <AccountName/>
                <Email/> 
                <Password/>
                <ConfirmPassword/>
                <h3> Personal information </h3>
                <Name/>
                <Surname/>
                <IdentificationID/>
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
                <button type="button" className="btn btn-outline-primary"  onClick={() => handleBack(props)} >Back</button>
                <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
            </div>
            
        </>
    )
}
function NavigateSignUpProjectOwner(){
    let navigate = useNavigate();
    return <SignUpProjectOwner navigate={navigate}/>;
}

export default NavigateSignUpProjectOwner;