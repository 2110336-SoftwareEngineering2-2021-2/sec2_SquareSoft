import React, {useState} from 'react'
import {Redirect} from 'react-router-dom'
import Navigator from "../../components/navigator";
import "./SignUp.css"

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
function Birthdate(){
    return (
        <div className="mb-3">
            <label className="form-label">Birthdate</label>
            <input name="date" className="form-control" id="date" placeholder="DD/MM/YYYY"/>
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

const SignUp = () =>{
    const handleSubmit = (e) => {
        e.preventDefault();
        const accountName = e.target[0].value
        const password = e.target[1].value
        const confirmPassword = e.target[2].value
        const email = e.target[3].value
        const name = e.target[4].value
        const surname = e.target[5].value
        const birthdate = e.target[6].value
        const bankAccountName = e.target[7].value
        const bankAccountSurname = e.target[8].value
        const bankAccountNumber = e.target[9].value
        const bankName = e.target[10].value
        //console.log(accountName)
        //console.log(password)
        //console.log(confirmPassword)
        //console.log(email)
        //console.log(name)
        //console.log(surname)
        //console.log(birthdate)
        //console.log(bankAccountName)
        //console.log(bankAccountSurname)
        //console.log(bankAccountNumber)
        //console.log(bankName)
        // for(var i=0;i<11;i++)
        //     console.log(e.target[i].value)
    }
    const handleBack =()=> {
        console.log("back complete")
    }   

    return (
        <>
            <Navigator/>
            <div className='container mt-5'> 
            <h1> Sign Up Supporter</h1>
            <form onSubmit={handleSubmit}>
                <AccountName/>
                <Password/>
                <ConfirmPassword/>
                <h3> Personal information </h3>
                <Email/> 
                <Name/>
                <Surname/>
                <Birthdate/>
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
                <button type="button" className="btn btn-outline-primary"  onClick={handleBack} >Back</button>
                <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
            </div>
            
        </>
    )
}
export default SignUp;