const validateUser = (req, res, next) => {
  const { name, age, interests, profilePhoto } = req.body;

  if (!name || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required and must be a non-empty string' });
  }
  if (!age || typeof age !== 'number' || age < 18) {
    return res.status(400).json({ error: 'Age is required and must be a number >= 18' });
  }
  if (!interests || !Array.isArray(interests) || interests.length === 0) {
    return res.status(400).json({ error: 'Interests must be a non-empty array' });
  }
  if (profilePhoto && typeof profilePhoto !== 'string') {
    return res.status(400).json({ error: 'Profile photo must be a string (base64)' });
  }

  next();
};

module.exports = validateUser;