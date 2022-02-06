import React from 'react'
import Hamburger from './hamburger';
import UserButton from './userButton';
import './navbar.css'

class Navbar extends React.Component {
    render(){
        return <nav className='navbar'>
            <Hamburger />
            <h1 className='projectName'>ProjectLauncher</h1>
            <UserButton />
        </nav>;
    }
}

export default Navbar;