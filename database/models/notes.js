const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
  email: {
    type: String
    // required: true
  },
  game: {
    type: String,
    // required: true
  },
  holdings: {
    type: Array
  },
  board: {
    type: Array
  },
  odds: {
    type: Array
  },
  stack: {
    type: Number
  },
  blinds: {
    type: String
  },
  position: {
    type: String
  },
  preflopAction: {
    type: String
  },
  flop: {
    type: String
  },
  flopAction: {
    type: String
  },
  turn: {
    type: String
  },
  turnAction: {
    type: String
  },
  river: {
    type: String
  },
  riverAction: {
    type: String
  },
  win: {
    type: Boolean
  },
  additionalNotes: {
    type: String
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});

const Notes = mongoose.model('Notes', notesSchema);

module.exports = Notes;