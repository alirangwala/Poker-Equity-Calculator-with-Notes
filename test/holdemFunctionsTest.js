
const expect = require('chai').expect;
const holdem = require('../client/PokerFunctions/holdemFunctions.js');
const Card = holdem.Card;
const Board = holdem.Board;



describe('Basic Hand Ranking', function () {
  before(function () {
    testCards = new Board([new Card('3d'), new Card('6h'), new Card('6c'), new Card('6d'), new Card('6s'), new Card('Ah'), new Card('Kd')])
  })
  it('Quads', function () {
    expect(detectFourOfAKind(testCards)).to.eql({ fourOfAKind: 6, highcard: 14 })
  })
})
