import React, { useState } from 'react';
import HandInput from '../Components/HandInput.jsx';
import HandInputList from '../Components/HandInputList.jsx';

import PlayersDropdown from '../Components/PlayersDropdown.jsx';


const App = () => {

  const [numOfPlayers, setNumOfPlayers] = useState('2');
  const [odd, setOdds] = useState([])
  return (
    <div>
      <PlayersDropdown
        setNumOfPlayers={setNumOfPlayers}
        numOfPlayers={numOfPlayers}
      />
      <HandInputList
        numOfPlayers={numOfPlayers}
      // odds={odds}
      // setOdds={setOdds}
      />
    </div>
  );
}

export default App;