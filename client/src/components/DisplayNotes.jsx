import React, { useState, useEffect } from 'react';
import SingleNote from './SingleNote.jsx'
import axios from 'axios'

const DisplayNotes = ({ odds }) => {

  const [notes, setNotes] = useState([]);
  const [timeRange, setTimeRange] = useState('');

  useEffect(() => {
    axios.get('/notes')
      .then(res => setNotes(res.data))
      .catch(err => console.log(err))
  }, [notes]);

  return (
    <div>
      < form >
        <label>
          <select name='Time Range' onChange={e => setTimeRange(e.target.value)} value={timeRange}>
            <option value='1'>Last 24 hours</option>
            <option value='7'>Last Week</option>
            <option value='28'>Last 4 Weeks</option>
            <option value='1000'>All Time</option>
          </select>
        </label>
      </form>
      {notes.map(note =>
        <SingleNote
          note={note}
        />
      )}
    </div>
  );
}

export default DisplayNotes;