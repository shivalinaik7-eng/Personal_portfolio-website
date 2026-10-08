const express = require('express');

const router = express.Router();

const {
  ContactMessage
} = require('../models');

// CREATE contact message
router.post('/', async (req, res) => {
  try {
    const {
      name,
      email,
      subject,
      message
    } = req.body;

    const contactMessage =
      await ContactMessage.create({
        name,
        email,
        subject,
        message
      });

    res.status(201).json({
      message: 'Message sent successfully.',
      contactMessage
    });
  } catch (error) {
    res.status(400).json({
      message: 'Unable to send message.',
      error: error.message
    });
  }
});

// READ contact messages
router.get('/', async (req, res) => {
  try {
    const messages =
      await ContactMessage.findAll({
        order: [
          ['createdAt', 'DESC']
        ]
      });

    res.json(messages);
  } catch (error) {
    res.status(500).json({
      message: 'Unable to fetch messages.',
      error: error.message
    });
  }
});

module.exports = router;