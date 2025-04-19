import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/loginPages/Login/Login';
import CreateAccount from './pages/loginPages/createAccount/CreateAccount';
import './index.css';
import reportWebVitals from './reportWebVitals';
import UserHomePage from './pages/homePages/UserHomePage/UserHomePage';
import AccountPage from './pages/AccountPage/AccountPage';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/create-account" element={<CreateAccount />} />
        <Route path="/home" element={<UserHomePage />} />
        <Route path= "/account" element={ <AccountPage/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

reportWebVitals();
