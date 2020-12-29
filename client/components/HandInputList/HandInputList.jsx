import React, { useState } from 'react';
import HandInput from '../HandInput/HandInput.jsx';
import { useForm } from 'react-hook-form';
import { generateAllCards } from '../PokerFunctions/oddsCalculator';
// import { MyClass } from '../PokerFunctions/testFunction'


const HandInputList = ({ numOfPlayers }) => {

  let playerArray = [...Array(+numOfPlayers).keys()]

  const [holdings, setHoldings] = useState(playerArray.fill(''))

  const { register, handleSubmit } = useForm();
  const onSubmit = data => console.log(data);


  const addCards = (event, index) => {
    let tempHoldings = [...holdings];
    tempHoldings[index] = event.target.value;
    setHoldings(tempHoldings)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {playerArray.map((val, i) =>
        <input
          name={`player ${i}`}
          key={i}
          type='text'
          onChange={event => addCards(event, i)}
          ref={register({
            // required: true
            // validate: {
            //   isCard: value => generateAllCards().includes(value)
            // }
          })}
        />
      )}
      <input type='submit' onClick={(e) => { e.preventDefault; console.log(generateAllCards()) }} />
    </form>
  );
}

export default HandInputList;