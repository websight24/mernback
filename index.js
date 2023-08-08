const express = require('express');
const app = express();
const db = require('./db');
const authRoutes = require('./routes/auth');
const crudRoutes = require('./routes/crud');
const cors = require('cors');

// Middleware to parse JSON data
app.use(express.json());
app.use(cors());
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/crud', crudRoutes); // Use the CRUD routes with authentication middleware

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
