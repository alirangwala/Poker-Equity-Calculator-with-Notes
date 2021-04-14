class Card {

  valueMapping = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 }
  value: string;
  suit: string;
  //takes in strings in format 2s, Tc, Qd, Ah (value + suit)
  constructor(public cardString: string){
    this.value = this.valueMapping[cardString[0]];
    this.suit = cardString[1];
  }
}

class Board {
  //takes in array of 7 cards

  constructor(public cards: Card[]) {
  }

  findValueFrequencies () {
    let valueFreq = new Map([
      [1, 0],
      [2, 0],
      [3, 0],
      [4, 0],
      [5, 0],
      [6, 0],
      [7, 0],
      [8, 0],
      [9, 0],
      [10, 0],
      [11, 0],
      [12, 0],
      [13, 0],
      [14, 0],
  ]);

    for (let i = 0; i < this.cards.length; i++) {
      let currentVal = +this.cards[i].value
      valueFreq.set(currentVal, valueFreq.get(currentVal)+1)
    }
    return valueFreq
  }

  findSuitFrequencies () {
    let freqObj = { 's': 0, 'h': 0, 'd': 0, 'c': 0 }
    for (let i = 0; i < this.cards.length; i++) {
      freqObj[this.cards[i].suit]++;
    }
    return freqObj
  }
}