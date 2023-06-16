function add(num1, num2) {
  return num1 + num2;
};

function subtract(num1, num2) {
  return num1 - num2;
};

function multiply(num1, num2) {
  return num1 * num2;
};

function divide(num1, num2) {
  return num1 / num2;
};

function operate(operator, num1, num2) {
  if (operator === "+") {
    return add(num1, num2);
  }
  else if (operator === "-") {
    return subtract(num1, num2);
  }
  else if (operator === "*") {
    return multiply(num1, num2);
  }
  else if (operator === "/") {
    return divide(num1, num2);
  }
  else {
    return "Error";
  };
};
let display1 = document.getElementById("display1");
let display2 = document.getElementById("display2");
let allButtons = document.getElementsByTagName("button");
for (let i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", buttonClick);
}

let num1 = 0;
let operator = "";
let num2 = 0;
let numEntered = 0;
let decimalEntered = 0;
let answer = 0;

function buttonClick(e) {
  if (e.target.innerText === "C") {
    display1.innerText = "";
    display2.innerText = 0;
    numEntered = 0;
    decimalEntered = 0;
    answer = 0;
    operator = "";
  }

  if (e.target.innerText === "+") {
    num1 = parseFloat(display2.innerText);
    operator = "+";
    display1.innerText = display2.innerText + " " + operator;
    decimalEntered = 0;
    numEntered = 0;
    // display2.innerText = "";
  }

  if (e.target.innerText === "=" && operator !== "" && answer === 0) {
    num2 = parseFloat(display2.innerText);
    display1.innerText += " " + display2.innerText + " =";
    display2.innerText = operate(operator, num1, num2);
    answer = 1;
  }
  else if (e.target.innerText === "=" && operator !== "" && answer === 1) {
    num1 = parseFloat(display2.innerText);
    display1.innerText = num1 + " " + operator + " " + num2 + " =";
    display2.innerText = operate(operator, num1, num2);
  }

  if (e.target.innerText === "." && decimalEntered === 0 && operator === "") {
    display2.innerText += e.target.innerText;
    numEntered = 1;
    decimalEntered = 1;
  }
  else {
    if (e.target.innerText === "." && decimalEntered === 0 && numEntered === 0 && operator !== "") {
      display2.innerText = 0 + ".";
      numEntered = 1;
      decimalEntered = 1;
    }
    else if (e.target.innerText === "." && decimalEntered === 0 && numEntered === 1 && operator !== "") {
      display2.innerText += e.target.innerText;
    }
  }

  if (operator === "" && numEntered === 0 && e.target.innerText >= 1 && e.target.innerText <= 9) {
    display2.innerText = e.target.innerText;
    numEntered = 1;
  }
  else if (operator === "" && numEntered === 1 && e.target.innerText >= 0 && e.target.innerText <= 9) {
    display2.innerText += e.target.innerText;
  }

  if (operator !== "" && numEntered === 0 && e.target.innerText >= 0 && e.target.innerText <= 9) {
    display2.innerText = e.target.innerText;
    numEntered = 1;
  }
  else if (operator !== "" && numEntered === 1 && e.target.innerText >= 0 && e.target.innerText <= 9) {
    if (display2.innerText !== "0") {
      display2.innerText += e.target.innerText;
    }
    else if (display2.innerText === "0") {
      display2.innerText = e.target.innerText;
    }
  }
}