const holdem = require('./functions.js');

const compareHands = (arrayOfBoards: any) => {
  let handStrengths = [];
  for (let j = 0; j < arrayOfBoards.length; j++) {
    let board = arrayOfBoards[j];
    handStrengths.push(board.handStrength);
  }

  // helper function to check matching arrays
  let arraysMatch =  (arr1: any, arr2: any) => {
    if (arr1.length !== arr2.length) return false;
    for (let x = 0; x < arr1.length; x++) {
      if (arr1[x] !== arr2[x]) return false;
    }
    return true;
  };
  // first term is array because if there is a tie there are multiple winners
  let winningPlayerAndHand = [[0], handStrengths[0]];
  for (let i = 1; i < handStrengths.length; i++) {
    if (arraysMatch(winningPlayerAndHand[1], handStrengths[i])) {
      winningPlayerAndHand[0].push(i);
    } else if (winningPlayerAndHand[1] < handStrengths[i]) {
      winningPlayerAndHand = [[i], handStrengths[i]];
    } else {
      continue;
    }
  }
  return winningPlayerAndHand[0];
};

const valueMapping: any = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 }
const suits = ['s', 'h', 'd', 'c']

const generateAllCards = () =>{
  let allCards = []
  let valueArray = Object.keys(valueMapping)
  for (let i = 0; i < valueArray.length; i++) {
    for (let j = 0; j < suits.length; j++)
      allCards.push(valueArray[i] + suits[j])
  }
  return allCards
}