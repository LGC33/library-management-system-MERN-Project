import React, { useState, useEffect } from "react";
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [username, setUsername] = useState("");
    const [rolenumber, setRolenumber] = useState("");

    const [role, setRole] = useState("student");
    const [phone, setPhone] = useState("");
    const [address, setAddress] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user');
        if (auth) {
            navigate("/Profile")
        }
    }, []);

    const collectData = async () => {
        try {
            const result = await fetch("http://localhost:3800/register", {
                method: 'post',
                body: JSON.stringify({ role, username, email, password, phone, rolenumber,  address }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await result.json();
            console.warn(data);
            if (data.role, username, email, password, phone, rolenumber,  address) {
                localStorage.setItem("user", JSON.stringify(data));
                if (role === 'student') {
                    navigate("/Teacherdashboard")
                } else {
                    navigate("/Teacherdashboard")
                }
            }
        } catch (error) {
            alert("Please enter correct details");
        }
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            backgroundImage: `url('tyt.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
        }}>
            <div style={{ textAlign: 'center' }}>
                <div>
                    <label   style={{ textAlign: 'center', background:"red", fontSize:"40px" }}>
                        <h7 className="level">Student</h7>
                        <input
                            type="radio"
                            value="student"
                            checked={role === "student"}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </label>
                    <label   style={{ textAlign: 'center', background:"red", fontSize:"40px" }}>
                        <h7 className="level"> Teacher </h7>
                        <input
                            type="radio"
                            value="teacher"
                            checked={role === "teacher"}
                            onChange={(e) => setRole(e.target.value)}
                        />
                    </label>
                </div>
                <input type="text"   style={{ textAlign: 'center', background:"white", fontSize:"40px" }} value={email} onChange= {(e) => setEmail(e.target.value)} placeholder="Enter your email"  />
                <input type="text"   style={{ textAlign: 'center', background:"white", fontSize:"40px" }} value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Enter your name"  />
                {role === 'student' && (
                    <input   style={{ textAlign: 'center', background:"white", fontSize:"40px" }} type="number" value={rolenumber} onChange={(e) => setRolenumber(e.target.value)} placeholder="Enter your RoleNumber"  />
                )}
                {role === 'teacher' && (
                    <input   style={{ textAlign: 'center', background:"white", fontSize:"40px" }} type="text" value={rolenumber} onChange={(e) => setRolenumber(e.target.value)} placeholder="Enter your ID Number"  />
                )}
                <input   style={{ textAlign: 'center', background:"white", fontSize:"40px" }} type="number" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="Enter your phone"  />
                <input   style={{ textAlign: 'center', background:"white", fontSize:"40px" }} type="text" value={address} onChange={(e) => setAddress(e.target.value)} placeholder="Enter your Address"  />
                <input   style={{ textAlign: 'center', background:"white", fontSize:"40px" }} type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password"  />
               <div>
                <button style={{ textAlign: 'center', background:"green", fontSize:"40px" }} onClick={collectData} type="button" >Register</button>
                </div>
                <p style={{ textAlign: 'center', background:"yellow", fontSize:"40px" }} >Already User Please
                    <Link to="/login">Login !</Link>
                </p>
            </div>
        </div>
    );
}

export default Register;
