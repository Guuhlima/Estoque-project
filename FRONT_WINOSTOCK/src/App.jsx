import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import CreateItem from './pages/CreateItem';
import Home from './pages/Home'
import DeleteItem from './pages/DeleteItem';
import GetItemId from './pages/GetITemID'


const app = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/CreateItem" element={<CreateItem/>} />
        <Route path="/DeleteItem" element={<DeleteItem/>} />
        <Route path="/GetItemId" element={<GetItemId/>} />
      </Routes>
    </Router>
  )
}

export default app;