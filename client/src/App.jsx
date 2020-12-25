import React, { useState } from 'react';
import HandInput from '../Components/HandInput/HandInput.jsx';
import HandInputList from '../Components/HandInputList/HandInputList.jsx';

import PlayersDropdown from '../Components/PlayersDropdown/PlayersDropdown.jsx';


const App = () => {

  const [numOfPlayers, setNumOfPlayers] = useState('2');
  // const [holdings, setHoldings] = useState([]);

  // const onCalculate = () => {
  //   setHoldings({
  //     ...holdings,
  //     player[key]: e.target.value
  //   })
  // }

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