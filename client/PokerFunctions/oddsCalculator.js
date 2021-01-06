const holdem = require('./holdemFunctions.js');
const Card = holdem.Card;
const Board = holdem.Board;

// let holeCards = [new Card('As'), new Card('Ad')]
// let communityCards = [new Card('5s'), new Card('6d'), new Card('6s'), new Card('Th'), new Card('As')]

let player1 = ['As', 'Kd']
let player2 = ['Qh', 'Qs']
// let player3 = ['4c', '5d']
// let player4 = ['8h', '7d']

let playersHoldings = [player1, player2]

let communityCards = ['Qd', '3d', '5s']

const valueMapping = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 }
const suits = ['s', 'h', 'd', 'c']


// Inputs are holeCards and communityCards (either 3, 4, or 5)

function generateAllCards() {
  let allCards = []
  let valueArray = Object.keys(valueMapping)
  for (let i = 0; i < valueArray.length; i++) {
    for (let j = 0; j < suits.length; j++)
      allCards.push(valueArray[i] + suits[j])
  }
  return allCards
}
let deck = generateAllCards();

// boards have to exclude the exposed cards of all players

const generateRandomBoard = (holdings, communityCards = []) => {
  let allCards = [...deck]
  // remove holdings and community cards from deck so no repeat cards
  let unexposedCards = allCards.filter(card => holdings.flat().concat(communityCards).indexOf(card) < 0)
  let unexposedCardsClone = [...unexposedCards]
  //covert string to Card
  let board = [...communityCards.map(card => new Card(card))]
  for (let j = 0; j < 5 - communityCards.length; j++) {
    let randomIndex = Math.floor(Math.random() * unexposedCardsClone.length)
    //covert string to Card
    board.push(new Card(unexposedCardsClone[randomIndex]))
    unexposedCardsClone.splice(randomIndex, 1)
  }
  return board
}
const generateAllBoards = (holdings, communityCards = []) => {
  let allCards = [...deck]
  // remove holdings and community cards from deck so no repeat cards
  let unexposedCards = allCards.filter(card => holdings.flat().concat(communityCards).indexOf(card) < 0)
  let unexposedCardsClone = [...unexposedCards]
  //covert string to Card
  let board = [...communityCards.map(card => new Card(card))]

}


// takes in array of holdings, community cards and sims
const monteCarloSim = (holdings, communityCards = [], numberSims = 1000) => {
  // make an empty array. Each index will be incremented when that player wins

  let winners = new Array(holdings.length).fill(0)

  if (numberSims !== 0) {
    for (let i = 0; i < numberSims; i++) {
      let playersFullHands = []
      let randomBoard = generateRandomBoard(holdings, communityCards)
      for (let j = 0; j < holdings.length; j++) {
        let holeCards = holdings[j]
        playersFullHands.push(new Board([...holeCards.map(card => new Card(card)), ...randomBoard]))
      }
      let winner = holdem.compareHands(playersFullHands)
      winners[winner[0]]++
    }
  }
  // returns array of odds
  return winners.map(wins => wins / numberSims)
}

// console.log(monteCarloSim(playersHoldings, communityCards))
// console.time()
// console.log("inputs", playersHoldings, communityCards)
// console.log("JSFUNCTION", monteCarloSim)
// console.timeEnd()

module.exports = { Card, Board, generateAllCards, monteCarloSim }

