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
          <Route exact path='/' component={Home} />
          <Route exact path='/about' component={About} />
          <Route exact path='/courses' component={CourseHome} />
          <Route exact path='/sql-editor' component={SqlEditor} />
          <Route exact path='/assignment' component={Assignment} />
          <Route exact path='/login' component={LoginSignup} />
          <Route exact path='/contact' component={Contact} />
          </Routes>
        <Footer />
      </BrowserRouter>
    </>
  )
}

export default App