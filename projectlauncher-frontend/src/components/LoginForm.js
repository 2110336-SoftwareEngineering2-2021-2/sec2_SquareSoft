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

    onClickLogIn() {
        console.log(this.state.username + " " + this.state.password)
    }

    onClickBack() {
        console.log("Go back")
    }

    render() {
        const buttonStyle = {width: '30%', backgroundColor: '#8157A1', borderColor: '#8157A1'}
        return (
            <div className="col d-flex justify-content-center">
                <div className="card" style={{width: '50%', borderColor: '#8157A1'}}>
                    <div className="card-header">
                        เข้าสู่ระบบ
                    </div>
                    <div className="card-body">
                        <div className = "form-floating mb-3">
                            <label htmlFor="username">ชื่อบัญชี</label>
                            <input className="form-control" id="username" onChange={(e) => this.onChangeUsername(e)} value={this.state.username}/>
                        </div>
                        <div className="form-floating mb-3">
                            <label htmlFor="password">รหัสผ่าน</label>
                            <input type="password" className="form-control" id="password" onChange={(e) => this.onChangePassword(e)} value={this.state.password}/>
                        </div>
                        <div className="form-floating mb-3 text-center">
                            <input className="btn btn-primary" type="submit" value="เข้าสู่ระบบ" onClick={() => this.onClickLogIn() } style={buttonStyle}/>
                        </div>
                        <div className="form-floating mb-3 text-center">
                            <input className="btn btn-primary" type="submit" value="ย้อนกลับ" onClick={() => this.onClickBack()} style={buttonStyle}/>
                        </div>
                    </div>
                </div>
            </div>
            
        );
    }
}

export default LoginForm;