const testItems = require('./testData');

// Simple in-memory data store with initial data
let items = [];
let nextId = 1;

// Initialize with test data
testItems.forEach(item => {
  items.push({
    id: nextId++,
    ...item,
    createdAt: new Date().toISOString()
  });
});

// Data access functions
const dataStore = {
  // Get all items
  getAll: () => {
    return [...items]; // Return a copy to prevent direct manipulation
  },
  
  // Get a single item by ID
  getById: (id) => {
    return items.find(item => item.id === parseInt(id));
  },
  
  // Create a new item
  create: (data) => {
    const newItem = {
      id: nextId++,
      ...data,
      createdAt: new Date().toISOString()
    };
    items.push(newItem);
    return newItem;
  },
  
  // Update an existing item
  update: (id, data) => {
    const index = items.findIndex(item => item.id === parseInt(id));
    if (index === -1) return null;
    
    const updatedItem = {
      ...items[index],
      ...data,
      updatedAt: new Date().toISOString()
    };
    
    items[index] = updatedItem;
    return updatedItem;
  },
  
  // Delete an item
  delete: (id) => {
    const index = items.findIndex(item => item.id === parseInt(id));
    if (index === -1) return null;
    
    const deletedItem = items[index];
    items = items.filter(item => item.id !== parseInt(id));
    return deletedItem;
  }
};

module.exports = dataStore;