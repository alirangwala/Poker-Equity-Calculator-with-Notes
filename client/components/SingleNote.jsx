import React, { useState, useEffect } from 'react';

const SingleNote = ({ note }) => {

  let board = [...note.board]

  let flop = board.length > 2 ? board.splice(0, 3) : []

  let turn = note.board[3] ? note.board[3] : []
  let river = note.board[4] ? note.board[4] : []

  return (
    <div className='note-card'>
      <h4>{note.game}</h4>
      <div>{note.blinds}</div>
      <div><b>Position:</b> <br />{note.position}</div>
      {/* {console.log(note.holdings)} */}
      {note.holdings.map((holding, i) =>
        <div>{`Player ${i}: ${holding}`}</div>
      )}
      <div><b>Hero's Stack size:</b> {note.stack}</div>

      {note.odds.length && note.odds.map((odd, i) =>
        <div>{`Player ${i}: ${odd}`}</div>
      )}
      <div><b>Board:</b> {board[0]}</div>
      <div><b>Pre-flop Action:</b> {note.preflopAction}</div>
      {flop.length &&
        <div>
          <div><b>Flop:</b> {flop}</div>
          <div><b>Flop Action:</b> {note.flopAction}</div>
        </div>
      }

      <div><b>Turn:</b> {turn}</div>
      <div><b>Turn Action:</b> {note.turnAction}</div>
      <div><b>River:</b> {river}</div>
      <div><b>River Action: </b>{note.riverAction}</div>
      <div><b>Win: </b>{note.win}</div>
      <div><b>Additional Notes:</b> {note.additionalNotes}</div>
      <div><b>Date</b> {note.dateCreated}</div>

    </div>
  );
}

export default SingleNote;