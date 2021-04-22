const expect = require("chai").expect;
const { Card, Board } = require("../client/src/PokerFunctions/NLHClasses.js");
const holdem = require("../client/src/PokerFunctions/oddsCalc.js");

describe("Individual Hand Ranking Functions", function () {
  before(function () {
    testStraightFlushBoard = new Board([
      new Card("3d"),
      new Card("4d"),
      new Card("5d"),
      new Card("6d"),
      new Card("6s"),
      new Card("7d"),
      new Card("Kd"),
    ]);
    testStraightFlushBoard2 = new Board([
      new Card("3s"),
      new Card("4s"),
      new Card("5s"),
      new Card("2s"),
      new Card("6s"),
      new Card("As"),
      new Card("Kd"),
    ]);
  });
  it("Straight Flush should be true", function () {
    expect(testStraightFlushBoard.isStraightFlush()).to.eql(true);
  });
  it("Low Straight Flush should be true", function () {
    expect(testStraightFlushBoard2.isStraightFlush()).to.eql(true);
  });

  before(function () {
    testFourOfAKindBoard = new Board([
      new Card("3d"),
      new Card("6h"),
      new Card("6c"),
      new Card("6d"),
      new Card("6s"),
      new Card("Ah"),
      new Card("Kd"),
    ]);
  });
  it("Four of a Kind should be true", function () {
    expect(testFourOfAKindBoard.isFourOfAKind()).to.eql(true);
  });

  before(function () {
    testFullHouseBoard = new Board([
      new Card("3d"),
      new Card("6h"),
      new Card("6c"),
      new Card("Qd"),
      new Card("6s"),
      new Card("Qh"),
      new Card("Kd"),
    ]);
    testFullHouseBoard2 = new Board([
      new Card("Kd"),
      new Card("6h"),
      new Card("6c"),
      new Card("Qd"),
      new Card("6s"),
      new Card("Ks"),
      new Card("Kh"),
    ]);
  });
  it("Full House should be true", function () {
    expect(testFullHouseBoard.isFullHouse()).to.eql(true);
  });
  it("Full House should be true (if two three of a kinds)", function () {
    expect(testFullHouseBoard2.isFullHouse()).to.eql(true);
  });
  before(function () {
    testFlushBoard = new Board([
      new Card("3d"),
      new Card("6d"),
      new Card("6c"),
      new Card("Qd"),
      new Card("6s"),
      new Card("Ad"),
      new Card("Kd"),
    ]);
  });
  it("Flush should be true", function () {
    expect(testFlushBoard.isFlush()).to.eql(true);
  });
  before(function () {
    testStraightBoard = new Board([
      new Card("3d"),
      new Card("4h"),
      new Card("6c"),
      new Card("Qd"),
      new Card("5s"),
      new Card("Ah"),
      new Card("7d"),
    ]);
  });
  before(function () {
    testStraightBoard2 = new Board([
      new Card("3d"),
      new Card("4h"),
      new Card("2c"),
      new Card("Qd"),
      new Card("5s"),
      new Card("Ah"),
      new Card("Ad"),
    ]);
  });
  it("Straight should be true", function () {
    expect(testStraightBoard.isStraight()).to.eql(true);
  });
  it("Low Straight should be true", function () {
    expect(testStraightBoard.isStraight()).to.eql(true);
  });

  before(function () {
    testThreeOfAKindBoard = new Board([
      new Card("3d"),
      new Card("6h"),
      new Card("6c"),
      new Card("Qd"),
      new Card("6s"),
      new Card("Ah"),
      new Card("Kd"),
    ]);
  });
  it("Three of a kind should be true", function () {
    expect(testThreeOfAKindBoard.isThreeOfAKind()).to.eql(true);
  });

  before(function () {
    testTwoPairBoard = new Board([
      new Card("3d"),
      new Card("3h"),
      new Card("6c"),
      new Card("Qd"),
      new Card("6s"),
      new Card("Ah"),
      new Card("Kd"),
    ]);
  });
  it("Two Pair should be true", function () {
    expect(testTwoPairBoard.isTwoPair()).to.eql(true);
  });

  before(function () {
    testPairBoard = new Board([
      new Card("3d"),
      new Card("5h"),
      new Card("Jc"),
      new Card("Qd"),
      new Card("As"),
      new Card("Ah"),
      new Card("Kd"),
    ]);
  });
  it("Pair should be true", function () {
    expect(testPairBoard.isPair()).to.eql(true);
  });

  before(function () {
    testHighCardBoard = new Board([
      new Card("3d"),
      new Card("6h"),
      new Card("9c"),
      new Card("Qd"),
      new Card("Ts"),
      new Card("Ah"),
      new Card("Kd"),
    ]);
  });
  it("High Card should be true", function () {
    expect(testHighCardBoard.isHighCard()).to.eql(true);
  });
});

describe("Measure hand strength", function () {
  before(function () {
    testStraightFlushBoard = new Board([
      new Card("3d"),
      new Card("4d"),
      new Card("5d"),
      new Card("6d"),
      new Card("6s"),
      new Card("7d"),
      new Card("Kd"),
    ]);
    testStraightFlushBoard2 = new Board([
      new Card("3s"),
      new Card("4s"),
      new Card("5s"),
      new Card("2s"),
      new Card("6s"),
      new Card("As"),
      new Card("Kd"),
    ]);
  });
  it("Straight Flush should output top card in straight", function () {
    expect(testStraightFlushBoard.handStrength).to.eql([8, 7]);
  });
  it("Low Straight Flush should output top card in low straight", function () {
    expect(testStraightFlushBoard2.handStrength).to.eql([8, 5]);
  });
  before(function () {
    testFourOfAKindBoard = new Board([
      new Card("3d"),
      new Card("6h"),
      new Card("6c"),
      new Card("6d"),
      new Card("6s"),
      new Card("Ah"),
      new Card("Kd"),
    ]);
  });
  it("Four of a Kind should output object with correct value and kicker", function () {
    expect(testFourOfAKindBoard.handStrength).to.eql([7, 6, 14]);
  });
  before(function () {
    testFullHouseBoard = new Board([
      new Card("3d"),
      new Card("6h"),
      new Card("6c"),
      new Card("Qd"),
      new Card("6s"),
      new Card("Qh"),
      new Card("Kd"),
    ]);
    testFullHouseBoard2 = new Board([
      new Card("Kd"),
      new Card("6h"),
      new Card("6c"),
      new Card("Qd"),
      new Card("6s"),
      new Card("Ks"),
      new Card("Kh"),
    ]);
  });
  it("Full House should output object with correct three of a kind and pair", function () {
    expect(testFullHouseBoard.handStrength).to.eql([6, 6, 12]);
  });
  it("Full House should output object with correct three of a kind and pair (if two three of a kinds)", function () {
    expect(testFullHouseBoard2.handStrength).to.eql([6, 13, 6]);
  });
  before(function () {
    testFlushBoard = new Board([
      new Card("3d"),
      new Card("6d"),
      new Card("6c"),
      new Card("Qd"),
      new Card("6s"),
      new Card("Ad"),
      new Card("Kd"),
    ]);
  });
  it("Flush should output 5 high cards in order", function () {
    expect(testFlushBoard.handStrength).to.eql([5, 14, 13, 12, 6, 3]);
  });
  before(function () {
    testStraightBoard = new Board([
      new Card("3d"),
      new Card("4h"),
      new Card("6c"),
      new Card("Qd"),
      new Card("5s"),
      new Card("Ah"),
      new Card("7d"),
    ]);
  });
  before(function () {
    testStraightBoard2 = new Board([
      new Card("3d"),
      new Card("4h"),
      new Card("2c"),
      new Card("Qd"),
      new Card("5s"),
      new Card("Ah"),
      new Card("Ad"),
    ]);
  });
  it("Straight should output top card in straight", function () {
    expect(testStraightBoard.handStrength).to.eql([4, 7]);
  });
  it("Low Straight should output top card in low straight", function () {
    expect(testStraightBoard2.handStrength).to.eql([4, 5]);
  });
  before(function () {
    testThreeOfAKindBoard = new Board([
      new Card("3d"),
      new Card("6h"),
      new Card("6c"),
      new Card("Qd"),
      new Card("6s"),
      new Card("Ah"),
      new Card("Kd"),
    ]);
  });
  it("Three of a kind should output object with correct value and two kickers", function () {
    expect(testThreeOfAKindBoard.handStrength).to.eql([3, 6, 14, 13]);
  });

  before(function () {
    testTwoPairBoard = new Board([
      new Card("3d"),
      new Card("3h"),
      new Card("6c"),
      new Card("Qd"),
      new Card("6s"),
      new Card("Ah"),
      new Card("Kd"),
    ]);
  });
  it("Two Pair should output object with correct pair values and kicker", function () {
    expect(testTwoPairBoard.handStrength).to.eql([2, 6, 3, 14]);
  });

  before(function () {
    testPairBoard = new Board([
      new Card("3d"),
      new Card("5h"),
      new Card("Jc"),
      new Card("Qd"),
      new Card("As"),
      new Card("Ah"),
      new Card("Kd"),
    ]);
  });
  it("Pair should output object with correct Pair and three kickers", function () {
    expect(testPairBoard.handStrength).to.eql([1, 14, 13, 12, 11]);
  });

  before(function () {
    testHighCardBoard = new Board([
      new Card("3d"),
      new Card("6h"),
      new Card("9c"),
      new Card("Qd"),
      new Card("Ts"),
      new Card("Ah"),
      new Card("Kd"),
    ]);
  });
  it("High Card should output object with 5 kickers", function () {
    expect(testHighCardBoard.handStrength).to.eql([0, 14, 13, 12, 10, 9]);
  });
});

describe("Compare Hands", function () {
  before(function () {
    hand1 = new Board([
      new Card("3d"),
      new Card("3h"),
      new Card("6c"),
      new Card("Qd"),
      new Card("6s"),
      new Card("Ah"),
      new Card("Kd"),
    ]);
    hand2 = new Board([
      new Card("Kd"),
      new Card("6h"),
      new Card("6c"),
      new Card("Qd"),
      new Card("6s"),
      new Card("Ks"),
      new Card("Kh"),
    ]);
    hand3 = new Board([
      new Card("3d"),
      new Card("5h"),
      new Card("Jc"),
      new Card("Qd"),
      new Card("As"),
      new Card("Ah"),
      new Card("Kd"),
    ]);
    hands = [hand1, hand2, hand3];

    hand1Tie = new Board([
      new Card("3d"),
      new Card("3h"),
      new Card("6c"),
      new Card("Qd"),
      new Card("8s"),
      new Card("Jh"),
      new Card("2d"),
    ]);
    hand2Tie = new Board([
      new Card("Ad"),
      new Card("Kh"),
      new Card("6c"),
      new Card("Qd"),
      new Card("6s"),
      new Card("Qs"),
      new Card("2h"),
    ]);
    hand3Tie = new Board([
      new Card("As"),
      new Card("Kc"),
      new Card("6c"),
      new Card("Qd"),
      new Card("6s"),
      new Card("Qh"),
      new Card("2d"),
    ]);
    handsTie = [hand1Tie, hand2Tie, hand3Tie];
  });
  it("Expect player 0 to win and display strength", function () {
    expect(holdem.compareHands(hands)).to.eql([1]);
  });

  it("Expect player 0 to win and display strength", function () {
    expect(holdem.compareHands(handsTie)).to.eql([1, 2]);
  });
});
