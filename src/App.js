
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
//import Footer from './Components/Footer/Footer'
import Courses from './Pages/Courses';
import Assignment from './Pages/Assigment';
import LoginSignup from './Pages/LoginSignup';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Courses/>}/>
          <Route path='/assignment' element={<Assignment/>}>
              <Route path=':assignmentId' element={<Assignment/>}/>
              {/*<Route path='../questions' element={<questions/>}/>
              <Route path='questionId' element={<questions/>}/>*/}
          </Route>
          <Route path='/sql-editor' element={<sql-editor/>}/>
          <Route path='/login' element={<LoginSignup/>}/>
        </Routes>
        {/*<Footer/>*/}
        </BrowserRouter>
      </div>
  );
}

export default App;
