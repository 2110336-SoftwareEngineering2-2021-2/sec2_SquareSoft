import React, {useState} from 'react'
import {Navigate, Redirect} from 'react-router-dom'
import { register } from '../../api/registration/registration';
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
            <input type="password" name="password" className="form-control" id="password"/>
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
function Birthdate(){
    return (
        <div className="mb-3">
            <label className="form-label">Birthdate</label>
            <input name="date" type = "date" className="form-control" id="date" placeholder="DD/MM/YYYY"/>
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

const SignUp = (props) =>{
    const handleSubmit = async (e) => {
        //const navigate = useNavigate();
        e.preventDefault();
        let err = ""
        let state = true;
        for(var i=0;i<11;i++)
            if(e.target[i].value === "") state = false
        if(!state) err+= "Fill in the missing information.\n"
        let accountName = e.target[0].value
        let password = e.target[1].value
        let confirmPassword = e.target[2].value
        let email = e.target[3].value
        let name = e.target[4].value
        let surname = e.target[5].value
        let birthdate = e.target[6].value
        let bankAccountName = e.target[7].value
        let bankAccountSurname = e.target[8].value
        let bankAccountNumber = e.target[9].value
        let bankName = e.target[10].value
        if (confirmPassword!=password){
            state = false;
            err += "Password isn't equal to Confirm Password\n"
        }
        if(state){
            let result = await register("donator",accountName,password,name,surname,birthdate,email,bankAccountName,bankAccountSurname,bankAccountNumber,bankName);
            if(result.status === "succeed"){
                alert("succeed")
                props.navigate("/login")
            }else{
                alert(result.message)
            }
        }else 
            alert(err)
    }
    const handleBack =(props)=> {
        console.log("back complete")
        console.log(props)
        props.navigate("/login");
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
                    <input type="number" name="bankAccountNumber" className="form-control" id="bankAccountNumber" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Bank Name</label>
                    <input name="bankName" className="form-control" id="bankName" />
                </div>
                <button type="button" className="btn btn-outline-primary"  onClick={() => handleBack(props)} >Back</button>
                <button type="submit" className="btn btn-outline-primary">Submit</button>
            </form>
            </div>
            
        </>
    )
}
function NavigateSignUp(){
    let navigate = useNavigate();
    return <SignUp navigate={navigate}/>;
}

export default NavigateSignUp;