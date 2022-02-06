import React from 'react'
import './userButton.css'

class UserButton extends React.Component{
    render() {
        const buttonStyle = {backgroundColor: '#8157A1', borderColor: '#8157A1'}
        return (
            <div className="user-button" style={buttonStyle}>
                User
            </div>
        );
    }
}

export default UserButton;