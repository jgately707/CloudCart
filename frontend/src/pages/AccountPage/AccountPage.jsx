import { useEffect, useState } from 'react';
import Logo from '../../components/Logo';
import ShoppingCartButton from '../../components/ShoppingCartButton';
import AccountButton from '../../components/AccountButton';

const AccountPage = () => {
  const SearchIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="7" stroke="#555" strokeWidth="2" />
      <line x1="16.6569" y1="16.6569" x2="22" y2="22" stroke="#555" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
  function getEmail(){

  }

  return (
    <div style={{ backgroundColor: '#f2f2f2', minHeight: '100vh' }}>
      <header style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 168px 10px 142px',
        backgroundColor: '#e3f2fd',
        boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
      }}>
        <Logo />
        <div style={{
          flex: '0 1 800px',
          display: 'flex',
          margin: '0 auto'
        }}>
          <input
            type="text"
            placeholder="Search for products, brands and shops"
            style={{
              flex: 1,
              padding: '8px 12px',
              fontSize: '16px',
              border: '1px solid #ccc',
              borderRadius: '4px 0 0 4px',
              outline: 'none'
            }}
          />
          <button style={{
            padding: '8px 12px',
            backgroundColor: '#007bff',
            border: '1px solid #007bff',
            borderRadius: '0 10px 10px 0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }} onClick={() => alert('Search')}>
            {SearchIcon}
          </button>
        </div>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px'
        }}>
          <ShoppingCartButton />
          <AccountButton />
        </div>
      </header>

      {/* New Content Section */}
      <main style={{ display: 'flex', justifyContent: 'center', padding: '40px 20px' }}>
        <div style={{
          backgroundColor: 'white',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          width: '100%',
          maxWidth: '960px'
        }}>
        <h2 style={{ marginBottom: '24px' }}>My Profile</h2>
        <p style={{ marginBottom: '12px' }}>Manage and protect your account</p>
        <div style={{
        borderBottom: '1px solid #e0e0e0',
        marginBottom: '24px'
        }} />

        {/* Name field*/}
        <div>Name
         <input>

         </input>
        </div>

        {/* Email field */}
        <div>Email
            <div>
            </div>
        </div>

        {/* Phone Number  */}
        <div>Phone Number
         <input>

         </input>
        </div>

        {/* Date Of Birth */}
        <div>Date of birth
         <input>

         </input>
        </div>

        </div>
      </main>
    </div>
  );
};

export default AccountPage;
