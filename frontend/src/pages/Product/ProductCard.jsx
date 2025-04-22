/* src/components/ProductCard.jsx */
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ProductCard = ({ product_id, product_title, product_price, product_images }) => {
  const navigate = useNavigate();
  // Safely grab first image
  const imgSrc = Array.isArray(product_images) && product_images.length > 0
    ? product_images[0]
    : '';

  return (
    <div
      onClick={() => navigate(`/product/${product_id}`)}
      style={{ ...cardStyle, cursor: 'pointer' }}
    >
      {imgSrc && <img src={imgSrc} alt={product_title} style={imageStyle} />}
      <h3 style={nameStyle}>{product_title}</h3>
      <p style={priceStyle}>${product_price}</p>
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
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)'  
};

const imageStyle = {
  width: '100%',
  height: '140px',
  objectFit: 'cover',
  borderRadius: '8px'
};

const nameStyle = {
  fontSize: '16px',
  margin: '10px 0 5px'
};

const priceStyle = {
  fontSize: '14px',
  color: '#333'
};

export default ProductCard;
