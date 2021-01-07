import React, { useState, useEffect } from 'react';
import CardInputsAndOdds from '../Components/CardInputsAndOdds.jsx';
import OddsDisplay from '../Components/OddsDisplay.jsx'
import PlayersDropdown from '../Components/PlayersDropdown.jsx';
import NoteTaking from '../Components/NoteTaking.jsx';
import DisplayNotes from '../Components/DisplayNotes.jsx';
import CardLayout from '../Components/CardLayout.jsx';
import Banner from '../Components/Banner.jsx';

const App = () => {

  const [numOfPlayers, setNumOfPlayers] = useState('2');
  const [holdings, setHoldings] = useState(Array(+numOfPlayers).fill(''))
  //String is better to deal with for onChange but convert to array for any calcs
  const [board, setBoard] = useState('')
  // const [boardInput, setBoardInput] = useState('')
  const [odds, setOdds] = useState([])

  useEffect(() => {
    setHoldings([...Array(+numOfPlayers).fill('')])
  }, [numOfPlayers]
  )

  const clickCard = (event, value) => {
    event.preventDefault();
    for (let i = 0; i < holdings.length; i++) {
      if (holdings[i].length < 4) {
        let cloneHoldings = [...holdings]
        cloneHoldings[i] += value
        return setHoldings(cloneHoldings)
      }
    }
    console.log(board)
    if (board.length < 10) {
      let cloneBoard = board
      cloneBoard += value
      return setBoard(cloneBoard)
    }
  }

  return (
    <div >
      <Banner />
      <div className="orient-deck">
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
            // boardInput={boardInput}
            // setBoardInput={setBoardInput}
            odds={odds}
            setOdds={setOdds}
          />
          <div className="odds-box">
            {odds.length > 0 &&
              <OddsDisplay
                odds={odds}
              />
            }
          </div>
          <NoteTaking
            holdings={holdings}
            board={board}
            odds={odds}
          />
        </div>
        <div>
          <CardLayout
            clickCard={clickCard}
          />
          <DisplayNotes />
        </div>
      </div>
    </div>
  );
}

export default App;