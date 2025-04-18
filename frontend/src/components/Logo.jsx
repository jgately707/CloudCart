import React from 'react';

const Logo = () => (
  <div style={{ display: 'flex', alignItems: 'center' }}>
    {/* Enlarged cloud with shopping cart illustration */}
    <svg
      width="70"         // increased width
      height="70"        // increased height
      viewBox="0 0 64 64"
      style={{ marginRight: '8px' }}
    >
      {/* Cloud shape */}
      <path
        d="M20,35 C20,28 26,23 32,23 C38,23 44,28 44,35 C48,35 52,38 52,42 C52,46 48,50 44,50 H24 C20,50 16,46 16,42 C16,38 20,35 20,35 Z"
        fill="#ADD8E6"      // light blue fill
        stroke="#6495ED"    // darker blue stroke
        strokeWidth="2"
      />
      {/* Shopping cart sketch overlay */}
      <path
        d="M30 38 H40 V42 H30 Z"
        fill="#fff"
        stroke="#6495ED"
        strokeWidth="2"
      />
      <circle cx="30" cy="46" r="2" fill="#6495ED" />
      <circle cx="40" cy="46" r="2" fill="#6495ED" />
    </svg>
    <span
      style={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
        fontSize: '22px',
        fontWeight: 'bold',
        color: '#6495ED'
      }}
    >
      Cloud Cart
    </span>
  </div>
);

export default Logo;
