import { generateAllCards, monteCarloSim } from '../PokerFunctions/oddsCalculator';
import React from 'react';

const Test = () => {

  let player1 = ['As', 'Kd']
  let player2 = ['Qh', 'Qs']

  let playersHoldings = [player1, player2]

  let communityCards = ['Qd', '3d', '5s']

  return (
    <div>
      {monteCarloSim(playersHoldings, communityCards)
      }
    </div>
  );
}

export default Test;