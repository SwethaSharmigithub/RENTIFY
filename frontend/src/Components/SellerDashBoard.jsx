import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './SellerDashBoard.css'; // Ensure this matches the correct filename

const SellerDashboard = () => {
  const [properties, setProperties] = useState([]);
  const [newProperty, setNewProperty] = useState({
    title: '',
    description: '',
    price: '',
    location: '',
    bedrooms: '',
    bathrooms: '',
    images: [],
    sellerName: '',
    sellerPhone: '',
    sellerEmail: ''
  });
  const [editingProperty, setEditingProperty] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [showProperties, setShowProperties] = useState(false);

  useEffect(() => {
    loadSellerInfo();
    fetchProperties(); // Fetch properties on component mount
  }, []);

  const loadSellerInfo = () => {
    const sellerName = localStorage.getItem('name');
    const sellerPhone = localStorage.getItem('phoneno');
    const sellerEmail = localStorage.getItem('email');
    setNewProperty(prevState => ({
      ...prevState,
      sellerName,
      sellerPhone,
      sellerEmail
    }));
  };

  const fetchProperties = async () => {
    try {
      const response = await axios.get('http://localhost:5001/api/properties');
      setProperties(response.data);
      setShowProperties(true);
    } catch (error) {
      alert('Error fetching properties.');
      console.error('Error fetching properties:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProperty({ ...newProperty, [name]: value });
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const fileUrls = files.map(file => URL.createObjectURL(file));
    setNewProperty({ ...newProperty, images: [...newProperty.images, ...fileUrls] });
  };

  const addProperty = async () => {
    try {
      await axios.post('http://localhost:5001/api/properties/create', newProperty);
      alert('Property added successfully.');
      resetForm();
      fetchProperties();
    } catch (error) {
      alert('Error adding property.');
      console.error('Error adding property:', error);
    }
  };

  const updateProperty = async () => {
    if (!editingProperty) return;
    try {
      await axios.put(`http://localhost:5001/api/properties/${editingProperty._id}`, newProperty);
      alert('Property updated successfully.');
      resetForm();
      fetchProperties();
    } catch (error) {
      alert('Error updating property.');
      console.error('Error updating property:', error);
    }
  };

  const editProperty = (property) => {
    setEditingProperty(property);
    setNewProperty(property);
    setShowForm(true);
  };

  const deleteProperty = async (id) => {
    try {
      await axios.delete(`http://localhost:5001/api/properties/${id}`);
      alert('Property deleted successfully.');
      fetchProperties();
    } catch (error) {
      alert('Error deleting property.');
      console.error('Error deleting property:', error);
    }
  };

  const resetForm = () => {
    setNewProperty({
      title: '',
      description: '',
      price: '',
      location: '',
      bedrooms: '',
      bathrooms: '',
      images: [],
      sellerName: '',
      sellerPhone: '',
      sellerEmail: ''
    });
    setEditingProperty(null);
    setShowForm(false);
  };

  return (
    <div className="seller-dashboard">
      <h1>Seller Dashboard</h1>
      <button onClick={() => setShowProperties(!showProperties)}>
        {showProperties ? 'Hide Properties' : 'View Properties'}
      </button>
      <button onClick={() => setShowForm(!showForm)}>
        {showForm ? 'Cancel' : 'Add Property'}
      </button>
      {showForm && (
        <div className="property-form">
          <h2>{editingProperty ? 'Edit Property' : 'Add Property'}</h2>
          <form onSubmit={(e) => { e.preventDefault(); editingProperty ? updateProperty() : addProperty(); }}>
            <input type="text" name="title" value={newProperty.title} onChange={handleChange} placeholder="Title" />
            <textarea name="description" value={newProperty.description} onChange={handleChange} placeholder="Description" />
            <input type="number" name="price" value={newProperty.price} onChange={handleChange} placeholder="Price" />
            <input type="text" name="location" value={newProperty.location} onChange={handleChange} placeholder="Location" />
            <input type="number" name="bedrooms" value={newProperty.bedrooms} onChange={handleChange} placeholder="Bedrooms" />
            <input type="number" name="bathrooms" value={newProperty.bathrooms} onChange={handleChange} placeholder="Bathrooms" />
            <input type="file" multiple onChange={handleFileChange} />
            {newProperty.images && newProperty.images.map((img, index) => (
              <img key={index} src={img} alt={`Preview ${index}`} style={{ width: '100px', height: '100px' }} />
            ))}
            <button type="submit">{editingProperty ? 'Update Property' : 'Add Property'}</button>
            <button type="button" onClick={resetForm}>Cancel</button>
          </form>
        </div>
      )}
      {showProperties && (
        <div className="properties-list">
          {properties.map(property => (
            <div key={property._id} className="property-item">
              <h2>{property.title}</h2>
              <p>{property.description}</p>
              <p>Price: {property.price}</p>
              <p>Location: {property.location}</p>
              <p>Bedrooms: {property.bedrooms}</p>
              <p>Bathrooms: {property.bathrooms}</p>
              <button onClick={() => editProperty(property)}>Edit</button>
              <button onClick={() => deleteProperty(property._id)}>Delete</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerDashboard;
