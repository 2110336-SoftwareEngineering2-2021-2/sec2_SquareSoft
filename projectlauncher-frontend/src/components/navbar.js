import React from 'react'
import Hamburger from './hamburger';

class Navbar extends React.Component {
    render(){
        return <nav className='navbar'>
            <Hamburger />
            <h1 className='projectName'>ProjectLauncher</h1>
            
        </nav>;
    }
}

export default Navbar;