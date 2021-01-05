const express = require('express');
const router = express.Router();
const User = require('../models/users.js');

router.get('/', async (req, res) => {
  try {
    let users = await User.find();
    res.json(users)
  }
  catch (err) {
    res.status(400).json('Error: ' + err)
  }
})

router.post('/add', async (req, res) => {
  try {
    let userObject = {
      email: req.body.email,
      username: req.body.username
    }
    let newUser = await new User(userObject).save()
    res.json('User Added!')
  }
  catch (err) {
    res.status(400).json('Error: ' + err)
  }
})

// router.post('/add', (req, res) => {

//   const email = req.body.email;
//   const username = req.body.username;

//   const newUser = new User({ email, username })

//   newUser.save()
//     .then(() => res.json('User Added!'))
//     .catch(err => res.status(400).json('Error: ' + err))
// })

module.exports = router;