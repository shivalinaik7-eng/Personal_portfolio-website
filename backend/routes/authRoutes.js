const express = require('express');

const router = express.Router();

const {
  User
} = require('../models');

router.post('/', async (req, res) => {
  try {
    const {
      email,
      password
    } = req.body;

    const user = await User.findOne({
      where: {
        email
      }
    });

    if (!user || user.password !== password) {
      return res.status(401).json({
        message: 'Invalid email or password.'
      });
    }

    res.json({
      message: 'Login successful.',
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch (error) {
    res.status(500).json({
      message: 'Unable to login.',
      error: error.message
    });
  }
});

module.exports = router;