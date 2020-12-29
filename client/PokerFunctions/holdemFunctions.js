const Card = function (cardString) {
  //takes in strings in format 2s, Tc, Qd, Ah (value + suit)
  const valueMapping = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 }
  this.value = valueMapping[cardString[0]];
  this.suit = cardString[1];
}

const Board = function (cards) {
  //takes in array of 7 cards
  this.cards = cards;

  Board.prototype.findValueFrequencies = function () {
    let freqArr = new Array(15).fill(0)
    // let freqArr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
    for (let i = 0; i < this.cards.length; i++) {
      freqArr[this.cards[i].value]++;
    }
    return freqArr
  }
  Board.prototype.findSuitFrequencies = function () {
    let freqArr = { 's': 0, 'h': 0, 'd': 0, 'c': 0 }
    for (let i = 0; i < this.cards.length; i++) {
      freqArr[this.cards[i].suit]++;
    }
    return freqArr
  }
}

// Note these individual formula's are not perfect... they do not exclude all the stronger hands because we are using them all in the handStrength functions that eliminates strongest first

function detectStraightFlush(board) {
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

const detectFourOfAKind = function (board) {
  if (board.findValueFrequencies().includes(4)) {
    return true;
  }
  return false;
}

const detectFullHouse = function (board) {
  let freqArray = board.findValueFrequencies();
  if (freqArray.includes(3) && freqArray.includes(2)) {
    return true;
  } else if (freqArray.includes(3, freqArray.indexOf(3) + 1)) {
    return true;
  }
  return false;
}

const detectFlush = function (board) {
  let freqObj = board.findSuitFrequencies();
  for (suit in freqObj) {
    if (freqObj[suit] >= 5) {
      return true;
    }
  }
  return false;
}

const detectStraight = function (board) {
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

const detectThreeOfAKind = function (board) {
  let freqArray = board.findValueFrequencies();
  // three of a kind if only one three of a kind and no pairs
  if (freqArray.includes(3) && !freqArray.includes(2) && !freqArray.includes(3, freqArray.indexOf(3) + 1)) {
    return true;
  }
  return false;
}

const detectTwoPair = function (board) {
  let freqArray = board.findValueFrequencies();
  if (freqArray.includes(2) && freqArray.includes(2, freqArray.indexOf(2) + 1) && !freqArray.includes(3)) {
    return true;
  }
  return false;
}

const detectPair = function (board) {
  let freqArray = board.findValueFrequencies();
  if (freqArray.includes(2) && !freqArray.includes(2, freqArray.indexOf(2) + 1) && !freqArray.includes(3)) {
    return true;
  }
  return false;
}

const detectHighCard = function (board) {
  let freqArray = board.findValueFrequencies();
  if (!freqArray.includes(2) && !freqArray.includes(3) && !freqArray.includes(4)) {
    return true;
  }
  return false;
}

// Making outputs into arrays because array comparisons are very convenient
// Index [0] will denote type of hand and the rest will be tie breakers for same hands
// When comparing arrays the first index is compared, then second and so on so this will work perfectly

// Straight Flush [8, 14]-- top card
// Four of a Kind [7, 4, 5]-- four of a kind, kicker
// Full House [6, 12, 5]-- three of a kind, pair
// Flush [5, 13, 12, 9, 7, 5] -- 5 high cards in order
// Straight [4, 8]-- top card
// Three of a Kind [3, 7, 12, 9] -- three of a kind, kicker, second kicker
// Two Pair [2, 9, 8, 12]-- top pair, bottom pair, kicker
// Pair [1, 14, 12, 10, 9] -- pair, kicker, second kicker, third kicker
// High Card [0, 14, 12, 9, 8, 7]-- 5 high cards in order

const handStrength = function (board) {

  let freqArray = board.findValueFrequencies();
  let freqObj = board.findSuitFrequencies();

  // insert detect flush
  if (detectStraightFlush(board)) {
    let straightFlush = [8]
    return straightFlush
  } else if (detectFourOfAKind(board)) {
    let fourOfAKind = [7];
    fourOfAKind.push(board.findValueFrequencies().lastIndexOf(4))
    fourOfAKind.push(Math.max(...board.cards.map(card => card.value)))
    return fourOfAKind;
  } else if (detectFullHouse(board)) {
    let fullHouse = [6];
    fullHouse.push(freqArray.lastIndexOf(3))
    // full house if two 3 of a kinds
    fullHouse.push(freqArray.lastIndexOf(2) > -1 ? freqArray.lastIndexOf(2) : freqArray.lastIndexOf(3, freqArray.lastIndexOf(3) - 1))
    return fullHouse;
    // full house if two 3 of a kinds
  } else if (detectFlush(board)) {
    let maxSuit = 's';
    Object.keys(freqObj).forEach(function (key) {
      maxSuit = (freqObj[key] > freqObj[maxSuit]) ? key : maxSuit;
    });
    let suitFreqArray = new Array(15).fill(0)
    let flush = [5];
    count = 0;
    for (let i = 0; i < board.cards.length; i++) {
      if (board.cards[i].suit === maxSuit) {
        suitFreqArray[board.cards[i].value]++;
      }
    }
    for (let i = suitFreqArray.length; i >= 0; i--) {
      if (suitFreqArray[i] === 1) {
        flush.push(i)
        count++;
      }
      if (count === 5) {
        break;
      }
    }
    return flush
  } else if (detectStraight(board)) {
    let straight = [4];
    if (!freqArray.slice(10, 15).includes(0)) {
      straight.push(14)
    } else if (!freqArray.slice(9, 14).includes(0)) {
      straight.push(13)
    } else if (!freqArray.slice(8, 13).includes(0)) {
      straight.push(12)
    } else if (!freqArray.slice(7, 12).includes(0)) {
      straight.push(11)
    } else if (!freqArray.slice(6, 11).includes(0)) {
      straight.push(10)
    } else if (!freqArray.slice(5, 10).includes(0)) {
      straight.push(9)
    } else if (!freqArray.slice(4, 9).includes(0)) {
      straight.push(8)
    } else if (!freqArray.slice(3, 8).includes(0)) {
      straight.push(7)
    } else if (!freqArray.slice(2, 7).includes(0)) {
      straight.push(6)
    } else {
      straight.push(5)
    }
    return straight;
  } else if (detectThreeOfAKind(board)) {
    let threeOfAKind = [3];
    threeOfAKind.push(freqArray.lastIndexOf(3))
    threeOfAKind.push(freqArray.lastIndexOf(1))
    threeOfAKind.push(freqArray.lastIndexOf(1, freqArray.lastIndexOf(1) - 1))
    return threeOfAKind;
  } else if (detectTwoPair(board)) {
    let twoPair = [2];
    twoPair.push(freqArray.lastIndexOf(2))
    twoPair.push(freqArray.lastIndexOf(2, freqArray.lastIndexOf(2) - 1))
    twoPair.push(freqArray.lastIndexOf(1))
    return twoPair
  } else if (detectPair(board)) {
    let pair = [1];
    count = 0;
    pair.push(freqArray.lastIndexOf(2))
    for (let i = freqArray.length; i >= 0; i--) {
      if (freqArray[i] === 1) {
        pair.push(i)
        count++;
      }
      if (count == 3) {
        break;
      }
    }
    return pair
  } else if (detectHighCard(board)) {
    let highCard = [0];
    count = 0;
    for (let i = freqArray.length; i >= 0; i--) {
      if (freqArray[i] === 1) {
        highCard.push(i)
        count++;
      }
      if (count == 5) {
        break;
      }
    }
    return highCard
  } else {
    "Something Went Wrong!!"
  }
}

const compareHands = function (arrayOfBoards) {

  let handStrengths = []
  for (let j = 0; j < arrayOfBoards.length; j++) {
    let board = arrayOfBoards[j];
    handStrengths.push(handStrength(board))
  }
  let winningHandAndPlayer = [0, handStrengths[0]]
  for (let i = 1; i < handStrengths.length; i++) {
    if (winningHandAndPlayer[1] < handStrengths[i]) {
      winningHandAndPlayer = [i, handStrengths[i]]
    }
  }
  return winningHandAndPlayer
}

module.exports = {
  Card,
  Board,
  detectStraightFlush,
  detectFourOfAKind,
  detectFullHouse,
  detectFlush,
  detectStraight,
  detectThreeOfAKind,
  detectTwoPair,
  detectPair,
  detectHighCard,
  handStrength,
  compareHands
}