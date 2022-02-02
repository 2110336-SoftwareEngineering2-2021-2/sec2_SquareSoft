import React from 'react'

class LoginForm extends React.Component {
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

    onSubmit() {
        console.log(this.state.username + " " + this.state.password)
    }

    render() {
        return (<div>
            <div>
                <label htmlFor="username">Username</label>
                <input id="username" onChange={(e) => this.onChangeUsername(e)} value={this.state.username}/>
            </div>
            <div>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" onChange={(e) => this.onChangePassword(e)} value={this.state.password}/>
            </div>
            <div>
                <input type="submit" value="Log In" onClick={() => this.onSubmit()}/>
            </div>
        </div>);
    }
}

export default LoginForm;