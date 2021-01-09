import React, { useState, useEffect } from 'react';
import UpdateNote from './UpdateNote.jsx'
import moment from 'moment';
import axios from 'axios';
import Modal from 'react-modal'


const SingleNote = ({ note }) => {

  const [modalIsOpen, setModalIsOpen] = useState(false)

  // console.log(note)
  let board = [...note.board]
  let flop = board.length > 2 ? board.splice(0, 3) : []
  let turn = note.board[3] ? note.board[3] : []
  let river = note.board[4] ? note.board[4] : []


  const deleteNote = () => {
    axios.delete(`/notes/${note._id}`)
      .then(res => {
        console.log(res.data)
      })
  }

  return (
    <div className='note-card'>
      <h4 className='note-header' >
        <div><b>{note.game} (Blinds: {note.blinds})</b></div>
        <div>{moment(new Date(note.dateCreated)).format('MMMM Do YYYY, h:mm:ss a')}</div></h4>
      <div><b>Position: </b>{note.position}</div>
      {/* {console.log(note.holdings)} */}
      {note.holdings.map((holding, i) =>
        <div>{`Player ${i + 1}: ${holding}`}</div>
      )}
      {note.stack ? <div><b>Hero's Stack size:</b> {note.stack}</div>
        : null}
      {/*
      {note.odds.length && note.odds.map((odd, i) =>
        <div>{`Player ${i}: ${odd}`}</div>
      )} */}
      {note.preflopAction ? <div><b>Pre-flop Action:</b> {note.preflopAction}</div>
        : null}
      {flop.length ?
        <div>
          <div><b>Flop:</b> {flop}</div>
          <div><b>Flop Action:</b> {note.flopAction}</div>
        </div>
        : null
      }
      {turn.length ?
        <div>
          <div><b>Turn:</b> {turn}</div>
          <div><b>Turn Action:</b> {note.turnAction}</div>
        </div>
        : null
      }
      {river.length ?
        <div>
          <div><b>River:</b> {river}</div>
          <div><b>River Action: </b>{note.riverAction}</div>
        </div>
        : null
      }
      <div>{note.win ? 'Won Pot' : 'Lost Pot'}</div>
      {note.additionalNotes ?
        <div><b>Additional Notes:</b> {note.additionalNotes}</div>
        : null
      }
      <button
        onClick={() => { deleteNote() }}
        className='delete-button'>Delete</button>
      <button
        onClick={() => { setModalIsOpen(true) }}
        className='edit-button'>Edit</button>

      <Modal isOpen={modalIsOpen} onRequestClose={(e) => { e.stopPropagation(); setModalIsOpen(false); }} shouldCloseOnOverlayClick={true}>
        <UpdateNote setModalIsOpen={setModalIsOpen} note={note} />
      </Modal>
    </div>
  );
}

export default SingleNote;