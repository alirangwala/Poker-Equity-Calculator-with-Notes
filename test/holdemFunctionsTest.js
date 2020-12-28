const expect = require('chai').expect;
const holdem = require('../client/PokerFunctions/holdemFunctions.js');
const Card = holdem.Card;
const Board = holdem.Board;



describe('Individual Hand Ranking Functions', function () {
  before(function () {
    testStraightFlushBoard = new Board([new Card('3d'), new Card('4d'), new Card('5d'), new Card('6d'), new Card('6s'), new Card('7d'), new Card('Kd')])
    testStraightFlushBoard2 = new Board([new Card('3s'), new Card('4s'), new Card('5s'), new Card('2s'), new Card('6s'), new Card('As'), new Card('Kd')])
  })
  it('Straight Flush should be true', function () {
    expect(detectStraightFlush(testStraightFlushBoard)).to.eql(true)
  })
  it('Low Straight Flush should be true', function () {
    expect(detectStraightFlush(testStraightFlushBoard2)).to.eql(true)
  })

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
    testStraightBoard = new Board([new Card('3d'), new Card('4h'), new Card('6c'), new Card('Qd'), new Card('5s'), new Card('Ah'), new Card('7d')])
  })
  before(function () {
    testStraightBoard2 = new Board([new Card('3d'), new Card('4h'), new Card('2c'), new Card('Qd'), new Card('5s'), new Card('Ah'), new Card('Ad')])
  })
  it('Straight should be true', function () {
    expect(detectStraight(testStraightBoard)).to.eql(true)
  })
  it('Low Straight should be true', function () {
    expect(detectStraight(testStraightBoard2)).to.eql(true)
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
    testStraightFlushBoard = new Board([new Card('3d'), new Card('4d'), new Card('5d'), new Card('6d'), new Card('6s'), new Card('7d'), new Card('Kd')])
    testStraightFlushBoard2 = new Board([new Card('3s'), new Card('4s'), new Card('5s'), new Card('2s'), new Card('6s'), new Card('As'), new Card('Kd')])
  })
  xit('Straight Flush should output top card in straight', function () {
    expect(handStrength(testStraightFlushBoard)).to.eql([8, 7])
  })
  xit('Low Straight Flush should output top card in low straight', function () {
    expect(handStrength(testStraightFlushBoard2)).to.eql([8, 5])
  })
  before(function () {
    testFourOfAKindBoard = new Board([new Card('3d'), new Card('6h'), new Card('6c'), new Card('6d'), new Card('6s'), new Card('Ah'), new Card('Kd')])
  })
  it('Four of a Kind should output object with correct value and kicker', function () {
    expect(handStrength(testFourOfAKindBoard)).to.eql([7, 6, 14])
  })
  before(function () {
    testFullHouseBoard = new Board([new Card('3d'), new Card('6h'), new Card('6c'), new Card('Qd'), new Card('6s'), new Card('Qh'), new Card('Kd')])
    testFullHouseBoard2 = new Board([new Card('Kd'), new Card('6h'), new Card('6c'), new Card('Qd'), new Card('6s'), new Card('Ks'), new Card('Kh')])
  })
  it('Full House should output object with correct three of a kind and pair', function () {
    expect(handStrength(testFullHouseBoard)).to.eql([6, 6, 12])
  })
  it('Full House should output object with correct three of a kind and pair (if two three of a kinds)', function () {
    expect(handStrength(testFullHouseBoard2)).to.eql([6, 13, 6])
  })
  before(function () {
    testFlushBoard = new Board([new Card('3d'), new Card('6d'), new Card('6c'), new Card('Qd'), new Card('6s'), new Card('Ad'), new Card('Kd')])
  })
  it('Flush should output 5 high cards in order', function () {
    expect(handStrength(testFlushBoard)).to.eql([5, 14, 13, 12, 6, 3])
  })
  before(function () {
    testStraightBoard = new Board([new Card('3d'), new Card('4h'), new Card('6c'), new Card('Qd'), new Card('5s'), new Card('Ah'), new Card('7d')])
  })
  before(function () {
    testStraightBoard2 = new Board([new Card('3d'), new Card('4h'), new Card('2c'), new Card('Qd'), new Card('5s'), new Card('Ah'), new Card('Ad')])
  })
  it('Straight should output top card in straight', function () {
    expect(handStrength(testStraightBoard)).to.eql([4, 7])
  })
  it('Low Straight should output top card in low straight', function () {
    expect(handStrength(testStraightBoard2)).to.eql([4, 5])
  })
  before(function () {
    testThreeOfAKindBoard = new Board([new Card('3d'), new Card('6h'), new Card('6c'), new Card('Qd'), new Card('6s'), new Card('Ah'), new Card('Kd')])
  })
  it('Three of a kind should output object with correct value and two kickers', function () {
    expect(handStrength(testThreeOfAKindBoard)).to.eql([3, 6, 14, 13])
  })

  before(function () {
    testTwoPairBoard = new Board([new Card('3d'), new Card('3h'), new Card('6c'), new Card('Qd'), new Card('6s'), new Card('Ah'), new Card('Kd')])
  })
  it('Two Pair should output object with correct pair values and kicker', function () {
    expect(handStrength(testTwoPairBoard)).to.eql([2, 6, 3, 14])
  })

  before(function () {
    testPairBoard = new Board([new Card('3d'), new Card('5h'), new Card('Jc'), new Card('Qd'), new Card('As'), new Card('Ah'), new Card('Kd')])
  })
  it('Pair should output object with correct Pair and three kickers', function () {
    expect(handStrength(testPairBoard)).to.eql([1, 14, 13, 12, 11])
  })

  before(function () {
    testHighCardBoard = new Board([new Card('3d'), new Card('6h'), new Card('9c'), new Card('Qd'), new Card('Ts'), new Card('Ah'), new Card('Kd')])
  })
  it('High Card should output object with 5 kickers', function () {
    expect(handStrength(testHighCardBoard)).to.eql([0, 14, 13, 12, 10, 9])
  })
})

describe('Compare Hands', function () {
  before(function () {
    hand1 = new Board([new Card('3d'), new Card('3h'), new Card('6c'), new Card('Qd'), new Card('6s'), new Card('Ah'), new Card('Kd')])
    hand2 = new Board([new Card('Kd'), new Card('6h'), new Card('6c'), new Card('Qd'), new Card('6s'), new Card('Ks'), new Card('Kh')])
    hand3 = new Board([new Card('3d'), new Card('5h'), new Card('Jc'), new Card('Qd'), new Card('As'), new Card('Ah'), new Card('Kd')])
    hands = [hand1, hand2, hand3]
  })
  it('Expect player 0 to win and display strength', function () {
    expect(compareHands(hands)).to.eql([1, [6, 13, 6]])
  })
})