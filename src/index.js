function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  // function to calculate string which does not contains brackets
  const calculateString = function(str) {
    let leftPart, rightPart;
    while (str.match(/(\d)+\*(\d)+/)) {
      // while we can find '*', continue extracting
      leftPart = +str.match(/(\d)+\*(\d)+/)[0].match(/(\d)+/)[0]; //multyplying expression
      rightPart = +str.match(/(\d)+\*(\d)+/)[0].match(/(\d)+/g)[1]; // calculating it and replacing it in original string
      str = str.replace(/(\d)+\*(\d)+/, (leftPart * rightPart).toString());
    }
    while (str.match(/(\d)+\/(\d)+/)) {
      leftPart = +str.match(/(\d)+\/(\d)+/)[0].match(/(\d)+/)[0]; //same for dividing and other operations
      rightPart = +str.match(/(\d)+\/(\d)+/)[0].match(/(\d)+/g)[1];
      if (rightPart === 0) {
        throw 'TypeError: Division by zero.';
      }
      str = str.replace(/(\d)+\/(\d)+/, (leftPart / rightPart).toString());
    }
    while (str.match(/(\d)+\+(\d)+/)) {
      leftPart = +str.match(/(\d)+\+(\d)+/)[0].match(/(\d)+/)[0];
      rightPart = +str.match(/(\d)+\+(\d)+/)[0].match(/(\d)+/g)[1];
      str = str = str.replace(
        /(\d)+\+(\d)+/,
        (leftPart + rightPart).toString()
      );
    }
    if (str.match(/(\d)+\-(\d)+/)) {
      leftPart = +str.match(/(\d)+\-(\d)+/)[0].match(/(\d)+/)[0];
      rightPart = +str.match(/(\d)+\-(\d)+/)[0].match(/(\d)+/g)[1];
      str = str.replace(/(\d)+\-(\d)+/, (leftPart - rightPart).toString());
    }
    return str;
  };
  //function to find deepest bracket pair
  const findUninterruptedBracketPair = function(str) {
    let leftBracketPosition = -1;
    let rightBracketPosition = str.indexOf(')');
    if (rightBracketPosition === -1) {
      return false;
    }
    leftBracketPosition = str.lastIndexOf('(', rightBracketPosition);
    return [leftBracketPosition, rightBracketPosition];
  };

  //validate correct brackets placements(code from bracket task)
  const validateBrackets = function(str) {
    str = str.replace(/[^\(\)]/g, '');
    let stringLength = str.length;
    if (stringLength % 2 !== 0) {
      return false;
    }
    while (stringLength > 0) {
      const checkForPair = function() {
        for (let i = 0; i < stringLength - 1; i += 1) {
          if (
            str[i] === '(' && // if first element is opening bracket
            str[i + 1] === ')' //and second element corresponding closing bracket
          ) {
            str = str.slice(0, i) + str.slice(i + 2); //then we remove them from string and start search
            return true; //from start of the string
          }
        }
        return false;
      };

      if (checkForPair()) {
        stringLength -= 2;
      } else {
        return false;
      }
    }
    return true;
  };

  expr = expr.replace(/\s/g, ''); //remove spaces
  if (!validateBrackets(expr)) {
    throw 'ExpressionError: Brackets must be paired';
  }
  while (findUninterruptedBracketPair(expr)) {
    let bracketStart = findUninterruptedBracketPair(expr)[0];
    let bracketEnd = findUninterruptedBracketPair(expr)[1];
    let solvedString = calculateString(
      expr.slice(bracketStart + 1, bracketEnd - 1)
    );
    expr = expr.slice(0, bracketStart) + solvedString + expr.slice(bracketEnd);
  }
  expr = calculateString(expr);
  return +expr;
}

module.exports = {
  expressionCalculator
};
