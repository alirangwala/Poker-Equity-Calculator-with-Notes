var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var holdem = require("./NLHClasses");
var compareHands = function (arrayOfBoards) {
    var handStrengths = [];
    for (var i = 0; i < arrayOfBoards.length; i++) {
        var board = arrayOfBoards[i];
        handStrengths.push(board.handStrength);
    }
    // helper function to check matching arrays
    var arraysMatch = function (arr1, arr2) {
        if (arr1.length !== arr2.length)
            return false;
        for (var i = 0; i < arr1.length; i++) {
            if (arr1[i] !== arr2[i])
                return false;
        }
        return true;
    };
    // first term is array because if there is a tie there are multiple winners
    var winningPlayerAndHand = [[0], handStrengths[0]];
    for (var i = 1; i < handStrengths.length; i++) {
        if (arraysMatch(winningPlayerAndHand[1], handStrengths[i])) {
            winningPlayerAndHand[0].push(i);
        }
        else if (winningPlayerAndHand[1] < handStrengths[i]) {
            winningPlayerAndHand = [[i], handStrengths[i]];
        }
        else {
            continue;
        }
    }
    return winningPlayerAndHand[0];
};
var suits = ['s', 'h', 'd', 'c'];
// leave output as array of strings NOT Cards
var generateAllCards = function () {
    var allCards = [];
    var valueArray = Object.keys(holdem.valueMapping);
    for (var i = 0; i < valueArray.length; i++) {
        for (var j = 0; j < suits.length; j++) {
            allCards.push(valueArray[i] + suits[j]);
        }
    }
    return allCards;
};
var deck = generateAllCards();
//console.log(deck)
// boards have to exclude the exposed cards of all players
var generateRandomBoard = function (holdings, communityCards) {
    if (communityCards === void 0) { communityCards = []; }
    var allCards = __spreadArray([], deck);
    // remove holdings and community cards from deck so no repeat cards
    var unexposedCards = allCards.filter(function (card) { return holdings.flat().concat(communityCards).indexOf(card) < 0; });
    var unexposedCardsClone = __spreadArray([], unexposedCards);
    //covert string to Card
    var board = __spreadArray([], communityCards.map(function (card) { return new holdem.Card(card); }));
    for (var j = 0; j < 5 - communityCards.length; j++) {
        var randomIndex = Math.floor(Math.random() * unexposedCardsClone.length);
        //covert string to Card
        board.push(new holdem.Card(unexposedCardsClone[randomIndex]));
        unexposedCardsClone.splice(randomIndex, 1);
    }
    return board;
};
// takes in array of holdings, community cards and sims
var monteCarloSim = function (holdings, communityCards, numberSims) {
    // make an empty array. Each index will be incremented when that player wins
    if (communityCards === void 0) { communityCards = []; }
    if (numberSims === void 0) { numberSims = 1000; }
    // first item will be winners, second will be ties
    var results = [];
    // first item will be winners, second will be ties
    // let results = new Array(holdings.length).fill([0, 0])
    for (var i = 0; i < holdings.length; i++) {
        results = __spreadArray(__spreadArray([], results), [[0, 0]]);
    }
    for (var i = 0; i < numberSims; i++) {
        var playersFullHands = [];
        var randomBoard = generateRandomBoard(holdings, communityCards);
        for (var j = 0; j < holdings.length; j++) {
            var holeCards = holdings[j];
            playersFullHands.push(new holdem.Board(__spreadArray(__spreadArray([], holeCards.map(function (card) { return new holdem.Card(card); })), randomBoard)));
        }
        var comparison = compareHands(playersFullHands);
        if (comparison.length === 1) {
            console.log(comparison);
            results[comparison[0]][0]++;
        }
        else {
            for (var k = 0; k < comparison.length; k++) {
                results[comparison[k]][1]++;
            }
        }
    }
    return results.map(function (result) { return [
        result[0] / numberSims,
        result[1] / numberSims,
    ]; });
};
var player1 = ["As", "7s"];
var player2 = ["3d", "3s"];
var player3 = ['4c', '5d'];
var player4 = ['8h', '7d'];
// let playersHoldings = [player1, player2];
var playersHoldings = [player1, player2, player3, player4];
var communityCards = ["Js", "Jd", "7c"];
console.log(generateRandomBoard(playersHoldings, communityCards));
console.log(monteCarloSim(playersHoldings, communityCards));
console.time();
console.log("inputs", playersHoldings, communityCards);
console.timeEnd();
module.exports = { compareHands: compareHands, generateAllCards: generateAllCards, monteCarloSim: monteCarloSim };
