import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Home from './view/home';
import Practice from './view/practice';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/practice" element={<Practice />} />
        <Route path="/" element={<Home />} />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
