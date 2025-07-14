const User = require('../Models/user');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res) => {
  try {
    const { name, age, interests, profilePhoto, gmailId, password } = req.body;

    // Validate required fields
    if (!name || !age || !interests || !interests.length || !gmailId || !password) {
      return res.status(400).json({ error: 'All fields are required, including at least one interest' });
    }

    // Validate age
    if (isNaN(Number(age)) || Number(age) < 18) {
      return res.status(400).json({ error: 'Age must be a number and at least 18' });
    }

    // Check for existing user by name or gmailId
    const existingUser = await User.findOne({ $or: [{ name }, { gmailId }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Username or Gmail ID already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = new User({
      name,
      age: Number(age),
      interests,
      profilePhoto,
      gmailId,
      password: hashedPassword,
      shortlisted: []
    });

    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ error: 'Server error during registration' });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const { gmailId, password } = req.body;

    // Validate required fields
    if (!gmailId || !password) {
      return res.status(400).json({ error: 'Gmail ID and password are required' });
    }

    // Find user by gmailId
    const user = await User.findOne({ gmailId });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Return user details (exclude password for security)
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ message: 'Login successful', user: userWithoutPassword });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Server error during login' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { name } = req.query; // Assuming name is used to identify the user (from AsyncStorage)
    if (!name) {
      return res.status(400).json({ error: 'User name is required' });
    }

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Exclude password from response
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(200).json(userWithoutPassword);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error while fetching user' });
  }
};

exports.updateShortlisted = async (req, res) => {
  try {
    const { name, shortlistedUser } = req.body;
    if (!name || !shortlistedUser) {
      return res.status(400).json({ error: 'User name and shortlisted user are required' });
    }

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Add or remove shortlisted user (toggle logic)
    const shortlistedIndex = user.shortlisted.indexOf(shortlistedUser);
    if (shortlistedIndex === -1) {
      user.shortlisted.push(shortlistedUser);
    } else {
      user.shortlisted.splice(shortlistedIndex, 1);
    }

    await user.save();
    const { password: _, ...userWithoutPassword } = user.toObject();
    res.status(200).json({ message: 'Shortlisted updated', user: userWithoutPassword });
  } catch (error) {
    console.error('Update shortlisted error:', error);
    res.status(500).json({ error: 'Server error while updating shortlisted' });
  }
};