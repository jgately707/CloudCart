import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import CreateAccount from './pages/loginPages/createAccount/CreateAccount';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CreateAccount />
  </React.StrictMode>
);

reportWebVitals();
