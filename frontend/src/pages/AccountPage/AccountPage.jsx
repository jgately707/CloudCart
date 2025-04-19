import { useEffect, useState } from 'react';
import Logo from '../../components/Logo';
import ShoppingCartButton from '../../components/ShoppingCartButton';
import AccountButton from '../../components/AccountButton';

const AccountPage = () => {
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [activeSection, setActiveSection] = useState('profile');

  useEffect(() => {
    fetch('https://localhost:5001/api/users/me', {
      credentials: 'include'
    })
      .then(res => res.json())
      .then(data => {
        setUserData({ name: data.name, email: data.email });
      })
      .catch(err => console.error('Failed to fetch user data:', err));
  }, []);

  const handleSectionClick = (section) => {
    setActiveSection(section);
  };

  const SearchIcon = (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="11" cy="11" r="7" stroke="#555" strokeWidth="2" />
      <line x1="16.6569" y1="16.6569" x2="22" y2="22" stroke="#555" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'profile':
  return (
    <>
      <h2 style={{ marginBottom: '24px' }}>My Profile</h2>
      <p style={{ marginBottom: '12px' }}>Manage and protect your account</p>
      <div style={{ borderBottom: '1px solid #e0e0e0', marginBottom: '24px' }} />
      <div style={{ marginBottom: '20px' }}>
        <label>Name</label>
        <input type="text" value={userData.name} readOnly style={inputStyle} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>Email</label>
        <input type="text" value={userData.email} readOnly style={inputStyle} />
      </div>
      <div style={{ marginBottom: '20px' }}>
        <label>Phone Number</label>
        <input type="text" placeholder="Not implemented" readOnly style={inputStyle} />
      </div>
      <div>
        <label>Date of Birth</label>
        <input type="text" placeholder="Not implemented" readOnly style={inputStyle} />
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '24px' }}>
        <button style={{
          padding: '10px 20px',
          backgroundColor: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '16px'
        }}>
          Update Profile
        </button>
      </div>
    </>
  );

      case 'banks':
        return (
          <>
            <h2>Banks & Cards</h2>
            <button>Add New Card</button>
          </>
        );
      case 'addresses':
        return (
          <>
            <h2>Addresses</h2>
            <button>Add New Address</button>
          </>
        );
      case 'change password':
        return (
          <>
            <h2>Change Password</h2>
            <button>Change Password</button>
          </>
        );
      case 'notifications':
        return (
          <>
            <h2>Notification Settings</h2>
            <button>Manage Preferences</button>
          </>
        );
      case 'orders':
        return (
          <>
            <h2>Orders</h2>
            <p>Order history not implemented</p>
          </>
        );
      case 'coupons & vouchers':
        return (
          <>
            <h2>Coupons & Vouchers</h2>
            <button>View Available Coupons</button>
          </>
        );
      default:
        return null;
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '8px',
    borderRadius: '4px',
    border: '1px solid #ccc'
  };

  const sidebarItems = [
    'profile',
    'banks',
    'addresses',
    'change password',
    'notifications',
    'orders',
    'coupons & vouchers'
  ];

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
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <ShoppingCartButton />
          <AccountButton />
        </div>
      </header>

      <main style={{ display: 'flex', padding: '40px 160px', gap: '40px' }}>
        {/* Sidebar */}
        <div style={{ minWidth: '165px' }}>
          <h3 style={{ marginBottom: '24px' }}>My Account</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {sidebarItems.map(item => (
              <li
                key={item}
                onClick={() => handleSectionClick(item)}
                style={{
                  padding: '8px 0',
                  cursor: 'pointer',
                  fontWeight: activeSection === item ? 'bold' : 'normal',
                  color: activeSection === item ? '#007bff' : '#333',
                  transition: '0.2s',
                  textTransform: 'capitalize'
                }}
                onMouseEnter={e => e.target.style.color = '#007bff'}
                onMouseLeave={e => {
                  if (activeSection !== item) e.target.style.color = '#333';
                }}
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Content */}
        <div style={{
          backgroundColor: 'white',
          padding: '32px',
          borderRadius: '8px',
          boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
          width: '100%',
          maxWidth: '920px'
        }}>
          {renderSectionContent()}
        </div>
      </main>
    </div>
  );
};

export default AccountPage;
