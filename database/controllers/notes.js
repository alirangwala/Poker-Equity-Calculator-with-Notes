const express = require('express');
const router = express.Router();
const Notes = require('../models/notes.js');

router.get('/', async (req, res) => {
  try {
    let notes = await Notes.find();
    res.json(notes)
  }
  catch (err) {
    res.status(400).json('Error: ' + err)
  }
})

router.post('/add', async (req, res) => {
  try {
    console.log("REQBODY", req.body)
    let notesObject = {
      email: req.body.email,
      game: req.body.game,
      holdings: req.body.holdings.split(','),
      board: req.body.board.split(','),
      odds: req.body.odds.split(','),
      stack: req.body.stack || null,
      blinds: req.body.blinds,
      position: req.body.position,
      preflopAction: req.body.preflopAction,
      flop: req.body.flop,
      flopAction: req.body.flopAction,
      turn: req.body.turn,
      turnAction: req.body.turnAction,
      river: req.body.river,
      riverAction: req.body.riverAction,
      win: req.body.win || true,
      additionalNotes: req.body.additionalNotes
    }
    let newUser = await new Notes(notesObject).save()
    res.json('Note Added!')
  }
  catch (err) {
    res.status(400).json('Error: ' + err)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    let notes = await Notes.findByIdAndDelete(req.params.id);
    res.json('Note deleted with id' + req.params.id)
  }
  catch (err) {
    res.status(400).json('Error: ' + err)
  }
})

router.post('/add/:id', async (req, res) => {

  let note = await Notes.findById(req.params.id)
  try {
    note.email = req.body.email;
    note.game = req.body.game;
    note.holdings = req.body.holdings;
    note.board = req.body.board;
    note.odds = req.body.odds;
    note.stack = +req.body.stack;
    note.blinds = req.body.blinds;
    note.position = req.body.position;
    note.preflopAction = req.body.preflopAction;
    note.flopAction = req.body.flopAction;
    note.turnAction = req.body.turnAction;
    note.riverAction = req.body.riverAction;
    note.win = req.body.win;
    note.additionalNotes = req.body.additionalNotes;
    note.dateCreated = Date(req.body.dateCreated);

    note.save()
    res.json('Note Updated!')
  }
  catch (err) {
    res.status(400).json('Error: ' + err)
  }
})

// {
//   "email": "pokerplayer@gmail.com",
//   "game": "Live at the Bike 5/10",
//   "holdings": "AsKs",
//   "stack": "1500",
//   "blinds": "5/10",
//   "position": "UTG",
//   "preflopAction": "Open to $50 and get called by button",
//   "flop": "Kc, 6s, 7s",
//   "flopAction": "Bet $75 and get called",
//   "turn": "5c",
//   "turnAction": "Bet $200, button raises all-in and I call",
//   "river": "Js",
//   "riverAction": "",
//   "win": "true",
//   "additionalNotes": "Button flips over 8c9c for the turned straight"
// }

module.exports = router;