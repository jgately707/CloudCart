import React from 'react';

const ProductCard = ({ name, price, image }) => {
  return (
    <div style={cardStyle}>
      <img src={image} alt={name} style={imageStyle} />
      <h3 style={nameStyle}>{name}</h3>
      <p style={priceStyle}>${price}</p>
    </div>
  );
};

const cardStyle = {
  width: '180px',
  padding: '10px',
  border: '1px solid #ccc',
  borderRadius: '10px',
  backgroundColor: '#fff',
  textAlign: 'center',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
};

const imageStyle = {
  width: '100%',
  height: '140px',
  objectFit: 'cover',
  borderRadius: '8px',
};

const nameStyle = {
  fontSize: '16px',
  margin: '10px 0 5px 0',
};

const priceStyle = {
  fontSize: '14px',
  color: '#333',
};

export default ProductCard;


