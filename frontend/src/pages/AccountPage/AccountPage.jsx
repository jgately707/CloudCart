import React, { useEffect, useState } from 'react';
import Logo from '../../components/Logo';
import ShoppingCartButton from '../../components/ShoppingCartButton';
import AccountButton from '../../components/AccountButton';

const AccountPage = () => {
  const [userData, setUserData] = useState({ name: '', email: '', phone: '' });
  const [activeSection, setActiveSection] = useState('profile');
  const [addresses, setAddresses] = useState([]);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [newPhone, setNewPhone] = useState('');
  const [newEmail, setNewEmail] = useState('');

  // Fetch user profile
  useEffect(() => {
    fetch('https://localhost:5001/api/users/me', { credentials: 'include' })
      .then(res => res.json())
      .then(data =>
        setUserData({
          name: data.name,
          email: data.email,
          phone: data.phone || ''
        })
      )
      .catch(err => console.error('Failed to fetch user data:', err));
  }, []);

  // Fetch addresses
  useEffect(() => {
    fetch('https://localhost:5001/api/users/address', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setAddresses(Array.isArray(data) ? data : [data]))
      .catch(err => console.error('Failed to fetch addresses:', err));
  }, []);

  const addAddress = () => setIsAddressModalOpen(false);
  const handleSectionClick = section => setActiveSection(section);

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
            <h2 style={heading}>My Profile</h2>
            <p style={subheading}>Manage and protect your account</p>
            <div style={divider} />

            <Field label="Name">
              <input readOnly value={userData.name} style={inputStyle} />
            </Field>

            <Field label="Email">
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <input readOnly value={userData.email} style={inputStyle} />
                <button style={linkBtn} onClick={() => setActiveSection('email')}>Change</button>
              </div>
            </Field>

            <Field label="Phone Number">
              {userData.phone ? (
                <input readOnly value={userData.phone} style={inputStyle} />
              ) : (
                <button style={linkBtn} onClick={() => setActiveSection('phone')}>Add</button>
              )}
            </Field>

            <div style={{ display: 'flex', justifyContent: 'center', marginTop: 24 }}>
              <button style={primaryBtn}>Save</button>
            </div>
          </>
        );

      case 'email':
        return (
          <>
            <h2 style={heading}>Change Email Address</h2>
            <Field label="New Email Address">
              <input
                value={newEmail}
                onChange={e => setNewEmail(e.target.value)}
                placeholder="Enter your email address"
                style={inputStyle}
              />
            </Field>
            <button style={nextBtn}>Next</button>
          </>
        );

      case 'phone':
        return (
          <>
            <h2 style={heading}>Edit Phone Number</h2>
            <Field label="Add New Phone Number">
              <input
                value={newPhone}
                onChange={e => setNewPhone(e.target.value)}
                placeholder="Enter phone number"
                style={inputStyle}
              />
            </Field>
            <button style={nextBtn}>Next</button>
          </>
        );

      case 'addresses':
        return (
          <>
            <div style={flexBetween}>
              <h2>My Addresses</h2>
              <button onClick={() => setIsAddressModalOpen(true)} style={addBtn}>
                <span style={{ fontSize: 18, marginRight: 6 }}>＋</span>Add New Address
              </button>
            </div>

            {addresses.map((addr, idx) => (
              <div key={idx} style={{ marginBottom: 20 }}>
                <div style={flexBetween}>
                  <div>
                    <strong>{userData.name}</strong> <span>({addr.phone || 'No phone'})</span>
                  </div>
                  <div>
                    <button style={linkBtn}>Edit</button>
                    {addresses.length > 1 && <button style={linkBtn}>Delete</button>}
                  </div>
                </div>
                <div style={{ margin: '8px 0' }}>{addr.street || addr.address}</div>
                <div style={{ color: '#666' }}>{addr.city}, {addr.state} {addr.zipcode}</div>
                {idx < addresses.length - 1 && <hr style={hrStyle} />}
              </div>
            ))}

            {isAddressModalOpen && (
              <div style={modalOverlayStyle}>
                <div style={modalStyle}>
                  <h3>New Address</h3>
                  <input placeholder="Street Address" style={inputStyle} />
                  <input placeholder="City" style={inputStyle} />
                  <input placeholder="State" style={inputStyle} />
                  <input placeholder="Zip Code" style={inputStyle} />
                  <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 10 }}>
                    <button onClick={() => setIsAddressModalOpen(false)}>Cancel</button>
                    <button onClick={addAddress}>Submit</button>
                  </div>
                </div>
              </div>
            )}
          </>
        );

      default:
        return null;
    }
  };

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <Logo />
        <div style={searchContainer}>
          <input placeholder="Search for products, brands and shops" style={searchInput} />
          <button style={searchBtn}>{SearchIcon}</button>
        </div>
        <div style={{ display: 'flex', gap: 12 }}>
          <ShoppingCartButton />
          <AccountButton />
        </div>
      </header>
      <main style={mainStyle}>
        <aside style={{ minWidth: 165 }}>
          <h3 style={{ marginBottom: 24 }}>My Account</h3>
          <ul style={sidebarList}>
            {['profile','banks','addresses','change password','notifications','orders','coupons & vouchers'].map(item => (
              <li
                key={item}
                onClick={() => handleSectionClick(item)}
                style={{
                  padding: '8px 0', cursor: 'pointer', textTransform: 'capitalize',
                  color: activeSection === item ? '#007bff' : '#333',
                  fontWeight: activeSection === item ? 'bold' : 'normal'
                }}
                onMouseEnter={e => e.target.style.color = '#007bff'}
                onMouseLeave={e => activeSection !== item && (e.target.style.color = '#333')}
              >{item}</li>
            ))}
          </ul>
        </aside>
        <section style={contentStyle}>{renderSectionContent()}</section>
      </main>
    </div>
  );
};

export default AccountPage;

// -- Components & Styles --
const Field = ({ label, children }) => (
  <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center' }}>
    <div style={{ width: 180 }}>{label}</div>
    <div style={{ flex: 1 }}>{children}</div>
  </div>
);

const heading = { marginBottom: 24 };
const subheading = { marginBottom: 12 };
const divider = { borderBottom: '1px solid #e0e0e0', marginBottom: 24 };
const inputStyle = { width: '300px', padding: 8, border: '1px solid #ccc', borderRadius: 4 };
const linkBtn = { background: 'none', border: 'none', color: '#007bff', cursor: 'pointer', fontSize: 14 };
const primaryBtn = { padding: '10px 20px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' };
const nextBtn = { marginTop: 20, padding: '10px 20px', backgroundColor: '#f8c1c1', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer' };
const addBtn = { backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: 4, padding: '8px 12px', display: 'flex', alignItems: 'center', cursor: 'pointer' };
const modalOverlayStyle = { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.4)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 };
const modalStyle = { backgroundColor: 'white', padding: 30, borderRadius: 10, width: 400, boxShadow: '0 4px 12px rgba(0,0,0,0.2)' };
const flexBetween = { display: 'flex', justifyContent: 'space-between', alignItems: 'center' };
const hrStyle = { border: 'none', borderTop: '1px solid #e0e0e0', margin: '20px 0' };
const pageStyle = { backgroundColor: '#f2f2f2', minHeight: '100vh' };
const searchContainer = { flex: '0 1 800px', display: 'flex', margin: '0 auto' };
const searchInput = { flex: 1, padding: '8px 12px', fontSize: 16, border: '1px solid #ccc', borderRadius: '4px 0 0 4px' };
const searchBtn = { padding: '8px 12px', backgroundColor: '#007bff', border: '1px solid #007bff', borderRadius: '0 10px 10px 0', cursor: 'pointer' };
const headerStyle = { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 168px 10px 142px', backgroundColor: '#e3f2fd', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' };
const mainStyle = { display: 'flex', padding: '40px 160px', gap: '40px' };
const sidebarList = { listStyle: 'none', padding: 0, margin: 0 };
const contentStyle = { backgroundColor: 'white', padding: 32, borderRadius: 8, boxShadow: '0 4px 12px rgba(0,0,0,0.05)', width: '100%', maxWidth: 920 };
