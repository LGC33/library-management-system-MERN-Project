import React from "react";
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Teacherheader = () => {
    const auth = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const logout = () => {
        localStorage.clear('user')
        navigate('/Register')
    }

    const navStyle = {
        background: '#333',
        overflow: 'hidden',
        padding: '0',
        margin: '0',
        listStyleType: 'none',
    };

    const linkStyle = {
        color: '#fff',
        display: 'inline-block',
        textAlign: 'center',
        padding: '14px 16px',
        textDecoration: 'none',
        fontSize: '20px',
    };

    const logoutLinkStyle = {
        ...linkStyle,
        float: 'left',
    };

    return (
        <div>
            <div>
                {auth && auth.role === 'student' ? (
                    <ul style={navStyle}>
                        <li style={{ display: 'inline-block' }}><Link to="/booklist" style={linkStyle}>Available Books</Link></li>
                        <li style={{ display: 'inline-block' }}><Link to="/issuse" style={linkStyle}>Issue Book</Link></li>
                        <li style={{ display: 'inline-block' }}><Link to="/returnbook" style={linkStyle}>Return Book</Link></li>
                        <li style={{ display: 'inline-block' }}><Link to="/Profile" style={linkStyle}>Profile</Link></li>
                        <li style={{ display: 'inline-block' }}><Link onClick={logout} to="/Register" style={linkStyle}>Logout</Link></li>
                        <li style={{ display: 'inline-block' }}><Link to="/request" style={linkStyle}>book Request update</Link></li>
                    </ul>
                ) : auth && auth.role === 'teacher' ? (
                    <ul style={navStyle}>
                         <li style={{ display: 'inline-block' }}><Link to="/issuse" style={linkStyle}>Issue Book</Link></li>
                        <li style={{ display: 'inline-block' }}><Link to="/addbook" style={linkStyle}>Add Book</Link></li>
                        <li style={{ display: 'inline-block' }}><Link to="/booklist" style={linkStyle}>Available Books</Link></li>
                        <li style={{ display: 'inline-block' }}><Link to="/studentlist" style={linkStyle}>Student List</Link></li>
                        <li style={{ display: 'inline-block' }}><Link to="/addstudent" style={linkStyle}>Add Student</Link></li>
                        <li style={{ display: 'inline-block' }}><Link to="/Profile" style={linkStyle}>Profile</Link></li>
                        <li style={{ display: 'inline-block' }}><Link to="/request" style={linkStyle}>Request</Link></li>
                        <li style={{ display: 'inline-block' }}><Link onClick={logout} to="/Register" style={linkStyle}>Logout</Link></li>
                    </ul>
                ) : (
                    <ul style={navStyle}>
                        <li style={{ display: 'inline-block' }}><Link to="/login" style={linkStyle}>Login</Link></li>
                        <li style={{ display: 'inline-block' }}><Link to="/Register" style={linkStyle}>Register</Link></li>
                    </ul>
                )}
            </div>
        </div>
    )
}

export default Teacherheader;
