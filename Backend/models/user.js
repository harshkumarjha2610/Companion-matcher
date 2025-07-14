const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  age: { type: Number, required: true, min: 18 },
  interests: [{ type: String, required: true }],
  profilePhoto: String,
  gmailId: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  shortlisted: [{ type: String }]
});

module.exports = mongoose.model('User', userSchema);