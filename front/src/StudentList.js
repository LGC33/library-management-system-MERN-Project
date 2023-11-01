import React, { useState, useEffect } from 'react';

const StudentList = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, [])

    const getUsers = async () => {
        let result = await fetch("http://localhost:3800/student-list");
        let data = await result.json();
        setUsers(data)
    }

    return (
        <div>
            <h2 style={{ textAlign: 'center' }}>Student List</h2>
            <div style={{ padding: '5px', marginBottom: '10px' , textAlign: 'center' }}>
            <input type="text" placeholder="search Student" style={{fontSize:'30px', width:'600px', padding: '5px', marginBottom: '10px' , textAlign: 'center' }} />
            </div>
            <ul className="ul-nav1" style={{ listStyleType: 'none', padding: '0', display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                <li className="Li" style={{ flex: '1' , background: 'red', fontSize:'30px'}}>S.NO</li>
                <li className="Li" style={{ flex: '2', background: 'red', fontSize:'30px' }}>Name</li>
                <li className="Li" style={{ flex: '2' , background: 'red', fontSize:'30px'}}>Phone</li>
                <li className="Li" style={{ flex: '2' , background: 'red', fontSize:'30px'}}>RoleNumber</li>
                <li className="Li" style={{ flex: '2' , background: 'red', fontSize:'30px'}}>Address</li>
            </ul>

            {Array.isArray(users) && users.length > 0 ? users.map((item, index) => (
                <ul className="ul-nav" key={item._id} style={{ listStyleType: 'none', padding: '0', display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <li className="Li" style={{ flex: '1' , fontSize:'30px'}}>{index + 1}</li>
                    <li className="Li" style={{ flex: '2', fontSize:'30px' }}>{item.username}</li>
                    <li className="Li" style={{ flex: '2' , fontSize:'30px'}}>{item.phone}</li>
                    <li className="Li" style={{ flex: '2' , fontSize:'30px'}}>{item.rolenumber}</li>
                    <li className="Li" style={{ flex: '2' , fontSize:'30px'}}>{item.address}</li>
                </ul>
            )) : <h1>No Result Found</h1>}
        </div>
    );
}

export default StudentList;
