function calc(...args) {
  if (args.length < 3 || args.length % 2 !== 1) {
    throw new Error("Invalid input");
  }
  if (args.length > 3) {
    for (let i = 0; i < args.length; i += 2) {
      if (typeof args[i] !== "number") {
        throw new Error("Invalid input type");
      }
    }
    for (let i = 1; i < args.length; i += 2) {
      if (
        args[i] !== "+" &&
        args[i] !== "-" &&
        args[i] !== "/" &&
        args[i] !== "*"
      ) {
        throw new Error("Invalid operator");
      }
    }
    for (let i = 1; i < args.length; i += 2) {
      if (args[i] === "/") {
        if (args[i - 1] === 0 || args[i + 1] === 0) {
          throw new Error("Division by zero");
        }
      }
    }
    for (let i = 1; i < args.length; i += 2) {
      if (args[i] === "/" || args[i] === "*") {
        if (args[i - 1] > 1000) {
          args[i - 1] = 1;
        }
        if (args[i + 1] > 1000) {
          args[i + 1] = 1;
        }
      } else if (args[i] === "-" || args[i] === "+") {
        if (args[i - 1] > 1000) {
          args[i - 1] = 0;
        }
        if (args[i + 1] > 1000) {
          args[i + 1] = 0;
        }
      }
    }

    let expression = args.join("");
    let y = eval(expression);
    return y;
  }
  if (args[0] > 1000) {
    args[0] = 0;
  }
  let result = args[0];

  for (let i = 1; i < args.length; i += 2) {
    let operator = args[i];
    let operand = args[i + 1];
    if (args[i + 1] > 1000) {
      operand = 0;
    }

    if (typeof operand !== "number" || typeof result !== "number") {
      throw new Error("Invalid input type");
    }

    if (operand > 1000) {
      continue;
    }

    switch (operator) {
      case "+":
        result += operand;
        break;
      case "-":
        result -= operand;
        break;
      case "*":
        result *= operand;
        break;
      case "/":
        if (operand === 0) {
          throw new Error("Division by zero");
        }
        result /= operand;
        break;
      default:
        throw new Error("Invalid operator");
    }
  }

  return result;
}

module.exports = calc;
