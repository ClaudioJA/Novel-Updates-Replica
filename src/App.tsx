import React from 'react';
import logo from './logo.svg';
import './App.css';
import {Route, Routes, BrowserRouter, Router} from 'react-router-dom';
import HomePage from './components/HomePage';
import Layout from './components/Layout';
import AddUser from './components/AddUser';
import EditUser from './components/EditUser';
import AddNovel from './components/AddNovel';
import NovelDetail from './components/NovelDetail';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import UserManagement from './components/UserManagement';
import ReadingListPage from './components/ReadingListPage';

function App() {
  return (
    <Routes>
        <Route path="/" element={<Layout><HomePage /></Layout>} />
        <Route path="/login" element={<Layout><LoginPage /></Layout>} />
        <Route path="/register" element={<Layout><RegisterPage /></Layout>} />
        <Route path="/user/add" element={<Layout><AddUser /></Layout>} />
        <Route path="/user/update/:id" element={<Layout><EditUser /></Layout>} />
        <Route path="/novel/add" element={<Layout><AddNovel /></Layout>} />
        <Route path="/novel/detail/:id" element={<Layout><NovelDetail /></Layout>} />
        <Route path="/userlist/" element={<Layout><UserManagement /></Layout>} />
        <Route path="/readingList/:id" element={<Layout><ReadingListPage /></Layout>} />
    </Routes>
  );
}

function Root() {
  return (
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );
}

export default Root;
