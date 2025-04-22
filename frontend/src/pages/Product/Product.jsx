// src/pages/Product/Product.jsx
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Product() {
  const { productId } = useParams();
  const [product, setProduct]   = useState(null);
  const [shipping, setShipping] = useState(null);
  const [error, setError]       = useState('');

  useEffect(() => {
    fetch(`/api/product/details?productId=${productId}`, {
      credentials: 'include'
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

  if (error) {
    return <div style={{ padding: 20, color: 'red' }}>Error: {error}</div>;
  }

  if (!product) {
    return <div style={{ padding: 20 }}>Loading…</div>;
  }

  return (
    <div style={{ padding: 20, fontFamily: 'sans-serif' }}>
      <h1>{product.product_title}</h1>
      {product.product_images?.[0] && (
        <img
          src={product.product_images[0]}
          alt={product.product_title}
          style={{ maxWidth: 400, display: 'block', marginBottom: 20 }}
        />
      )}
      <p>{product.product_description}</p>
      <p>
        <strong>Price:</strong> ${product.product_price}
      </p>

      <h2>Shipping Info</h2>
      {shipping ? (
        <>
          <p>
            <strong>Closest Zip:</strong> {shipping.closestDistributorZip}
          </p>
          <p>
            <strong>Distance:</strong> {shipping.distanceKm} km
          </p>
          <p>
            <strong>Cost:</strong> ${shipping.cost}
          </p>
          <p>
            <strong>ETA:</strong>{' '}
            {shipping.estimatedDelivery.date} (
            {shipping.estimatedDelivery.days} days)
          </p>
        </>
      ) : (
        <p>Loading shipping…</p>
      )}
    </div>
  );
}
