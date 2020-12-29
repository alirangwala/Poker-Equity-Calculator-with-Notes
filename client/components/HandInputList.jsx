import React, { useState } from 'react';
// import HandInput from '../HandInput/HandInput.jsx';
import { useForm } from 'react-hook-form';
import { generateAllCards, monteCarloSim } from '../PokerFunctions/oddsCalculator';
// import { MyClass } from '../PokerFunctions/testFunction'


const HandInputList = ({ numOfPlayers }) => {

  let playerArray = [...Array(+numOfPlayers).keys()]

  const [holdings, setHoldings] = useState(playerArray.fill(''))
  const [board, setBoard] = useState('')
  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log('DATA', data)

  const clickHandler = (holdings, communityCards) => {
    let holdingsArray;
    holdingsArray = Object.values(holdings).map(holecards => holecards.match(/(..?)/g))
    if (communityCards) {
      let communityCardsArray = [communityCards].map(cards => cards.match(/(..?)/g))
      // console.log('holdings', holdingsArray)
      // console.log('community', communityCardsArray)
      console.log('monteIF', monteCarloSim(holdingsArray, communityCardsArray))
    } else {
      // console.log('holdings', holdingsArray)
      console.log('monteELSE', monteCarloSim(holdingsArray))
    }
  };

  const addHoleCards = (event, index) => {
    let tempHoldings = [...holdings];
    tempHoldings[index] = event.target.value;
    setHoldings(tempHoldings)
  }

  const addBoardCards = (event) => {
    setBoard(event.target.value)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {playerArray.map((val, i) => {
        return (
          <div>
            <label>{`PLAYER ${i + 1}`}</label>
            <input
              name={`player ${i + 1}`}
              key={i}
              type='text'
              onChange={event => addHoleCards(event, i)}
              ref={register({
                required: true
                // validate: {
                //   isCard: value => generateAllCards().includes(value)
                // }
              })}
            />
          </div>)
      })}
      <div>
        -------------------------------
      </div>
      <div>
        <label>BOARD</label>
        <input
          name='board'
          type='text'
          onChange={event => addBoardCards(event)}
          ref={register({
            // validate: {
            //   isCard: value => generateAllCards().includes(value)
            // }
          })}
        />
      </div>
      <input
        type='submit'
        onClick={(e) => { e.preventDefault; clickHandler(holdings, board) }}
      />
    </form>
  );
}

export default HandInputList;