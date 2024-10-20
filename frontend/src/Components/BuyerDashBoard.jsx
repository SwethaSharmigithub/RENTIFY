import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './BuyerDashBoard.css';

const Buyerdashboard = () => {
  const [properties, setProperties] = useState([]);
  const [likedProperties, setLikedProperties] = useState(new Set());
  const [sellerDetails, setSellerDetails] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    } else {
      fetchProperties(token);
    }
  }, [navigate]);

  const fetchProperties = async (token) => {
    try {
      const response = await axios.get('http://localhost:5001/api/properties', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProperties(response.data);
    } catch (error) {
      console.error('Error fetching properties:', error.response ? error.response.data : error.message);
    }
  };

  const handleLike = (propertyId) => {
    setProperties((prevProperties) =>
      prevProperties.map((property) =>
        property._id === propertyId
          ? { ...property, likes: (property.likes || 0) + 1 }
          : property
      )
    );
    setLikedProperties((prev) => new Set(prev).add(propertyId));
  };

  const expressInterest = (property) => {
    // Set seller details from the selected property
    setSellerDetails({
      name: property.sellerName,
      email: property.sellerEmail,
      phone: property.sellerPhone,
    });
  };

  return (
    <div className="buyer-dashboard">
      <h1>Properties</h1>
      <div className="property-list">
        {properties.length ? properties.map((property) => (
          <div key={property._id} className="property-item">
            <h2>{property.title}</h2>
            <p>{property.description}</p>
            <p>Price: ${property.price}</p>
            <p>Location: {property.location}</p>
            <p>Bedrooms: {property.bedrooms}</p>
            <p>Bathrooms: {property.bathrooms}</p>
            {property.images && property.images.map((image, index) => (
              <img key={index} src={image} alt={`Property ${index}`} className="property-image" />
            ))}
            <button onClick={() => handleLike(property._id)}>
              {likedProperties.has(property._id) ? 'Liked' : 'Like'} ({property.likes || 0})
            </button>
            <button onClick={() => expressInterest(property)}>I'm Interested</button>
          </div>
        )) : <p>No properties available</p>}
      </div>
      {sellerDetails && (
        <div className="seller-details">
          <h2>Seller Information</h2>
          <p>Name: {sellerDetails.name}</p>
          <p>Phone: {sellerDetails.phone}</p>
          <p>Email: {sellerDetails.email}</p>
        </div>
      )}
    </div>
  );
};

export default Buyerdashboard;
