import React, { useState } from 'react';
import HandInput from '../Components/HandInput/HandInput.jsx';
import HandInputList from '../Components/HandInputList/HandInputList.jsx';

import PlayersDropdown from '../Components/PlayersDropdown/PlayersDropdown.jsx';


const App = () => {

  const [playerNum, setPlayerNum] = useState('2');

  return (
    <div>
      <PlayersDropdown
        setPlayerNum={setPlayerNum}
        playerNum={playerNum}
      />
      <HandInputList
        playerNum={playerNum}
      />

    </div>
  );
}

export default App;