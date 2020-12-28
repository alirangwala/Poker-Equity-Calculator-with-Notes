const holdem = require('./holdemFunctions.js');
const Card = holdem.Card;
const Board = holdem.Board;

// let holeCards = [new Card('As'), new Card('Ad')]
// let communityCards = [new Card('5s'), new Card('6d'), new Card('6s'), new Card('Th'), new Card('As')]

let player1 = ['As', 'Ad']
let player2 = ['6h', '5d']
let player3 = ['4c', '5d']
let player4 = ['8h', '7d']

let playersHoldings = [player1, player2, player3, player4]

let communityCards = ['5s', '6d', '6s']

const valueMapping = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 }
const suits = ['s', 'h', 'd', 'c']


// Inputs are holeCards and communityCards (either 3, 4, or 5)

generateAllCards = () => {
  let allCards = []
  let valueArray = Object.keys(valueMapping)
  for (let i = 0; i < valueArray.length; i++) {
    for (let j = 0; j < suits.length; j++)
      allCards.push(valueArray[i] + suits[j])
  }
  return allCards
}

// boards have to exclude the exposed cards
generateBoards = (holeCards, communityCards = [], numberSims = 1) => {
  let boards = []
  let allCards = generateAllCards();

  // remove holdings and community cards from deck so no repeat cards
  let unexposedCards = allCards.filter(card => holeCards.concat(communityCards).indexOf(card) < 0)

  for (let i = 0; i < numberSims; i++) {
    let unexposedCardsClone = [...unexposedCards]
    //covert string to Card
    let board = [...communityCards.map(card => new Card(card))]
    for (let j = 0; j < 5 - communityCards.length; j++) {
      let randomIndex = Math.floor(Math.random() * unexposedCardsClone.length)
      //covert string to Card
      board.push(new Card(unexposedCardsClone[randomIndex]))
      unexposedCardsClone.splice(randomIndex, 1)
    }
    boards.push(board)
  }
  return boards
}

// takes in array of holdings, community cards and sims
monteCarloSim = (holdings, communityCards = [], numberSims = 0) => {
  // make an empty array. Each index will be incremented when that player wins

  let winners = new Array(holdings.length).fill(0)

  if (numberSims !== 0) {
    for (let i = 0; i < numberSims; i++) {
      let playersFullHands = []
      for (holeCards of holdings) {
        playersFullHands.push(generateBoards(holeCards, communityCards, 1))
        console.log(playersFullHands)
      }
      winner = holdem.compareHands(playersFullHands)
      winners[winner[0]]++
    }
  }


}



// console.log(combineHoleCardsAndBoard(holeCards, communityCards))
console.log(generateBoards(player1, communityCards))

console.log(monteCarloSim(playersHoldings, communityCards, 10))