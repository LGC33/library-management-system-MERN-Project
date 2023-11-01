import React, { useState, useEffect } from 'react';

const Booklist = () => {
    const [books, setBooks] = useState([]);
    const auth = JSON.parse(localStorage.getItem('user')); 

    useEffect(() => {
        getBooks();
    }, []);

    const getBooks = async () => {
        try {
            let result = await fetch("http://localhost:3800/book-list");
            let data = await result.json();
            setBooks(data);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const requestBook = async (book) => {
        try {
            const response = await fetch('http://localhost:3800/request-book', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    bookId: book._id, 
                })
            });

            if (response.ok) {
                alert('Book requested successfully!');
                getBooks();
            } else {
                alert('Error requesting book');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    const deleteProduct = async (id) => {
        try {
            let result = await fetch(`http://localhost:3800/book/${id}`, {
                method: 'DELETE'
            });
            let data = await result.json();
            if (data) {
                getBooks();
            }
        } catch (error) {
            console.error('Error deleting product:', error);
        }

    };
    const serchhendle = async (event) => {
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:3400/search/${key}`);
            let data = await result.json()
            if (data) {
                getBooks(data)
            }
        } else {
            getBooks()
        }

    }

    return (
        <div>
            <h2 style={{ marginBottom: '10px', fontSize: '30px', textAlign: 'center' }}>Book List</h2>
            <input type="text" placeholder="search product" onChange={serchhendle} style={{ marginBottom: '10px', fontSize: '30px', textAlign: 'center' }} className="search" />

            <ul style={{ listStyleType: 'none', margin: 0, padding: 0, textAlign: 'center' }}>
                <li className="Li" style={{ display: 'inline-block', width: '10%', background: 'red', fontSize: '30px' }}>S.NO</li>
                <li className="Li" style={{ display: 'inline-block', width: '10%', background: 'red', fontSize: '30px' }}>Book Name</li>
                <li className="Li" style={{ display: 'inline-block', width: '10%', background: 'red', fontSize: '30px' }}>Semester</li>
                <li className="Li" style={{ display: 'inline-block', width: '10%', background: 'red', fontSize: '30px' }}>Departments</li>
                {auth && auth.role === 'student'  && <li className="Li" style={{ display: 'inline-block', width: '10%', background: 'red', fontSize: '30px' }}>Request</li>}
            {auth && auth.role === 'teacher' && <li class="Li" style={{ display: 'inline-block', width: '10%', background: 'red', fontSize: '30px' }} > Delete</li>}
            {auth && auth.role === 'teacher' && <li class="Li" style={{ display: 'inline-block', width: '10%', background: 'red', fontSize: '30px' }} > Update</li>}
            </ul>

            {
                Array.isArray(books) && books.length > 0 ? books.map((item, index) => (
                    <ul style={{ listStyleType: 'none', margin: 0, padding: 0, textAlign: 'center' }} key={item._id}>
                        <li className="Li" style={{ display: 'inline-block', width: '10%', fontSize: '30px' }}>{index + 1}</li>
                        <li className="Li" style={{ display: 'inline-block', width: '10%', fontSize: '30px' }}>{item.bookname}</li>
                        <li className="Li" style={{ display: 'inline-block', width: '10%', fontSize: '30px' }}>{item.semester}</li>
                        <li className="Li" style={{ display: 'inline-block', width: '10%', fontSize: '30px' }}>{item.departments}</li>
                        {auth && auth.role === 'student'  && <li className="Li" style={{ display: 'inline-block', width: '10%', fontSize: '30px' }}>
                            <button onClick={() => requestBook(item)}>Request Book</button>
                        </li>}
                        {auth && auth.role === 'teacher'  && <li className="Li" style={{ display: 'inline-block', width: '10%', fontSize: '30px' }}>
                            <button onClick={() => deleteProduct(item._id)}>Delete Book</button>
                        </li>}
                        {auth && auth.role === 'teacher'  && <li className="Li" style={{ display: 'inline-block', width: '10%', fontSize: '30px' }}>
                            <button >Update Book</button>
                        </li>}
                    </ul>
                )) : <h1>No Result Found</h1>
            }
        </div>
    );
}

export default Booklist;
