/**
 * Title: todo handeler
 * date: 4.03.21
 */

const express = require('express');
const mongoose = require('mongoose');

const router = express.Router();
const todoSchema = require('../modal/todoSchema');
const userSchema = require('../modal/userSchema');

// middleware to protect
const checkLogin = require('../middleware/checkLogin');

// ?make modal todo
// eslint-disable-next-line new-cap
const Todo = new mongoose.model('Todo', todoSchema);
// eslint-disable-next-line new-cap
const User = new mongoose.model('User', userSchema);

// get todo list to condition
router.get('/', checkLogin, (req, res) => {
  console.log(req.username);
  console.log(req.userid);
  Todo.find({ status: 'active' })
    .populate('user', 'name username -_id') // ? user er shate relation make kore
    .select({
      _id: 0,
      __v: 0,
      date: 0,
    })
    .limit(2)
    .exec((err, todo) => {
      if (!err) {
        res.status(200).json({
          result: todo,
        });
      } else {
        res.status(500).json({ error: 'there is a server side error' });
      }
    });
});

// get a todp by id
router.get('/:id', async (req, res) => {
  await Todo.find({ _id: req.params.id }, (err, todo) => {
    if (!err) {
      res.status(200).json({
        result: todo,
      });
    } else {
      res.status(500).json({ error: 'there is a server side error' });
    }
  });
});

// post todo
router.post('/', checkLogin, async (req, res) => {
  try {
    const newTodo = new Todo({ ...req.body, user: req.userid });
    const todo = await newTodo.save();
    await User.updateOne(
      {
        _id: req.userid,
      },
      {
        $push: {
          todos: todo._id,
        },
      }
    );

    res.status(200).json({
      message: 'Todo wase inserted Successfully',
    });
  } catch (error) {
    res.status(500).json({ error: 'there is a server side error' });
  }
});

// post multiple todo
router.post('/all', async (req, res) => {
  await Todo.insertMany(req.body, (err) => {
    if (!err) {
      res.status(200).json({
        message: 'Todo were inserted Successfully',
      });
    } else {
      res.status(500).json({ error: 'there is a server side error' });
    }
  });
});

// find by update and id
router.put('/:id', async (req, res) => {
  try {
    const result = await Todo.findByIdAndUpdate(
      { _id: req.params.id },
      {
        $set: {
          status: req.body.status,
        },
      },
      {
        useFindAndModify: false,
        new: true,
      }
    );
    res.status(200).json({
      result,
      message: 'Todo was update Successfully',
    });
  } catch (err) {
    res.status(500).json({ error: 'there is a server side error', err });
  }
});

// delete todo
router.delete('/:id', (req, res) => {
  Todo.deleteOne({ _id: req.params.id }, (err) => {
    if (!err) {
      res.status(200).json({
        message: 'Todo was deleted Successfully',
      });
    } else {
      res.status(500).json({ error: 'there is a server side error' });
    }
  });
});

module.exports = router;
