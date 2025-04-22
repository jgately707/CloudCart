// src/index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/loginPages/Login/Login';
import CreateAccount from './pages/loginPages/createAccount/CreateAccount';
import UserHomePage from './pages/homePages/UserHomePage/UserHomePage';
import AccountPage from './pages/AccountPage/AccountPage';
import Product from './pages/Product/Product';
import './index.css';
import reportWebVitals from './reportWebVitals';

const App = () => (
  <BrowserRouter>
    <Routes>
      {/* 1) Anyone at “/” goes to login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* 2) Public auth pages */}
      <Route path="/login" element={<Login />} />
      <Route path="/create-account" element={<CreateAccount />} />

      {/* 3) Your protected app pages */}
      <Route path="/home" element={<UserHomePage />} />
      <Route path="/account" element={<AccountPage />} />
      <Route path="/product/:productId" element={<Product />} />

      {/* 4) Catch‑all also sends back to login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  </BrowserRouter>
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
