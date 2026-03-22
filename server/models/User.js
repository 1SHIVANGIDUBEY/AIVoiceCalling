const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  jobId:       { type: String, required: true },
  name:        { type: String, required: true },
  designation: { type: String, required: true },
  username:    { type: String, required: true, unique: true, trim: true },
  password:    { type: String, required: true, minlength: 6 }
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);