import "./App.css"
import Header from "./Components/common/Header/Header"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import About from "./Components/About/About"
import CourseHome from "./Components/allcourses/CourseHome"
import Assignment from './Pages/Assigment';
import LoginSignup from './Pages/LoginSignup';
import SqlEditor from './Pages/SqlEditor';
import Contact from "./Components/common/contact/Contact"
import Footer from "./Components/common/Footer/Footer"
import Home from "./Components/Home/Home"
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route exact path='/' element={<Home/>} />
          <Route exact path='/about' element={<About/>} />
          <Route exact path='/courses' element={<CourseHome/>} />
          <Route exact path='/sql-editor' element={<SqlEditor/>} />
          <Route exact path='/assignment' element={<Assignment/>} />
          <Route exact path='/login' element={<LoginSignup/>} />
          <Route exact path='/contact' element={<Contact/>} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App