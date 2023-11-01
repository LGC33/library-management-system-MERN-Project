import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const AddBook = () => {
    const [bookname, setBookname] = useState("");
    const [semester, setSemester] = useState("");
    const [departments, setDepartments] = useState("");
    const [error, setError] = useState(false);
    const navigate = useNavigate();

    const Additem = async () => {
        console.warn(bookname);

        if (!bookname || !semester || !departments) {
            setError(true);
            return false;
        }

        console.warn(bookname, semester, departments);

        const result = await fetch("http://localhost:3800/bookss", {
            method: 'post',
            body: JSON.stringify({ departments, bookname, semester }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        let data = await result.json();
        console.warn(data);

        if (data.bookname && data.semester && data.departments) {
            navigate("/booklist");
        } else {
            alert("Please enter correct details");
        }
    }

    return (
        <div className="register" style={{ textAlign: 'center', marginTop:'300px', maxWidth: '400px', margin: '0 auto' , fontSize: '26px' }}>
            <div  style={{ textAlign: 'center', marginTop:'300px', maxWidth: '400px', margin: '0 auto' , fontSize: '26px' }}>
            <input
                list="departments"
                value={departments}
                onChange={(e) => setDepartments(e.target.value)}
                id="department"
                placeholder="Select Your branch"
                style={{ width: '100%', padding: '10px', marginBottom: '10px', fontSize: '26px' }}
            />
            <datalist id="departments">
                <option value="Computer" />
                <option value="Civil" />
                <option value="Electrical" />
                <option value="Mechanical" />
                <option value="Biotech" />
                <option value="Agriculture" />
            </datalist>
            {error && !departments && <span>Enter Valid department</span>}<br />

            <input
                type="text"
                value={bookname}
                onChange={(e) => setBookname(e.target.value)}
                placeholder="Enter your bookname"
                style={{ width: '100%', padding: '10px', marginBottom: '10px' , fontSize: '26px'}}
            />
            {error && !bookname && <span>Enter Valid bookname</span>}<br />

            <input
                type="text"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
                placeholder="Enter your Semester"
                style={{ width: '100%', padding: '10px', marginBottom: '10px', fontSize: '26px' }}
            />
            {error && !semester && <span>Enter Valid semester</span>}<br />

            <button
                className="appbutton"
                onClick={Additem}
                type="submit"
                style={{ padding: '10px 20px', fontSize: '26px', backgroundColor: '#007BFF', color: '#fff', border: 'none', cursor: 'pointer' }}
            >
                Add Book
            </button>
            </div>
        </div>
    )
}

export default AddBook;
