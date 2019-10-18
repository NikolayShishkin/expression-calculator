function eval() {
  // Do not use eval!!!
  return;
}

function expressionCalculator(expr) {
  // function to calculate string which does not contains brackets
  const calculateString = function(str) {
    let leftPart, rightPart, matchedExpression, resultString;

    while (str.match(/([\d\.])+[\/\*]+([\d\.])+/)) {
      matchedExpression = str.match(/([\d\.])+[\/\*]+([\d\.])+/)[0];
      leftPart = +matchedExpression.match(/([\d\.])+/)[0];
      rightPart = +matchedExpression.match(/([\d\.])+/g)[1];
      if (matchedExpression.includes('*')) {
        resultString = (leftPart * rightPart).toFixed(4).toString();
        str = str.replace(/([\d\.])+[\/\*]+([\d\.])+/, resultString);
      } else {
        if (rightPart === 0) {
          throw 'TypeError: Division by zero.';
        }
        resultString = (leftPart / rightPart).toFixed(4).toString();
        str = str.replace(
          /([\d\.])+[\/\*]+([\d\.])+/,
          (leftPart / rightPart).toString()
        );
      }
    }

    while (str.match(/([\d\.])+[\+-]+([\d\.])+/)) {
      matchedExpression = str.match(/([\d\.])+[\+-]+([\d\.])+/)[0];
      leftPart = +matchedExpression.match(/([\d\.])+/)[0];
      rightPart = +matchedExpression.match(/([\d\.])+/g)[1];
      if (matchedExpression.includes('+')) {
        resultString = (leftPart + rightPart).toString();
        str = str.replace(/([\d\.])+[\+-]+([\d\.])+/, resultString);
      } else {
        resultString = (leftPart - rightPart).toString();
        str = str.replace(/([\d\.])+[\+-]+([\d\.])+/, resultString);
      }
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
  let counter = 0;
  while (findUninterruptedBracketPair(expr) && counter < 50) {
    counter += 1;
    let bracketStart = findUninterruptedBracketPair(expr)[0];
    let bracketEnd = findUninterruptedBracketPair(expr)[1];
    let solvedString = calculateString(
      expr.slice(bracketStart + 1, bracketEnd)
    );
    expr = expr.slice(0, bracketStart) + solvedString + expr.slice(bracketEnd + 1);
  }
  expr = calculateString(expr);
  return +expr;
}

module.exports = {
  expressionCalculator
};
