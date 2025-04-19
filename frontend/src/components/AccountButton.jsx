import React from 'react';

const AccountButton = ({onClick}) => {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: '#007bff',    // blue background
        border: 'none',
        borderRadius: '5px',
        width: '40px',                 // same size as the cart button
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer'
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        fill="none"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        viewBox="0 0 24 24"
      >
        {/* User head */}
        <circle cx="12" cy="8" r="4" />
        {/* Shoulders */}
        <path d="M6 20c0-4 4-6 6-6s6 2 6 6" />
      </svg>
    </button>
  );
};

export default AccountButton;
