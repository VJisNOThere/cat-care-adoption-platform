// contentController.js

const Content = require('../models/Content'); 

// Add new content (article/video)
const addContent = async (req, res) => {
  const { title, type, content } = req.body;

  try {
    // Create a new content instance
    const newContent = new Content({
      title,
      type,
      content,
    });

    // Save content to the database
    await newContent.save();

    res.status(201).json({ message: 'Content added successfully', newContent });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Edit existing content
const editContent = async (req, res) => {
  const { id } = req.params;
  const { title, type, content } = req.body;

  try {
    // Find content by ID and update
    const updatedContent = await Content.findByIdAndUpdate(
      id,
      { title, type, content },
      { new: true }
    );

    if (!updatedContent) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json({ message: 'Content updated successfully', updatedContent });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Delete content
const deleteContent = async (req, res) => {
  const { id } = req.params;

  try {
    // Find content by ID and delete
    const deletedContent = await Content.findByIdAndDelete(id);

    if (!deletedContent) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json({ message: 'Content deleted successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get all content
const getAllContent = async (req, res) => {
  try {
    // Find all content and return it
    const allContent = await Content.find();
    res.json(allContent);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Get specific content by ID
const getContentById = async (req, res) => {
  const { id } = req.params;

  try {
    // Find content by ID and return it
    const content = await Content.findById(id);

    if (!content) {
      return res.status(404).json({ message: 'Content not found' });
    }

    res.json(content);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
};

// Export the controller functions for use in routes
module.exports = {
  addContent,
  editContent,
  deleteContent,
  getAllContent,
  getContentById,
};
