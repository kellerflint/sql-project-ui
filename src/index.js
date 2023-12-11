import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { ClerkProvider, RedirectToSignIn, SignIn, SignUp, SignedIn, SignedOut } from "@clerk/clerk-react";
import { BrowserRouter, Routes, Route, useNavigate, redirect } from 'react-router-dom';
import ProtectedPage from './ProtectedPage';

import About from "./Components/About/About"
import CourseHome from "./Components/allcourses/CourseHome"
import Assignment from './Pages/Assigment';
import LoginSignup from './Pages/LoginSignup';
import SqlEditor from './Pages/SqlEditor';
import Contact from "./Components/common/contact/Contact"
import Header from "./Components/common/Header/Header"
import Footer from "./Components/common/Footer/Footer"
import Home from "./Components/Home/Home"
 
if (!process.env.REACT_APP_CLERK_PUBLISHABLE_KEY) {
  throw new Error("Missing Publishable Key")
}
const clerkPubKey = process.env.REACT_APP_CLERK_PUBLISHABLE_KEY;
 
const root = ReactDOM.createRoot(document.getElementById('root'));

const ClerkWithRoutes = () => {
  const naviagte = useNavigate()

  return (
  <ClerkProvider
    publishableKey={clerkPubKey}
      navigate={(to) => naviagte(to)}
      >
        <Header />
        <Routes>

        <Route exact path='/' element={<Home/>} />
        <Route exact path='/about' element={<About/>} />
        <Route exact path='/courses' element={<CourseHome/>} />
        <Route exact path='/sql-editor' element={<SqlEditor/>} />
        <Route exact path='/assignment' element={<Assignment/>} />
        <Route exact path='/login' element={<LoginSignup/>} />
        <Route exact path='/contact' element={<Contact/>} />

        <Route
          path="/sign-in/*"
          element={<SignIn redirectUrl={'/protected'} routing="path" path="/sign-in" />}
        />
        <Route
          path="/sign-up/*"
          element={<SignUp redirectUrl={'/protected'} routing="path" path="/sign-up" />}
        />
         <Route
          path="/protected"
          element={
          <>
            <SignedIn>
              <ProtectedPage />
            </SignedIn>
            <SignedOut>
              <RedirectToSignIn />
            </SignedOut>
          </>
          }
        />
        </Routes>
  </ClerkProvider>
  )
}

root.render(
  <React.StrictMode>
    <BrowserRouter>
      <ClerkWithRoutes />
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
