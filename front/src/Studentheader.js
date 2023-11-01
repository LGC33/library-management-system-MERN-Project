import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom'; 
import { useNavigate } from 'react-router-dom';


const Studentheader =()=>{
    const navigate = useNavigate();
    const logout=()=>{
        localStorage.clear('user')
        navigate('/Register')
    }
    return (<div>
<div>
             <ul className="nav-ul">
                <li><Link to="/booklist">Avileble Books</Link></li>
                <li><Link to="/issuse">issuse book</Link></li>
                <li><Link to="/returnbook">Return book</Link></li>
                <li><Link to="/Profile">Profile</Link></li>
                <li><Link onClick={logout} to="/signup">Logout</Link></li>

            </ul>
        </div>
    </div>)
}
export default Studentheader;