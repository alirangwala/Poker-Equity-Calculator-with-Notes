import React, { useState } from 'react';

const PlayersDropdown = ({ setNumOfPlayers, NumOfPlayers }) => {

  return (
    < form >
      <label>
        <select name='Number of players' onChange={e => setNumOfPlayers(e.target.value)} value={NumOfPlayers}>
          <option value='2'>2 Players</option>
          <option value='3'>3 Players</option>
          <option value='4'>4 Players</option>
          <option value='5'>5 Players</option>
          <option value='6'>6 Players</option>
          <option value='7'>7 Players</option>
          <option value='8'>8 Players</option>
          <option value='9'>9 Players</option>
          <option value='10'>10 Players</option>
        </select>
      </label>
    </form>
  );
}

export default PlayersDropdown;