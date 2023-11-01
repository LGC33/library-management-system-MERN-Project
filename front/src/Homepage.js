import React from "react";
import { Link } from 'react-router-dom'; 

const Homepage = () => {
    return (
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', backgroundImage: `url('./tyt.jpg')`, backgroundSize: 'cover'}}>
            <ul style={{listStyleType: 'none', padding: '0'}}>
                <li style={{margin: '10px', background:'red'}}><Link to="/login" style={{textDecoration: 'none', color: 'black', fontSize: '80px'}}>Login</Link></li>
                <li style={{margin: '10px', background:'red'}}><Link to="/Register" style={{textDecoration: 'none', color: 'black', fontSize: '80px'}}>Register</Link></li>
            </ul>
        </div>
    );
}

export default Homepage;

