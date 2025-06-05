const express = require('express');
const router = express.Router();
const dataStore = require('./data');

// GET all items
router.get('/items', (req, res) => {
  const items = dataStore.getAll();
  res.json({
    success: true,
    count: items.length,
    data: items
  });
});

// GET a single item
router.get('/items/:id', (req, res) => {
  const item = dataStore.getById(req.params.id);
  
  if (!item) {
    return res.status(404).json({
      success: false,
      message: `Item with id ${req.params.id} not found`
    });
  }
  
  res.json({
    success: true,
    data: item
  });
});

// CREATE a new item
router.post('/items', (req, res) => {
  // Simple validation
  if (!req.body.name) {
    return res.status(400).json({
      success: false,
      message: 'Please provide a name'
    });
  }
  
  const newItem = dataStore.create(req.body);
  
  res.status(201).json({
    success: true,
    data: newItem
  });
});

// UPDATE an item
router.put('/items/:id', (req, res) => {
  const updatedItem = dataStore.update(req.params.id, req.body);
  
  if (!updatedItem) {
    return res.status(404).json({
      success: false,
      message: `Item with id ${req.params.id} not found`
    });
  }
  
  res.json({
    success: true,
    data: updatedItem
  });
});

// DELETE an item
router.delete('/items/:id', (req, res) => {
  const deletedItem = dataStore.delete(req.params.id);
  
  if (!deletedItem) {
    return res.status(404).json({
      success: false,
      message: `Item with id ${req.params.id} not found`
    });
  }
  
  res.json({
    success: true,
    data: deletedItem
  });
});

module.exports = router;