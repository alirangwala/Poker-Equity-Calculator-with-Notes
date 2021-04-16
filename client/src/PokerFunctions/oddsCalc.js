var holdem = require('./functions.js');
var compareHands = function (arrayOfBoards) {
    var handStrengths = [];
    for (var j = 0; j < arrayOfBoards.length; j++) {
        var board = arrayOfBoards[j];
        handStrengths.push(board.handStrength);
    }
    // helper function to check matching arrays
    var arraysMatch = function (arr1, arr2) {
        if (arr1.length !== arr2.length)
            return false;
        for (var x = 0; x < arr1.length; x++) {
            if (arr1[x] !== arr2[x])
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
var valueMapping = { '2': 2, '3': 3, '4': 4, '5': 5, '6': 6, '7': 7, '8': 8, '9': 9, 'T': 10, 'J': 11, 'Q': 12, 'K': 13, 'A': 14 };
var suits = ['s', 'h', 'd', 'c'];
var generateAllCards = function () {
    var allCards = [];
    var valueArray = Object.keys(valueMapping);
    for (var i = 0; i < valueArray.length; i++) {
        for (var j = 0; j < suits.length; j++)
            allCards.push(valueArray[i] + suits[j]);
    }
    return allCards;
};
