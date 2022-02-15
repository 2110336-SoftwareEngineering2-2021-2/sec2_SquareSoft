import React from 'react'
import Cookies from 'js-cookie'
import {adminLogin} from "../api/login/login.js"

class LoginFormAdmin extends React.Component {
    constructor(props) {
        super(props);
        this.state = {username: "", password: ""}
    }

    onChangeUsername(e) {
        this.setState({username: e.target.value})
    }

    onChangePassword(e) {
        this.setState({password: e.target.value})
    }

    onClickLogin() {
        Cookies.set('username', this.state.username)
        Cookies.set('token', adminLogin(this.state.username, this.state.password))
    }

    render() {
        const buttonStyle = {width: '30%', backgroundColor: '#8157A1', borderColor: '#8157A1'}

        return (
            <div className="col d-flex justify-content-center">
                <div className="card" style={{width: '50%', borderColor: '#8157A1'}}>
                    <div className="card-header">
                        Log in as admin
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
                            <div className="form-group mb-3 text-center">
                                <input className="btn btn-primary" type="submit" value="Log in" onClick={() => this.onClickLogin() } style={buttonStyle}/>
                            </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default LoginFormAdmin;