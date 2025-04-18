// src/pages/homePages/UserHomePage/UserHomePage.jsx
import React from 'react';
import Logo from '../../../components/Logo';
import ShoppingCartButton from '../../../components/ShoppingCartButton';
import AccountButton from '../../../components/AccountButton';
import electronicsBanner from '../../../components/images/shopElectronics.png';
import './UserHomePage.CSS';

// Search icon SVG
const SearchIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="11" cy="11" r="7" stroke="#555" strokeWidth="2" />
    <line x1="16.6569" y1="16.6569" x2="22" y2="22" stroke="#555" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const UserHomePage = () => (
  <div style={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
    <header style={headerStyle}>
      <Logo />

      {/* Centered search */}
      <div style={searchWrapperStyle}>
        <input
          type="text"
          placeholder="Search for products, brands and shops"
          style={inputStyle}
        />
        <button style={searchButtonStyle} onClick={() => alert('Search')}>
          {SearchIcon}
        </button>
      </div>

      {/* Cart & Account */}
      <div style={actionButtonsStyle}>
        <ShoppingCartButton />
        <AccountButton />
      </div>
    </header>

    <HomeSections />
  </div>
);

/* ---------- Styles ---------- */
const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 168px 10px 142px',  // ← right:20px, left:10px
  backgroundColor: '#e3f2fd',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
};

const searchWrapperStyle = {
  flex: '0 1 800px',    // ← allow up to 800px (was 700px)
  display: 'flex',
  margin: '0 auto',
};


const inputStyle = {
  flex: 1,
  padding: '8px 12px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '4px 0 0 4px',
  outline: 'none',
};

const searchButtonStyle = {
  padding: '8px 12px',
  backgroundColor: '#007bff',
  border: '1px solid #007bff',
  borderRadius: '0 10px 10px 0',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const actionButtonsStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
};

/* Banner and category styles unchanged… */

const bannerStyle = {
  width: '100%',
  backgroundColor: '#fafafa',
  textAlign: 'center',
  padding: '30px 10px',
  boxSizing: 'border-box',
  borderBottom: '1px solid #eee',
};

const categorySectionStyle = {
  maxWidth: '1200px',
  margin: '0 auto',
  display: 'flex',
  justifyContent: 'space-around',
  flexWrap: 'wrap',
  gap: '32px',
  padding: '20px 0',
  backgroundColor: '#f9f9f9',
};

const categoryButtonStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '10px',
  width: '100px',
  height: '100px',
  backgroundColor: '#fff',
  border: '1px solid #ccc',
  borderRadius: '8px',
  cursor: 'pointer',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const HomeSections = () => (
  <div>
    <ElectronicsBanner />
    <CategorySection />
  </div>
);

const ElectronicsBanner = () => (
  <div style={bannerStyle}>
    <img
      src={electronicsBanner}
      alt="New arrivals in electronics"
      style={{
        backgroundColor: 'white',
        width: '80%',
        height: '280px',
        objectFit: 'cover',
        borderRadius: '12px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      }}
    />
  </div>
);

const CategoryButton = ({ icon, label }) => (
  <button style={categoryButtonStyle} onClick={() => alert(`Clicked on: ${label}`)}>
    <div style={{ marginBottom: '8px', fontSize: '24px' }}>{icon}</div>
    <span style={{ fontSize: '14px', fontWeight: 'bold' }}>{label}</span>
  </button>
);

const ElectronicsIcon = (
  <span role="img" aria-label="electronics" style={{ fontSize: '24px' }}>🔌</span>
);

const HomeIcon = (
  <span role="img" aria-label="home" style={{ fontSize: '24px' }}>🏠</span>
);

const ClothesIcon = (
  <span role="img" aria-label="clothes" style={{ fontSize: '24px' }}>👕</span>
);

const TrendyIcon = (
  <span role="img" aria-label="fire" style={{ fontSize: '24px' }}>🔥</span>
);

const SupermarketIcon = (
  <span role="img" aria-label="supermarket" style={{ fontSize: '24px' }}>🛒</span>
);

const DealsIcon = (
  <span style={{ fontSize: '24px', fontWeight: 'bold' }}>$</span>
);

const CategorySection = () => (
  <div style={categorySectionStyle}>
    <CategoryButton icon={ElectronicsIcon} label="Electronics" />
    <CategoryButton icon={HomeIcon} label="Home" />
    <CategoryButton icon={ClothesIcon} label="Clothes" />
    <CategoryButton icon={TrendyIcon} label="Trendy" />
    <CategoryButton icon={SupermarketIcon} label="Supermarket" />
    <CategoryButton icon={DealsIcon} label="Deals" />
  </div>
);

export default UserHomePage;
