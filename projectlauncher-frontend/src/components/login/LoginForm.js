import React from 'react'
import Cookies from 'js-cookie'
import { Link, Navigate } from "react-router-dom";
import {userLogin} from "../../api/login/login.js"

class LoginForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: "", isProjectOwner: false, isLoginCompleted: false}
    }

    onChangeUsername(e) {
        this.setState({username: e.target.value})
    }

    onChangePassword(e) {
        this.setState({password: e.target.value})
    }

    onChangeSwitch() {
        this.setState(prevState => ({isProjectOwner: !prevState.isProjectOwner}))
    }

    onClickLogin() {
        // Use login API
        const response = userLogin(this.state.username, this.state.password, this.state.isProjectOwner)
        response.then(res => {
            if (res.data.access_token) {
                Cookies.set('username', this.state.username)
                Cookies.set('token', res.data.access_token)
                Cookies.set('role', (this.state.isProjectOwner)? 'projectOwner': 'supporter')
                this.setState({isLoginCompleted: true})
            }
        }).catch(res => {
            alert('unable to log in')
        })
    }

    render() {
        const buttonStyle = {width: '30%', backgroundColor: '#8157A1', borderColor: '#8157A1'}

        return (
            <div className="col d-flex justify-content-center" style={{marginTop: 100}}>
                <div className="card" style={{width: '50%', borderColor: '#8157A1'}}>
                    <div className="card-header">
                        Log in
                    </div>
                    <div className="card-body">
                            <div className = "form-group mb-3">
                                <label htmlFor="username">Username</label>
                                <input className="form-control" id="username" onChange={(e) => this.onChangeUsername(e)} value={this.state.username} placeholder="Username"/>
                            </div>
                            <div className="form-group mb-3">
                                <label htmlFor="password">Password</label>
                                <input type="password" className="form-control" id="password" onChange={(e) => this.onChangePassword(e)} value={this.state.password} placeholder="Password"/>
                            </div>
                            <div className="form-check form-switch text-center mb-3">
                                <input className="form-check-input" style={this.state.isProjectOwner? {backgroundColor: '#8157A1'}:null} type="checkbox" role="switch" id="flexSwitchCheckDefault" onChange={() => this.onChangeSwitch() } checked={this.state.isProjectOwner}/>
                                <label className="form-check-label" htmlFor="flexSwitchCheckDefault">Log in as project owner</label>
                            </div>
                            <div className="form-group mb-3 text-center">
                                <input className="btn btn-primary" type="submit" value="Log in" onClick={() => this.onClickLogin() } style={buttonStyle}/>
                                {(this.state.isLoginCompleted)? <Navigate to="/home" replace={true}/>: null}
                            </div>
                            {/* <div className="form-group mb-3 text-center">
                                <Link to="/">
                                    <input className="btn btn-primary" type="submit" value="Back" style={buttonStyle}/>
                                </Link>
                            </div> */}
                            
                    </div>
                </div>
            </div>
            
        );
    }
}

export default LoginForm;