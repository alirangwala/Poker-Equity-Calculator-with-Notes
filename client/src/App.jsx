import React, { useState } from 'react';
import HandInput from '../Components/HandInput/HandInput.jsx';
import HandInputList from '../Components/HandInputList/HandInputList.jsx';

import PlayersDropdown from '../Components/PlayersDropdown/PlayersDropdown.jsx';


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
      // holdings={holdings}
      // setHoldings={setHoldings}
      />
    </div>
  );
}

export default App;