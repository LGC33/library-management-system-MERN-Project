import React, { useState, useEffect } from 'react';

const Requestt = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await fetch('http://localhost:3800/requests');
        const data = await response.json();
        setRequests(data);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    fetchRequests();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center' }}>Teacher Dashboard</h1>
      <ul style={{ listStyleType: 'none', margin: 0, padding: 0, textAlign: 'center', background: 'blue'}}>
        <li className="Li" style={{ display: 'inline-block', width: '20%', background: 'red', fontSize: '50px' }}>Student Name</li>
        <li className="Li" style={{ display: 'inline-block', width: '20%', background: 'red', fontSize: '50px' }}>Book Name</li>
        <li className="Li" style={{ display: 'inline-block', width: '20%', background: 'red', fontSize: '50px' }}>Status</li>
      </ul>

      {requests.map((request, index) => (
        <ul key={index} style={{ listStyleType: 'none', margin: 0, padding: 0, textAlign: 'center', background: 'yellow' }}>
          <li style={{ background: 'green', fontSize: '50px' }}>
            Student: {request.username}
          </li>
          <li style={{ background: 'green', fontSize: '50px',display: 'inline-block', width: '20%' }}> Book: {request.bookname}</li>
          <li style={{ background: 'green', fontSize: '50px' ,display: 'inline-block', width: '20%'}}>Status: {request.status}</li>
        </ul>
      ))}
    </div>
  );
}

export default Requestt;
