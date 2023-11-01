import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Teacherheader from "./Teacherhader";

const Profile = () => {
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    setUserInfo(user);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/');
  }

  return (
    <div className="profile-container" style={{ textAlign: 'center', marginTop: '50px' }}>
      <div className="profile-content" style={{ margin: '20px', background: 'red' }}>
        <h2>Welcome to your Profile</h2>
        {userInfo && (
          <div className="user-info">
            <p style={{ margin: '20px', background: 'yellow',textAlign: 'center' , fontSize: '26px'}}><strong>Name:</strong> {userInfo.username}</p>
            <p style={{ margin: '20px', background: 'yellow',textAlign: 'center' , fontSize: '26px'}}><strong>Email:</strong> {userInfo.email}</p>
            <p style={{ margin: '20px', background: 'yellow',textAlign: 'center', fontSize: '26px'}}><strong>Role:</strong> {userInfo.role}</p>
            {userInfo.role === 'student' && <p  style={{ margin: '20px', background: 'yellow',textAlign: 'center' , fontSize: '26px'}}><strong>RoleNumber:</strong> {userInfo.rolenumber}</p>}
            {userInfo.role === 'teacher' && <p  style={{ margin: '20px', background: 'yellow',textAlign: 'center' , fontSize: '26px'}}><strong>IdNumber:</strong> {userInfo.Idnumber}</p>}
            <p style={{ margin: '20px', background: 'yellow',textAlign: 'center' , fontSize: '26px'}}><strong>Phone:</strong> {userInfo.phone}</p>
            <p style={{ fontSize: '27px', margin: '20px', background: 'yellow',textAlign: 'center'  , fontSize: '26px'}}><strong>Address:</strong> {userInfo.address}</p>
            <button className="logout-button" style={{ margin: '10px' , background: 'green',textAlign: 'center'  , fontSize: '26px' }} onClick={handleLogout}>Logout</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;

