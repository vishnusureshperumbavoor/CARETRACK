const express = require('express');
const bcrypt = require('bcrypt');
const { User } = require('./models');

const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const existingUser = await User.findOne({ username });

    if (existingUser) {
      return res.json({ success: false, message: 'Username already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username, password: hashedPassword });
    await newUser.save();

    res.json({ success: true, message: 'User registered successfully' });
  } catch (error) {
    console.error('Error during user registration:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (user) {
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (passwordMatch) {
        res.json({ success: true, message: 'Login successful' });
      } else {
        res.json({ success: false, message: 'Invalid credentials' });
      }
    } else {
      res.json({ success: false, message: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error during user login:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
