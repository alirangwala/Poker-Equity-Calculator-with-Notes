const express = require('express');
const app = express();
const PORT = 3000;
const mongoose = require('mongoose');
const userRouter = require('../database/controllers/users.js')
const notesRouter = require('../database/controllers/notes.js')

app.use(express.static('../client/dist')); // Host your dist folder up to the server
app.use(express.json()); // Alternative to BodyParser

mongoose.connect('mongodb://localhost/notes', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  createIndexes: true
});

const db = mongoose.connection;

db.on('error', () => {
  console.log('mongoose connection error');
});

db.once('open', () => {
  console.log('mongoose connected successfully');
});

app.use('/users', userRouter)
app.use('/notes', notesRouter)

// // If you had to handle requests on the server side, this is where that would occur
// app.get('/notes/:id', (req, res) => {
//   // Handle the request
//   // -- Could make DB queries here
//   // Send back O-K
//   res.status(200).send('The server is taking requests to the products/:id endpoint');
// });

// Listening for requests on the PORT
app.listen(PORT, () => {
  console.log('Serving up now at ' + JSON.stringify(PORT))
});

module.exports = db;
