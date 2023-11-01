import React, { useState, useEffect } from 'react';
import axios from 'axios';

function IssueBook() {
  const [books, setBooks] = useState([]);
  const [bookname, setBookname] = useState("");
  const [semester, setSemester] = useState("");
  const [departments, setDepartments] = useState("");
  const [status, setStatus] = useState("Requested");
  const auth = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    async function fetchBooks() {
      try {
        const response = await axios.get('http://localhost:3800/book-list');
        setBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    }
    fetchBooks();
  }, []);

  const inputStyle = {
    width: '100%',
    padding: '10px',
    marginBottom: '10px',
    fontSize: '16px',
  };

  const buttonStyle = {
    padding: '10px 20px',
    fontSize: '16px',
    margin: '5px',
  };

  const handleRequest = async () => {
    try {
      await axios.post('http://localhost:3800/books', {
        bookname: bookname,
        departments: departments,
        semester: semester,
        status: status,
      });
      alert('Book request sent!');
    } catch (error) {
      console.error(error);
    }
  };

  const handleAccept = async (book) => {
    try {
      await axios.put(`http://localhost:3800/bookk/${book._id}`, {
        status: 'Accepted',
      });
      alert('Book request accepted!');
      const response = await axios.get('http://localhost:3800/book-list');
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (book) => {
    try {
      await axios.put(`http://localhost:3800/bookk/${book._id}`, {
        status: 'Rejected',
      });
      alert('Book request rejected!');
      const response = await axios.get('http://localhost:3800/book-list');
      setBooks(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1 style={{ fontSize: '24px', marginBottom: '20px' }}>Library Book Request System</h1>
      
      {auth && auth.role === 'student' && (
        <>
          <input type='text' placeholder='Book Name' value={bookname} onChange={(e) => setBookname(e.target.value)} style={inputStyle} />
          <input
            list="departments"
            value={departments}
            onChange={(e) => setDepartments(e.target.value)}
            id="department"
            placeholder="Select Your Branch"
            style={inputStyle}
          />
          <datalist id="departments">
            <option value="Computer" />
            <option value="Civil" />
            <option value="Electrical" />
            <option value="Mechanical" />
            <option value="Biotech" />
            <option value="Agriculture" />
          </datalist>
          <input type='text' placeholder='Semester' value={semester} onChange={(e) => setSemester(e.target.value)} style={inputStyle} />
          <input type='text' placeholder='Status' value={status} onChange={(e) => setStatus(e.target.value)} style={inputStyle} />
          <button onClick={handleRequest} style={buttonStyle}>Request</button>
        </>
      )}
      
      {auth && auth.role === 'teacher' && (
        <ul style={{ fontSize: '24px', marginBottom: '20px' }}>
          {books.map((book) => (
            <li key={book._id}>
              {book.bookname} by {book.departments} Branch And {book.semester} year
              {book.status === 'Requested' && (
                <>
                  <button onClick={() => handleAccept(book)} style={buttonStyle}>Accept</button>
                  <button onClick={() => handleReject(book)} style={buttonStyle}>Reject</button>
                </>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default IssueBook;
