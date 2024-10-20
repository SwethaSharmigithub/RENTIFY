const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

// Create a new property
router.post('/create', async (req, res) => {
  try {
    console.log('Received data:', req.body);  // Debugging line
    const property = new Property(req.body);
    await property.save();
    res.status(201).send(property);
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(400).send('Error creating property');
  }
});

// Get all properties
router.get('/', async (req, res) => {
  try {
    const properties = await Property.find();
    res.status(200).send(properties);
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).send('Error fetching properties');
  }
});

// Update a property
router.put('/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!property) return res.status(404).send('Property not found');
    res.status(200).send(property);
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(400).send('Error updating property');
  }
});

// Delete a property
router.delete('/:id', async (req, res) => {
  try {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) return res.status(404).send('Property not found');
    res.status(200).send('Property deleted');
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).send('Error deleting property');
  }
});

// routes/propertyRoutes.js

// routes/propertyRoutes.js

router.post('/interested', async (req, res) => {
  try {
    const { propertyId } = req.body;
    const property = await Property.findById(propertyId).populate('sellerId'); // Assuming `sellerId` is a reference to the Seller model

    if (!property) return res.status(404).send('Property not found');

    // Return the seller details along with any other necessary information
    const seller = property.sellerId; // Or adjust according to your schema

    res.status(200).send({
      name: seller.name,
      phone: seller.phone,
      email: seller.email,
    });
  } catch (error) {
    console.error('Error expressing interest:', error);
    res.status(500).send('Error expressing interest');
  }
});


module.exports = router;
