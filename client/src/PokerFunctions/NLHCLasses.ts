const valueMapping: any = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 }

class Card {
  value: number;
  suit: string;

  //takes in strings in format 2s, Tc, Qd, Ah (value + suit)
  constructor(public cardString: string){
  this.value = +valueMapping[cardString[0]];
  this.suit = cardString[1];
}
}

class Board {
  //takes in array of 7 cards
  valueFreq: any;
  suitFreq: any;
  handStrength: any;

  constructor(public cards: Card[]) {
    this.valueFreq = this.findValueFrequencies();
    this.suitFreq = this.findSuitFrequencies();
    this.handStrength = this.findHandStrength();
  }

  findValueFrequencies () {
    let valueFreq = new Array(15).fill(0);
    for (let i = 0; i < this.cards.length; i++) {
      let currentVal = this.cards[i].value
      valueFreq[currentVal]++;
    }
    return valueFreq;
  }

  findSuitFrequencies () {
    let suitFreq: any = { 's': 0, 'h': 0, 'd': 0, 'c': 0 }
    for (let i = 0; i < this.cards.length; i++) {
      suitFreq[this.cards[i].suit]++;
    }
    return suitFreq;
  }

  isFourOfAKind () {
    if (this.valueFreq.includes(4)) {
      return true;
    }
    return false;
  };

  isFullHouse () {
    if (this.valueFreq.includes(3) && this.valueFreq.includes(2)) {
      return true;
    } else if (this.valueFreq.includes(3, this.valueFreq.indexOf(3) + 1)) {
      return true;
    }
    return false;
  };

  isFlush() {
    for (let suit in this.suitFreq) {
      if (this.suitFreq[suit] >= 5) {
        return true;
      }
    }
    return false;
  };

  isStraight() {
    let counter = 0;

    for (let i = 0; i < this.valueFreq.length; i++) {
      if (this.valueFreq[i]) {
        counter++;
      } else {
        counter = 0;
      }
      if (counter >= 5) {
        return true;
      }
    }
    //check low straight
    if (
      this.valueFreq[2] &&
      this.valueFreq[3] &&
      this.valueFreq[4] &&
      this.valueFreq[5] &&
      this.valueFreq[14]
    ) {
      return true;
    }
    return false;
  };

  isStraightFlush() {
    // few conditions to make runtime faster
    if (!this.isFlush()) return false;
    if (!this.isStraight()) return false;

      let maxSuit: string = "s";
      Object.keys(this.suitFreq).forEach(key => {
        maxSuit = this.suitFreq[key] > this.suitFreq[maxSuit] ? key : maxSuit;
      });
      let SFSuitFreq = new Array(15).fill(0);

      for (let i = 0; i < this.cards.length; i++) {
        if (this.cards[i].suit === maxSuit) {
          SFSuitFreq[this.cards[i].value]++;
        }
      }
      // console.log(SFSuitFreq)
      let counter = 0;
      for (let i = 0; i < SFSuitFreq.length; i++) {
        if (SFSuitFreq[i]) {
          counter++;
        } else {
          counter = 0;
        }
        if (counter >= 5) {
          return true;
        }
      }
      //check low straight
      if (
        SFSuitFreq[2] &&
        SFSuitFreq[3] &&
        SFSuitFreq[4] &&
        SFSuitFreq[5] &&
        SFSuitFreq[14]
      ) {
        return true;
      }
      return false;
    }

  isThreeOfAKind () {
    // three of a kind if only one three of a kind and no pairs
    if (
      this.valueFreq.includes(3) &&
      !this.valueFreq.includes(2) &&
      !this.valueFreq.includes(3, this.valueFreq.indexOf(3) + 1)
    ) {
      return true;
    }
    return false;
  };

  isTwoPair() {
    if (
      this.valueFreq.includes(2) &&
      this.valueFreq.includes(2, this.valueFreq.indexOf(2) + 1) &&
      !this.valueFreq.includes(3)
    ) {
      return true;
    }
    return false;
  };

  isPair(){
    if (
      this.valueFreq.includes(2) &&
      !this.valueFreq.includes(2, this.valueFreq.indexOf(2) + 1) &&
      !this.valueFreq.includes(3)
    ) {
      return true;
    }
    return false;
  };

  isHighCard(){
    if (
      !this.valueFreq.includes(2) &&
      !this.valueFreq.includes(3) &&
      !this.valueFreq.includes(4)
    ) {
      return true;
    }
    return false;
  };


  findHandStrength () {
  if (this.isStraightFlush()) {
    let straightFlush = [8];
    return straightFlush;
  } else if (this.isFourOfAKind()) {
    let fourOfAKind = [7];
    fourOfAKind.push(this.valueFreq.lastIndexOf(4));
    fourOfAKind.push(Math.max(...this.cards.map( card => card.value)));
    return fourOfAKind;
  } else if (this.isFullHouse()) {
    let fullHouse = [6];
    fullHouse.push(this.valueFreq.lastIndexOf(3));
    // full house if two 3 of a kinds
    fullHouse.push(
      this.valueFreq.lastIndexOf(2) > -1
        ? this.valueFreq.lastIndexOf(2)
        : this.valueFreq.lastIndexOf(3, this.valueFreq.lastIndexOf(3) - 1)
    );
    return fullHouse;
    // full house if two 3 of a kinds
  } else if (this.isFlush()) {
    let maxSuit = "s";
    Object.keys(this.suitFreq).forEach(key => {
      maxSuit = this.suitFreq[key] > this.suitFreq[maxSuit] ? key : maxSuit;
    });
    let suitFreqArray = new Array(15).fill(0);
    let flush = [5];
    let count = 0;
    for (let i = 0; i < this.cards.length; i++) {
      if (this.cards[i].suit === maxSuit) {
        suitFreqArray[this.cards[i].value]++;
      }
    }
    for (let i = suitFreqArray.length; i >= 0; i--) {
      if (suitFreqArray[i] === 1) {
        flush.push(i);
        count++;
      }
      if (count === 5) {
        break;
      }
    }
    return flush;
  } else if (this.isStraight()) {
    let straight = [4];
    if (!this.valueFreq.slice(10, 15).includes(0)) {
      straight.push(14);
    } else if (!this.valueFreq.slice(9, 14).includes(0)) {
      straight.push(13);
    } else if (!this.valueFreq.slice(8, 13).includes(0)) {
      straight.push(12);
    } else if (!this.valueFreq.slice(7, 12).includes(0)) {
      straight.push(11);
    } else if (!this.valueFreq.slice(6, 11).includes(0)) {
      straight.push(10);
    } else if (!this.valueFreq.slice(5, 10).includes(0)) {
      straight.push(9);
    } else if (!this.valueFreq.slice(4, 9).includes(0)) {
      straight.push(8);
    } else if (!this.valueFreq.slice(3, 8).includes(0)) {
      straight.push(7);
    } else if (!this.valueFreq.slice(2, 7).includes(0)) {
      straight.push(6);
    } else {
      straight.push(5);
    }
    return straight;
  } else if (this.isThreeOfAKind()) {
    let threeOfAKind = [3];
    threeOfAKind.push(this.valueFreq.lastIndexOf(3));
    threeOfAKind.push(this.valueFreq.lastIndexOf(1));
    threeOfAKind.push(this.valueFreq.lastIndexOf(1, this.valueFreq.lastIndexOf(1) - 1));
    return threeOfAKind;
  } else if (this.isTwoPair()) {
    let twoPair = [2];
    twoPair.push(this.valueFreq.lastIndexOf(2));
    twoPair.push(this.valueFreq.lastIndexOf(2, this.valueFreq.lastIndexOf(2) - 1));
    twoPair.push(this.valueFreq.lastIndexOf(1));
    return twoPair;
  } else if (this.isPair()) {
    let pair = [1];
    let count = 0;
    pair.push(this.valueFreq.lastIndexOf(2));
    for (let i = this.valueFreq.length; i >= 0; i--) {
      if (this.valueFreq[i] === 1) {
        pair.push(i);
        count++;
      }
      if (count == 3) {
        break;
      }
    }
    return pair;
  } else if (this.isHighCard()) {
    let highCard = [0];
    let count = 0;
    for (let i = this.valueFreq.length; i >= 0; i--) {
      if (this.valueFreq[i] === 1) {
        highCard.push(i);
        count++;
      }
      if (count == 5) {
        break;
      }
    }
    return highCard;
  } else {
    ("Something Went Wrong!!");
  }
};
}

module.exports = {
  Card,
  Board,
  valueMapping
};