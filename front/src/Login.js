import React, { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'; 

const Login =()=> {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const navigate = useNavigate();

    const handleLogin = async () => {
        console.warn("email,password", email, password,role)
        let result = await fetch("http://localhost:3800/login", {
            method: 'post',
            body: JSON.stringify({ email, password ,role }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await result.json()
        console.warn(data);
        if (data.email) {
            localStorage.setItem("user", JSON.stringify(data));
            if(role==='student'){
                navigate("/Profile")
            } else{
                navigate("/Profile")
            }
            
        } else {
            alert("Please enter correct details")
        }
    }

    return (
        <div style={{ position: 'relative', height: '100vh' }}>
            <img 
                src="tyt.jpg" 
                alt="Login Banner" 
                style={{
                    objectFit: 'cover', 
                    width: '100%', 
                    height: '100%', 
                    position: 'absolute', 
                    top: 0, 
                    left: 0, 
                    zIndex: -1
                }} 
            />
            <div style={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
                <div className="role-container1">
                    <label className="role-label1" style={{ textAlign: 'center', background:"red", fontSize:"40px" }}>
                        <h7 className="level">Student</h7>
                        <input 
                            type="radio" 
                            value="student"
                            checked={role === "student"} 
                            onChange={(e) => setRole(e.target.value)} 
                        />
                    </label>
                    <label className="role-label1" style={{ textAlign: 'center', background:"red", fontSize:"40px" }}>
                        <h7 className="level"> Teacher </h7> 
                        <input 
                            type="radio" 
                            value="teacher"
                            checked={role === "teacher"} 
                            onChange={(e) => setRole(e.target.value)} 
                        />
                    </label>
                </div>
                <input 
                    className="input-field1" 
                    type="text" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    placeholder="Enter your email" 
                    style={{ textAlign: 'center', background:"white", fontSize:"40px" }}
                />
                <br />
                <input 
                    className="input-field1" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    placeholder="Enter your password" 
                    style={{ textAlign: 'center', background:"white", fontSize:"40px" }}
                />
                <br />
                <button 
                    className="login-button1" 
                    onClick={handleLogin} 
                    type="button"
                    style={{ textAlign: 'center', background:"green", fontSize:"40px" }}
                >
                    Login
                </button>
                <p className="register-text1" style={{ textAlign: 'center', background:"yellow", fontSize:"40px" }}>
                    Not Registered yet? Register 
                    <Link to="/register">here</Link>
                </p>
            </div>
        </div>
    );
}

export default Login;
