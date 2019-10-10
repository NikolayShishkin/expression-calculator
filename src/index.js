function eval() {
    // Do not use eval!!!
    return;
}

function expressionCalculator(expr) {
    const calculateString = function(str){
        let leftPart, rightPart;
        while (str.match(/(\d)+\*(\d)+/)){                               // while we can find '*', continue extracting
            leftPart = +str.match(/(\d)+\*(\d)+/)[0].match(/(\d)+/)[0];  //multyplying expression
            rightPart = +str.match(/(\d)+\*(\d)+/)[0].match(/(\d)+/g)[1];  // calculating it and replacing it in original string
            str.replace(/(\d)+\*(\d)+/, (leftPart * rightPart).toString());
        };
        while (str.match(/(\d)+\/(\d)+/)){
            leftPart = str.match(/(\d)+\/(\d)+/)[0].match(/(\d)+/)[0];  //same for dividing and other operations
            rightPart = +str.match(/(\d)+\/(\d)+/)[0].match(/(\d)+/g)[1];
            str.replace(/(\d)+\/(\d)+/, (leftPart / rightPart).toString());
        };
        while (str.match(/(\d)+\+(\d)+/)){
            leftPart = str.match(/(\d)+\+(\d)+/)[0].match(/(\d)+/)[0];
            rightPart = +str.match(/(\d)+\+(\d)+/)[0].match(/(\d)+/g)[1];
            str.replace(/(\d)+\+(\d)+/, (leftPart + rightPart).toString());
        };
        while (str.match(/(\d)+\-(\d)+/)){
            leftPart = str.match(/(\d)+\-(\d)+/)[0].match(/(\d)+/)[0];
            rightPart = +str.match(/(\d)+\-(\d)+/)[0].match(/(\d)+/g)[1];
            str.replace(/(\d)+\+(\d)+/, (leftPart - rightPart).toString());
        };
        return str;
    }
    const findUninterruptedBracketPair = function(str){
        let leftBracketPosition = -1;
        let rightBracketPosition = str.indexOf(')');;
        if (rightBracketPosition === -1){
            return false;
        }
        leftBracketPosition = str.lastIndexOf('(', rightBracketPosition);
        return '!';
    }
    while (findUninterruptedBracketPair(expr)){
        let bracketStart = findUninterruptedBracketPair(expr)[0];
        let bracketEnd = findUninterruptedBracketPair(expr)[1];
        let solvedString = calculateString(expr.slice(bracketStart + 1, bracketEnd - 1));
        expr = expr.slice(0, stringStart) + solvedString + expr.slice(bracketEnd);
    }
    expr = calculateString(expr);
    return +expr;
}

module.exports = {
    expressionCalculator
}