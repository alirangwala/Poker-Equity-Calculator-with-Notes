const holdem = require("./NLHClasses");

const compareHands = (arrayOfBoards: any) => {
  let handStrengths = [];
  for (let i = 0; i < arrayOfBoards.length; i++) {
    let board = arrayOfBoards[i];
    handStrengths.push(board.handStrength);
  }

  // helper function to check matching arrays
  const arraysMatch =  (arr1: any, arr2: any) => {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]) return false;
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

const suits = ['s', 'h', 'd', 'c']

// leave output as array of strings NOT Cards
const generateAllCards = () =>{
  let allCards = []
  let valueArray = Object.keys(holdem.valueMapping)
  for (let i = 0; i < valueArray.length; i++) {
    for (let j = 0; j < suits.length; j++) {
      allCards.push(valueArray[i] + suits[j])
    }
  }
  return allCards
}

let deck = generateAllCards();

//console.log(deck)
// boards have to exclude the exposed cards of all players

const generateRandomBoard = (holdings: any, communityCards:string[] = []) => {
  let allCards = [...deck];
  // remove holdings and community cards from deck so no repeat cards
  let unexposedCards = allCards.filter(
    card => holdings.flat().concat(communityCards).indexOf(card) < 0
  );
  let unexposedCardsClone = [...unexposedCards];
  //covert string to Card
  let board = [...communityCards.map(card => new holdem.Card(card))];
  for (let j = 0; j < 5 - communityCards.length; j++) {
    let randomIndex = Math.floor(Math.random() * unexposedCardsClone.length);
    //covert string to Card
    board.push(new holdem.Card(unexposedCardsClone[randomIndex]));
    unexposedCardsClone.splice(randomIndex, 1);
  }
  return board;
};

// takes in array of holdings, community cards and sims
const monteCarloSim = (holdings: string[][], communityCards: string[] = [], numberSims: number = 1000) => {
  // make an empty array. Each index will be incremented when that player wins

  // first item will be winners, second will be ties
  let results:number[][] = [];
  // first item will be winners, second will be ties
  // let results = new Array(holdings.length).fill([0, 0])
  for (let i = 0; i < holdings.length; i++) {
    results = [...results, [0, 0]];
  }
    for (let i = 0; i < numberSims; i++) {
      let playersFullHands = [];
      let randomBoard = generateRandomBoard(holdings, communityCards);
      for (let j = 0; j < holdings.length; j++) {
        let holeCards = holdings[j];
        playersFullHands.push(
          new holdem.Board([
            ...holeCards.map(card => new holdem.Card(card)),
            ...randomBoard,
          ])
        );
      }
      let comparison = compareHands(playersFullHands);
      if (comparison.length === 1) {
        console.log(comparison)
        results[comparison[0]][0]++;
      } else {
        for (let k = 0; k < comparison.length; k++) {
          results[comparison[k]][1]++;
        }
      }
    }
  return results.map(result => [
    result[0] / numberSims,
    result[1] / numberSims,
  ]);
};

let player1 = ["As", "7s"];
let player2 = ["3d", "3s"];
let player3 = ['4c', '5d']
let player4 = ['8h', '7d']

// let playersHoldings = [player1, player2];
let playersHoldings = [player1, player2, player3, player4];

let communityCards = ["Js", "Jd", "7c"];

console.log(generateRandomBoard(playersHoldings, communityCards))

console.log(monteCarloSim(playersHoldings, communityCards))
console.time()
console.log("inputs", playersHoldings, communityCards)
console.timeEnd()

module.exports = { compareHands, generateAllCards, monteCarloSim }