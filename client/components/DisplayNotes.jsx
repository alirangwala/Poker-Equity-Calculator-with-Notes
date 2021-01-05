import React, { useState, useEffect } from 'react';
import SingleNote from './SingleNote.jsx'
import axios from 'axios'

const DisplayNotes = ({ odds }) => {

  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios.get('/notes')
      .then(res => setNotes(res.data))
      .catch(err => console.log(err))
  }, [notes]);

  return (
    <div>
      <h2>NOTES</h2>
      {notes.map(note =>
        <SingleNote
          note={note}
        />
      )}
    </div>
  );
}

export default DisplayNotes;