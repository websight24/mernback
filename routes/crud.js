// routes/crud.js
const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware');
const Resource = require('../models/resource'); // Assuming you have a model named 'Resource' for the CRUD operations

// Example CRUD routes with authentication middleware
router.get('/resources', authMiddleware, async (req, res) => {
    try {
      // Fetch all resources from the database
      const resources = await Resource.find();
  
      res.status(200).json(resources);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });

router.post('/resources', authMiddleware, async (req, res) => {
    try {
      const { name, description } = req.body;
      const newResource = new Resource({
        name,
        description,
        createdBy: req.user, // Set the createdBy field to the authenticated user's ID
      });
  
      await newResource.save();
  
      res.status(201).json({ message: 'Resource created successfully', resource: newResource });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

  router.put('/resources/:id', authMiddleware, async (req, res) => {
    try {
      const resourceId = req.params.id;
      const { name, description } = req.body;
  
      // Find the resource by its ID and the createdBy field
      const resource = await Resource.findOne({
        _id: resourceId,
        createdBy: req.user,
      });
  
      if (!resource) {
        return res.status(404).json({ message: 'Resource not found' });
      }
  
      // Update the resource properties
      resource.name = name;
      resource.description = description;
  
      await resource.save();
  
      res.status(200).json({ message: 'Resource updated successfully', resource });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

  router.delete('/resources/:id', authMiddleware, async (req, res) => {
    try {
      const resourceId = req.params.id;
  
      // Find the resource by its ID and the createdBy field
      const resource = await Resource.findOne({
        _id: resourceId,
        createdBy: req.user,
      });
  
      if (!resource) {
        return res.status(404).json({ message: 'Resource not found' });
      }
  
      // Delete the resource
      await resource.deleteOne();
  
      res.status(200).json({ message: 'Resource deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  });
  

module.exports = router;
