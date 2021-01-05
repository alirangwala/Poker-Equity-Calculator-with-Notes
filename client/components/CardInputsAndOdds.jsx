import React, { useState } from 'react';
// import HandInput from '../HandInput/HandInput.jsx';
import { useForm } from 'react-hook-form';
import { generateAllCards, monteCarloSim } from '../PokerFunctions/oddsCalculator';
// import { MyClass } from '../PokerFunctions/testFunction'


const CardInputsAndOdds = ({ numOfPlayers, holdings, setHoldings, board, setBoard, odds, setOdds }) => {

  let playerArray = [...Array(+numOfPlayers).keys()]

  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log('DATA', data)

  const clickHandler = (holdings, communityCards) => {
    let holdingsArray;
    holdingsArray = Object.values(holdings).map(holecards => holecards.match(/(..?)/g))
    if (communityCards) {
      let communityCardsArray = [communityCards].map(cards => cards.match(/(..?)/g))
      console.log('if', holdingsArray, communityCardsArray)
      setOdds(monteCarloSim(holdingsArray, communityCardsArray))
    } else {
      console.log('else')
      setOdds(monteCarloSim(holdingsArray))
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
            <label>{`Player ${i + 1}`}</label>
            <br />
            <input
              name={`player ${i + 1}`}
              key={i}
              type='text'
              value={holdings[i]}
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
      </div>
      <div>
        <br />
        <br />
        <label>Board</label>
        <br />
        <input
          name='board'
          type='text'
          value={board}
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

export default CardInputsAndOdds;