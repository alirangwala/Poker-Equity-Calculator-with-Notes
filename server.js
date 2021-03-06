const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path')
const mongoose = require('mongoose');
const userRouter = require('./database/controllers/users.js')
const notesRouter = require('./database/controllers/notes.js')
require("dotenv").config()
const { auth } = require('express-openid-connect');

// app.use(
//   auth({
//     authRequired: false,
//     auth0Logout: true,
//     issuerBaseURL: process.env.ISSUER_BASE_URL,
//     baseURL: process.env.BASE_URL,
//     clientID: process.env.CLIENT_ID,
//     secret: process.env.SECRET
//   })
// );

// app.get('/', (req, res) => {
//   res.send(req.oidc.isAuthenticated() ? 'Logged In' : 'Logged Out');
// })

// app.get('/profile', requiresAuth(), (req, res) => {
//   res.send(JSON.stringify(req.oidc.user));
// });

// app.use(express.static('./client/dist')); // Host your dist folder up to the server
app.use(express.static(path.join(__dirname, 'client', 'dist')))

app.use(express.json()); // Alternative to BodyParser
//mongodb+srv://alirangwala:Maybach12@cluster0.eqgyc.mongodb.net/notes?retryWrites=true&w=majority
mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://alirangwala:pokerequity@cluster0.eqgyc.mongodb.net/notes?retryWrites=true&w=majority', {
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

// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'client', 'dist', 'index.html'));
// });
// Listening for requests on the PORT
app.listen(port, () => {
  console.log('Serving up now at ' + JSON.stringify(port))
});

module.exports = db;
