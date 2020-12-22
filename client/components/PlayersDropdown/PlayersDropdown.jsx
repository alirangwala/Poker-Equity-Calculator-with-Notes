import React, { useState } from 'react';

const PlayersDropdown = ({ setPlayerNum, playerNum }) => {

  return (
    < form >
      <label>
        How many players?
      <select name='Number of players' onChange={e => setPlayerNum(e.target.value)} value={playerNum}>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
          <option value='7'>7</option>
          <option value='8'>8</option>
          <option value='9'>9</option>
          <option value='10'>10</option>
        </select>
      </label>
    </form >
  );
}

export default PlayersDropdown;