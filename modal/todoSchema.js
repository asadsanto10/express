const mongoose = require('mongoose');

// create to do schema

const todoSchema = mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  status: {
    type: String,
    enum: ['active', 'inactive'],
  },
  date: {
    type: Date,
    default: Date.now,
  },

  user: {
    type: mongoose.Types.ObjectId, // mongoose id type
    ref: 'User',
  },
});

module.exports = todoSchema;
