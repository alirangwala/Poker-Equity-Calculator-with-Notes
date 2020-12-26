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
  findValueFrequencies = () => {
    let freqArr = new Array(15).fill(0)
    for (let i = 0; i < this.cards.length; i++) {
      freqArr[this.cards[i].value]++;
    }
    return freqArr
  }
  findSuitFrequencies = () => {
    let freqArr = { 's': 0, 'h': 0, 'd': 0, 'c': 0 }
    for (let i = 0; i < this.cards.length; i++) {
      freqArr[this.cards[i].suit]++;
    }
    return freqArr
  }
}

// Note these individual formula's are not perfect... they do not exclude all the stronger hands because we are using them all in the handStrength functions that eliminates strongest first

detectStraightFlush = (board) => {
  let freqObj = board.findSuitFrequencies();
  let freqArray = board.findValueFrequencies();
  if (!detectFlush(board)) {
    return false
  } else {
    let maxSuit = 's';
    Object.keys(freqObj).forEach(function (key) {
      maxSuit = (freqObj[key] > freqObj[maxSuit]) ? key : maxSuit;
    });
    let suitFreqArray = new Array(15).fill(0)

    for (let i = 0; i < board.cards.length; i++) {
      if (board.cards[i].suit === maxSuit) {
        suitFreqArray[board.cards[i].value]++;
      }
    }
    let counter = 0;
    for (let i = 0; i < suitFreqArray.length; i++) {
      if (suitFreqArray[i]) {
        count++
      } else {
        count = 0
      }
      if (count >= 5) {
        return true
      }
    }
    //check low straight
    if (suitFreqArray[2] && suitFreqArray[3] && suitFreqArray[4] && suitFreqArray[5] && suitFreqArray[14]) {
      return true;
    }
    return false;
  }
}

detectFourOfAKind = (board) => {
  if (board.findValueFrequencies().includes(4)) {
    return true;
  }
  return false;
}

detectFullHouse = (board) => {
  let freqArray = board.findValueFrequencies();
  if (freqArray.includes(3) && freqArray.includes(2)) {
    return true;
  } else if (freqArray.includes(3, freqArray.indexOf(3) + 1)) {
    return true;
  }
  return false;
}

detectFlush = (board) => {
  let freqObj = board.findSuitFrequencies();
  for (suit in freqObj) {
    if (freqObj[suit] >= 5) {
      return true;
    }
  }
  return false;
}

detectStraight = (board) => {
  let freqArray = board.findValueFrequencies();
  let counter = 0;
  for (let i = 0; i < freqArray.length; i++) {
    if (freqArray[i]) {
      count++
    } else {
      count = 0
    }
    if (count >= 5) {
      return true
    }
  }
  //check low straight
  if (freqArray[2] && freqArray[3] && freqArray[4] && freqArray[5] && freqArray[14]) {
    return true;
  }
  return false;
}

detectThreeOfAKind = (board) => {
  let freqArray = board.findValueFrequencies();
  // three of a kind if only one three of a kind and no pairs
  if (freqArray.includes(3) && !freqArray.includes(2) && !freqArray.includes(3, freqArray.indexOf(3) + 1)) {
    return true;
  }
  return false;
}

detectTwoPair = (board) => {
  let freqArray = board.findValueFrequencies();
  if (freqArray.includes(2) && freqArray.includes(2, freqArray.indexOf(2) + 1) && !freqArray.includes(3)) {
    return true;
  }
  return false;
}

detectPair = (board) => {
  let freqArray = board.findValueFrequencies();
  if (freqArray.includes(2) && !freqArray.includes(2, freqArray.indexOf(2) + 1) && !freqArray.includes(3)) {
    return true;
  }
  return false;
}

detectHighCard = (board) => {
  let freqArray = board.findValueFrequencies();
  if (!freqArray.includes(2) && !freqArray.includes(3) && !freqArray.includes(4)) {
    return true;
  }
  return false;
}


handStrength = (board) => {
  let freqArray = board.findValueFrequencies();
  if (detectStraightFlush(board)) {
    return 'Straight Flush'
  } else if (detectFourOfAKind(board)) {
    let fourOfAKind = {};
    fourOfAKind['fourOfAKind'] = board.findValueFrequencies().lastIndexOf(4)
    fourOfAKind['kicker'] = Math.max(...board.cards.map(card => card.value))
    return fourOfAKind;
  } else if (detectFullHouse(board)) {
    let fullHouse = {};
    fullHouse['threeOfAKind'] = freqArray.lastIndexOf(3)
    // full house if two 3 of a kinds
    fullHouse['pair'] = freqArray.lastIndexOf(2) > -1 ? freqArray.lastIndexOf(2) : freqArray.lastIndexOf(3, freqArray.lastIndexOf(3) - 1)
    return fullHouse;
    // full house if two 3 of a kinds
  } else if (detectFlush(board)) {
    return 'Flush'
  } else if (detectStraight(board)) {
    return 'Straight'
  } else if (detectThreeOfAKind(board)) {
    let threeOfAKind = {};
    threeOfAKind['threeOfAKind'] = freqArray.lastIndexOf(3)
    threeOfAKind['kicker'] = freqArray.lastIndexOf(1)
    threeOfAKind['secondKicker'] = freqArray.lastIndexOf(1, freqArray.lastIndexOf(1) - 1)
    return threeOfAKind;
  } else if (detectTwoPair(board)) {
    return 'TwoPair'
  } else if (detectPair(board)) {
    return 'Pair'
  } else if (detectHighCard(board)) {
    return 'HighCard'
  } else {
    "Something Went Wrong!!"
  }
}

// let testBoard = new Board([new Card('3d'), new Card('6h'), new Card('6c'), new Card('6d'), new Card('6s'), new Card('Ah'), new Card('Kd')])
// console.log(detectFourOfAKind(testBoard))

module.exports = { Card, Board, detectStraightFlush, detectFourOfAKind, detectFullHouse, detectFlush, detectStraight, detectThreeOfAKind, detectTwoPair, detectPair, detectHighCard, handStrength }