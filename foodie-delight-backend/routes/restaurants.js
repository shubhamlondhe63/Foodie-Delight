const express = require('express');
const router = express.Router();
const Restaurant = require('../models/restaurant');

// Get all restaurants
router.get('/', async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get one restaurant
router.get('/:id', getRestaurant, (req, res) => {
  res.json(res.restaurant);
});

// Create a restaurant
router.post('/', async (req, res) => {
  const restaurant = new Restaurant({
    name: req.body.name,
    description: req.body.description,
    location: req.body.location
  });

  try {
    const newRestaurant = await restaurant.save();
    res.status(201).json(newRestaurant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a restaurant
router.put('/:id', getRestaurant, async (req, res) => {
  if (req.body.name != null) {
    res.restaurant.name = req.body.name;
  }
  if (req.body.description != null) {
    res.restaurant.description = req.body.description;
  }
  if (req.body.location != null) {
    res.restaurant.location = req.body.location;
  }

  try {
    const updatedRestaurant = await res.restaurant.save();
    res.json(updatedRestaurant);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a restaurant
router.delete('/:id', getRestaurant, async (req, res) => {
  try {
    await res.restaurant.remove();
    res.json({ message: 'Deleted Restaurant' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Middleware function to get a restaurant by ID
async function getRestaurant(req, res, next) {
  let restaurant;
  try {
    restaurant = await Restaurant.findById(req.params.id);
    if (restaurant == null) {
      return res.status(404).json({ message: 'Cannot find restaurant' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  res.restaurant = restaurant;
  next();
}

module.exports = router;
