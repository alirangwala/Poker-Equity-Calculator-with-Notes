class Card {
  //takes in strings in format 2s, Tc, Qd, Ah
  constructor(cardString) {
    const valueMapping = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 }
    this.value = valueMapping[cardString[0]];
    this.suit = cardString[1];
  }
}

class Board {
  //takes in array of 7 cards
  constructor(cards) {
    this.cards = cards;
  }
  findFrequencies = () => {
    let freqArr = new Array(15).fill(0)
    for (let i = 0; i < this.cards.length; i++) {
      freqArr[this.cards[i].value]++;
    }
    return freqArr
  }
}

//return highcard and 4 of a kind card
detectFourOfAKind = (board) => {
  if (board.findFrequencies().includes(4)) {
    let fourOfAKind = {};
    fourOfAKind['fourOfAKind'] = board.findFrequencies().indexOf(4)
    fourOfAKind['highcard'] = Math.max(...board.cards.map(card => card.value))
    return fourOfAKind;
  }
  return false;
}


module.exports = { Card, Board, detectFourOfAKind, }