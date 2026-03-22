const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// in server/routes/auth.js
const protect = require('../middleware/authMiddleware');

router.get('/me', protect, async (req, res) => {
  const user = await User.findById(req.userId).select('-password');
  res.json(user);
});

//Register
router.post('/register', async (req, res) => {
  try {
    const { jobId, name, designation, username, password } = req.body;

    // 1. Check all fields are present
    if (!jobId || !name || !designation || !username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // 2. Check if username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already taken' });
    }

    // 3. Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 4. Save to DB
    const user = await User.create({
      jobId, name, designation, username, password: hashedPassword
    });

    // 5. Sign JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 6. Send as httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(201).json({ message: 'Registered successfully', username: user.username });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

//Login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // 1. Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 2. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Sign JWT
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    // 4. Send as httpOnly cookie
    res.cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.json({ message: 'Logged in successfully', username: user.username });

  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

//Logout
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;