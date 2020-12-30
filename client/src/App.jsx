import React, { useState } from 'react';
import CardInputsAndOdds from '../Components/CardInputsAndOdds.jsx';
import OddsDisplay from '../Components/OddsDisplay.jsx'
import PlayersDropdown from '../Components/PlayersDropdown.jsx';


const App = () => {

  const [numOfPlayers, setNumOfPlayers] = useState('2');
  const [holdings, setHoldings] = useState([...Array(+numOfPlayers).fill('')])
  const [board, setBoard] = useState('')
  const [odds, setOdds] = useState([])

  return (
    <div>
      <PlayersDropdown
        setNumOfPlayers={setNumOfPlayers}
        numOfPlayers={numOfPlayers}
      />
      <CardInputsAndOdds
        numOfPlayers={numOfPlayers}
        holdings={holdings}
        setHoldings={setHoldings}
        board={board}
        setBoard={setBoard}
        odds={odds}
        setOdds={setOdds}
      />
      <OddsDisplay
        odds={odds}
      />
    </div>
  );
}

export default App;