const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const routes = require('./routes');

// Initialize express app
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());  // Enable CORS for all routes
app.use(bodyParser.json());  // Parse JSON request bodies
app.use(morgan('dev'));  // HTTP request logger

// Welcome route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API Server',
    endpoints: {
      getAll: 'GET /api/items',
      getOne: 'GET /api/items/:id',
      create: 'POST /api/items',
      update: 'PUT /api/items/:id',
      delete: 'DELETE /api/items/:id'
    }
  });
});

// API routes
app.use('/api', routes);

// Start server
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API Server running on http://0.0.0.0:${PORT}`);
});