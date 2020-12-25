import React, { useState } from 'react';
import HandInput from '../HandInput/HandInput.jsx';
import range from 'lodash'

const HandInputList = ({ numOfPlayers }) => {

  let playerArray = [...Array(+numOfPlayers).keys()]

  const [holdings, setHoldings] = useState(playerArray.fill(''))

  const addCards = (event, index) => {
    let tempHoldings = [...holdings];
    tempHoldings[index] = event.target.value;
    setHoldings(tempHoldings)
  }

  return (
    <form>
      {playerArray.map((val, i) =>
        <input
          key={i}
          type='text'
          onChange={event => addCards(event, i)}
        />
      )}
      <button type='submit' onClick={() => console.log(holdings)} >Calculate</button>
    </form>
  );
}

export default HandInputList;