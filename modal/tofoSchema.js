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
});

// !instance method
todoSchema.methods = {
  findActive() {
    return mongoose.model('Todo').find({ status: 'active' });
  },
  findActiveCallBack(cb) {
    return mongoose.model('Todo').find({ status: 'active' }, cb);
  },
};

// ! static method
todoSchema.statics = {
  findByJs() {
    return this.find({ title: /js/i });
  },
};

// ! query helper

todoSchema.query = {
  byLanguage(language) {
    return this.find({ title: new RegExp(language, 'i') });
  },
};

module.exports = todoSchema;
