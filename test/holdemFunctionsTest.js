const expect = require('chai').expect;
const holdem = require('../client/PokerFunctions/holdemFunctions.js');
const Card = holdem.Card;
const Board = holdem.Board;



describe('Individual Hand Ranking Functions', function () {
  before(function () {
    testFourOfAKindBoard = new Board([new Card('3d'), new Card('6h'), new Card('6c'), new Card('6d'), new Card('6s'), new Card('Ah'), new Card('Kd')])
  })
  it('Four of a Kind should be true', function () {
    expect(detectFourOfAKind(testFourOfAKindBoard)).to.eql(true)
  })

  before(function () {
    testFullHouseBoard = new Board([new Card('3d'), new Card('6h'), new Card('6c'), new Card('Qd'), new Card('6s'), new Card('Qh'), new Card('Kd')])
    testFullHouseBoard2 = new Board([new Card('Kd'), new Card('6h'), new Card('6c'), new Card('Qd'), new Card('6s'), new Card('Ks'), new Card('Kh')])
  })
  it('Full House should be true', function () {
    expect(detectFullHouse(testFullHouseBoard)).to.eql(true)
  })
  it('Full House should be true (if two three of a kinds)', function () {
    expect(detectFullHouse(testFullHouseBoard2)).to.eql(true)
  })

  before(function () {
    testFlushBoard = new Board([new Card('3d'), new Card('6d'), new Card('6c'), new Card('Qd'), new Card('6s'), new Card('Ad'), new Card('Kd')])
  })
  it('Flush should be true', function () {
    expect(detectFlush(testFlushBoard)).to.eql(true)
  })
  before(function () {
    testThreeOfAKindBoard = new Board([new Card('3d'), new Card('6h'), new Card('6c'), new Card('Qd'), new Card('6s'), new Card('Ah'), new Card('Kd')])
  })
  it('Three of a kind should be true', function () {
    expect(detectThreeOfAKind(testThreeOfAKindBoard)).to.eql(true)
  })

  before(function () {
    testTwoPairBoard = new Board([new Card('3d'), new Card('3h'), new Card('6c'), new Card('Qd'), new Card('6s'), new Card('Ah'), new Card('Kd')])
  })
  it('Two Pair should be true', function () {
    expect(detectTwoPair(testTwoPairBoard)).to.eql(true)
  })

  before(function () {
    testPairBoard = new Board([new Card('3d'), new Card('5h'), new Card('Jc'), new Card('Qd'), new Card('As'), new Card('Ah'), new Card('Kd')])
  })
  it('Pair should be true', function () {
    expect(detectPair(testPairBoard)).to.eql(true)
  })

  before(function () {
    testHighCardBoard = new Board([new Card('3d'), new Card('6h'), new Card('9c'), new Card('Qd'), new Card('Ts'), new Card('Ah'), new Card('Kd')])
  })
  it('High Card should be true', function () {
    expect(detectHighCard(testHighCardBoard)).to.eql(true)
  })
})

describe('Measure hand strength', function () {
  before(function () {
    testFourOfAKindBoard = new Board([new Card('3d'), new Card('6h'), new Card('6c'), new Card('6d'), new Card('6s'), new Card('Ah'), new Card('Kd')])
  })
  it('Four of a Kind should output object with correct value and kicker', function () {
    expect(handStrength(testFourOfAKindBoard)).to.eql({ fourOfAKind: 6, kicker: 14 })
  })

  before(function () {
    testFullHouseBoard = new Board([new Card('3d'), new Card('6h'), new Card('6c'), new Card('Qd'), new Card('6s'), new Card('Qh'), new Card('Kd')])
    testFullHouseBoard2 = new Board([new Card('Kd'), new Card('6h'), new Card('6c'), new Card('Qd'), new Card('6s'), new Card('Ks'), new Card('Kh')])
  })
  it('Full House should output object with correct three of a kind and pair', function () {
    expect(handStrength(testFullHouseBoard)).to.eql({ threeOfAKind: 6, pair: 12 })
  })
  it('Full House should output object with correct three of a kind and pair (if two three of a kinds)', function () {
    expect(handStrength(testFullHouseBoard2)).to.eql({ threeOfAKind: 13, pair: 6 })
  })

  before(function () {
    testThreeOfAKindBoard = new Board([new Card('3d'), new Card('6h'), new Card('6c'), new Card('Qd'), new Card('6s'), new Card('Ah'), new Card('Kd')])
  })
  it('Three of a kind should output object with correct value and two kickers', function () {
    expect(handStrength(testThreeOfAKindBoard)).to.eql({ threeOfAKind: 6, kicker: 14, secondKicker: 13 })
  })

  before(function () {
    testTwoPairBoard = new Board([new Card('3d'), new Card('3h'), new Card('6c'), new Card('Qd'), new Card('6s'), new Card('Ah'), new Card('Kd')])
  })
  it('Two Pair should output object with correct pair values and kicker', function () {
    expect(handStrength(testTwoPairBoard)).to.eql({ topPair: 6, bottomPair: 3, kicker: 14 })
  })

  before(function () {
    testPairBoard = new Board([new Card('3d'), new Card('5h'), new Card('Jc'), new Card('Qd'), new Card('As'), new Card('Ah'), new Card('Kd')])
  })
  it('Pair should output object with correct Pair and three kickers', function () {
    expect(handStrength(testPairBoard)).to.eql({ pair: 14, kicker: 13, secondKicker: 12, thirdKicker: 11 })
  })

  before(function () {
    testHighCardBoard = new Board([new Card('3d'), new Card('6h'), new Card('9c'), new Card('Qd'), new Card('Ts'), new Card('Ah'), new Card('Kd')])
  })
  it('High Card should output object with 5 kickers', function () {
    expect(handStrength(testHighCardBoard)).to.eql({ highCard: 14, kicker: 13, secondKicker: 12, thirdKicker: 10, fourthKicker: 9 })
  })
})