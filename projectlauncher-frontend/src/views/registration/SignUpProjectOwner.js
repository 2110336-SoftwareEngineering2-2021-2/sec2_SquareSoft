import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Navigator from "../../components/navigator";

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
            <input name="password" className="form-control" id="password"/>
        </div>
    );
}
function ConfirmPassword(){
    return (
        <div className="mb-3">
            <label className="form-label">Comfirm Password</label>
            <input name="comfirmPassword" className="form-control" id="comfirmPassword"/>
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
            <input name="IdentificationID" className="form-control" id="IdentificationID" />
        </div>
    );
}
function Birthdate(){
    return (
        <div className="mb-3">
            <label className="form-label">Birthdate</label>
            <input name="date" className="form-control" id="date" placeholder="DD/MM/YYYY"/>
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
            <input name="zipCode" className="form-control" id="zipCode" />
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

const SignUpProjectOwner = () =>{
    const handleSubmit = (e) => {
        e.preventDefault();
        const accountName = e.target[0].value
        const email = e.target[1].value
        const password = e.target[2].value
        const confirmPassword = e.target[3].value
        const name = e.target[4].value
        const surname = e.target[5].value
        const identificationID = e.target[6].value
        const birthdate = e.target[7].value
        const presentAddress = e.target[8].value
        const province = e.target[9].value
        const district = e.target[10].value
        const subDistrict = e.target[11].value
        const zipCode = e.target[12].value
        const bankAccountName = e.target[13].value
        const bankAccountSurname = e.target[14].value
        const bankAccountNumber = e.target[15].value
        const bankName = e.target[16].value
        
        //for(var i=0;i<17;i++)
            //console.log(e.target[i].value)
    }
    const handleBack =()=> {
        console.log("back complete")
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
                    <input name="bankAccountNumber" className="form-control" id="bankAccountNumber" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Bank Name</label>
                    <input name="bankName" className="form-control" id="bankName" />
                </div>
                <h3> Upload </h3>
                <button type="button" className="btn btn-outline-primary"  onClick={handleBack} >Back</button>
                <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
            </div>
            
        </>
    )
}
export default SignUpProjectOwner;