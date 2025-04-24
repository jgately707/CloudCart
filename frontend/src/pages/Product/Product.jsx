// src/pages/Product/Product.jsx
import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Logo from '../../components/Logo';
import ShoppingCartButton from '../../components/ShoppingCartButton';
import AccountButton from '../../components/AccountButton';

const SearchIcon = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="11" cy="11" r="7" stroke="#555" strokeWidth="2" />
    <line x1="16.6569" y1="16.6569" x2="22" y2="22" stroke="#555" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const headerStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: '10px 168px 10px 142px',
  backgroundColor: '#e3f2fd',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
};
const searchWrapperStyle = {
  flex: '0 1 800px',
  display: 'flex',
  margin: '0 auto',
};
const inputStyle = {
  flex: 1,
  padding: '8px 12px',
  fontSize: '14px',
  border: '1px solid #ccc',
  borderRadius: '4px 0 0 4px',
  outline: 'none',
};
const searchButtonStyle = {
  padding: '8px',
  backgroundColor: '#007bff',
  border: '1px solid #007bff',
  borderRadius: '0 4px 4px 0',
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

const mainCardStyle = {
  margin: '40px auto',
  padding: '0',
  maxWidth: 1000,
  backgroundColor: '#fff',
  borderRadius: 8,
  boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
  fontFamily: 'Arial, Helvetica, sans-serif',
  color: '#111',
};

const contentRowStyle = {
  display: 'flex',
  flexWrap: 'wrap',
};

const imageContainerStyle = {
  flex: '1 1 400px',
  padding: 20,
};

const imageStyle = {
  width: '100%',
  height: 'auto',
  objectFit: 'contain',
  borderRadius: 8,
};

const detailsStyle = {
  flex: '1 1 400px',
  padding: '20px 40px',
  display: 'flex',
  flexDirection: 'column',
};

const titleStyle = {
  fontSize: '24px',
  fontWeight: 600,
  marginBottom: '16px',
};

const descStyle = {
  fontSize: '16px',
  lineHeight: 1.5,
  marginBottom: '24px',
};

const priceStyle = {
  fontSize: '22px',
  fontWeight: 700,
  color: '#007bff', // switch price to your blue too if desired
  marginBottom: '16px',
};

const addToCartButtonStyle = {
  padding: '12px 24px',
  fontSize: '16px',
  backgroundColor: '#007bff',    // your blue
  color: '#fff',
  border: '1px solid #007bff',
  borderRadius: 4,
  cursor: 'pointer',
  fontWeight: 600,
  marginBottom: '32px',
};

const sectionTitleStyle = {
  fontSize: '20px',
  fontWeight: 600,
  margin: '24px 0 12px',
};

const gridStyle = {
  display: 'grid',
  gridTemplateColumns: '150px 1fr',
  rowGap: '12px',
};

export default function Product() {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [shipping, setShipping] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(`/api/product/details?productId=${productId}`, {
      credentials: 'include',
    })
      .then(res => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then(data => {
        setProduct(data.product);
        setShipping(data.shipping);
      })
      .catch(err => setError(err.message));
  }, [productId]);

  return (
    <div style={{ backgroundColor: '#eaeaea', minHeight: '100vh' }}>
      {/* Header */}
      <header style={headerStyle}>
        <Logo
          onClick={() => navigate('/home')}
          style={{ cursor: 'pointer', height: 32 }}
        />
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
        <div style={actionButtonsStyle}>
          <ShoppingCartButton />
          <AccountButton onClick={() => navigate('/account')} />
        </div>
      </header>

      {/* Main card */}
      <div style={mainCardStyle}>
        {!product && !error && (
          <div style={{ padding: 40, fontSize: 18 }}>Loading…</div>
        )}
        {error && (
          <div style={{ padding: 40, color: 'red', fontSize: 18 }}>
            Error: {error}
          </div>
        )}
        {product && (
          <div style={contentRowStyle}>
            {/* Image */}
            <div style={imageContainerStyle}>
              <img
                src={product.product_images[0]}
                alt={product.product_title}
                style={imageStyle}
              />
            </div>

            {/* Details */}
            <div style={detailsStyle}>
              <h1 style={titleStyle}>{product.product_title}</h1>
              <p style={descStyle}>{product.product_description}</p>
              <div style={priceStyle}>${product.product_price}</div>
              <button
                style={addToCartButtonStyle}
                onClick={() => alert('Added to cart!')}
              >
                Add to Cart
              </button>

              <div style={sectionTitleStyle}>Shipping Info</div>
              {shipping ? (
                <div style={gridStyle}>
                  <div>Closest Zip:</div>
                  <div>{shipping.closestDistributorZip}</div>
                  <div>Distance:</div>
                  <div>{shipping.distanceKm} km</div>
                  <div>Cost:</div>
                  <div>${shipping.cost}</div>
                  <div>ETA:</div>
                  <div>
                    {shipping.estimatedDelivery.date} (
                    {shipping.estimatedDelivery.days} days)
                  </div>
                </div>
              ) : (
                <div>Loading shipping…</div>
              )}

              <div style={sectionTitleStyle}>Reviews</div>
              <div style={{ fontStyle: 'italic', color: '#555' }}>
                No reviews yet. Be the first to review!
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
