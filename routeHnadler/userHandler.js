const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../modal/userSchema');

// eslint-disable-next-line new-cap
const User = new mongoose.model('User', userSchema);

const router = express.Router();

// signup
router.post('/signup', async (req, res) => {
  try {
    const { name, username, password, status } = req.body;
    console.log(req.body);
    // happ password
    const genSalt = await bcrypt.genSalt(10);
    const hassPassword = await bcrypt.hash(password, genSalt);

    const newUser = new User({
      name,
      username,
      password: hassPassword,
      status,
    });
    await newUser.save();
    res.status(200).json({ message: 'user create sucessfully' });
  } catch (error) {
    res.status(500).json({ error: 'there is a server side error' });
  }
});

// login

router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (user) {
      // password check match to database
      const checkPassword = await bcrypt.compare(password, user.password);

      if (checkPassword) {
        const token = jwt.sign(
          {
            username: user.username,
            userId: user._id,
          },
          process.env.secretkeytoken,
          {
            expiresIn: '1h',
          }
        );

        res.status(200).json({ message: 'user Login sucessfully', token });
      } else {
        res.status(401).json({ error: 'Authentication failed' });
      }
    } else {
      res.status(401).json({ error: 'Authentication failed' });
    }
  } catch (error) {
    res.status(500).json({ error: `there is a server side error ${error}` });
  }
});

// get all user

router.get('/all', async (req, res) => {
  try {
    const user = await User.find({ status: 'active' }).populate('todos');
    res.status(200).json({ message: 'sucess', user });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: `there is a server side error ${error}` });
  }
});

module.exports = router;
