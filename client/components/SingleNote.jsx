import React, { useState, useEffect } from 'react';

const SingleNote = ({ note }) => {


  return (
    <div>
      <h4>{note.game}</h4>
      {note.holdings.map(holding =>
        <div>Villain: {holding}</div>
      )}
      <div>{note.odds}</div>
      <div>{note.board}</div>
      <div>{note.stack}</div>
      <div>{note.blinds}</div>
      <div>{note.position}</div>
      <div>{note.preflopAction}</div>
      <div>{note.flop}</div>
      <div>{note.flopAction}</div>
      <div>{note.turn}</div>
      <div>{note.turnAction}</div>
      <div>{note.river}</div>
      <div>{note.riverAction}</div>
      <div>{note.win}</div>
      <div>{note.additionalNotes}</div>
      <div>{note.dateCreated}</div>

    </div>
  );
}

export default SingleNote;