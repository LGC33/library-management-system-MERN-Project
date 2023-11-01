
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './Login';
import Register from './Register';
import Homepage from './Homepage';
import Profile from './Profile';
import Teacherdashboard from './Teacherdashboard';
import IssueBook from './IssueBook';
import ReturnBook from './ReturnBook';
import StudentList from './StudentList';
import Booklist from './Booklist';
import AddStudent from './AddStudent';
import AddBook from './AddBook';
import Private from './Private';
import Requestt from './Requestt';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Teacherdashboard />
        <Routes>
          <Route element={<Private />} >
          <Route path='/' element={<Homepage />} />
          <Route path='/Profile' element={<Profile />} />
          <Route path='/Teacherdashboard' element={<Teacherdashboard />} />
          <Route path="/issuse" element={<IssueBook />} />
          <Route path="/returnbook" element={<ReturnBook />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/studentlist" element={<StudentList />} />
          <Route path="/booklist" element={<Booklist />} />
          <Route path="/addstudent" element={<AddStudent />} />
          <Route path='/addbook' element={<AddBook/>} />
          <Route path='/request' element={<Requestt />} />
          </Route>
          <Route path='/login' element={<Login />} />
          <Route path='/Register' element={<Register />} />

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
