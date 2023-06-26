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

let displayContainer = document.getElementById("display-container");
let display1 = document.getElementById("display1");
let display2 = document.getElementById("display2");
let allButtons = document.getElementsByTagName("button");
for (let i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", buttonClick);
}
window.addEventListener("keydown", buttonClick);

let num1 = null;
let operator = "";
let num2 = null;
let numEntered = 0;
let decimalEntered = 0;
let answer = 0;
let regEx = /\d+/g;
display2.style.fontSize = "70px";

function display2FontScale() {
  if (display2.clientWidth <= 358) {
    display2.style.fontSize = "70px";
  }
  if (display2.clientWidth > 358) {
    let display2FontSize = 70;
    while (display2.clientWidth > 358) {
      display2FontSize -= 1;
      display2.style.fontSize = display2FontSize + "px";
    }
  }
};

function display1FontScale() {
  if (display1.clientWidth <= 358) {
    display1.style.fontSize = "20px";
  }
  if (display1.clientWidth > 358) {
    let display1FontSize = 20;
    while (display1.clientWidth > 358) {
      display1FontSize -= 1;
      display1.style.fontSize = display1FontSize + "px";
    }
  }
};

function buttonClick(e) {
  let button = "";
  if (e.key) {
    button = e.key;
  }
  else {
    button = e.target.innerText;
  }

  if (button === "C") {
    display1.innerText = "";
    display2.innerText = 0;
    numEntered = 0;
    decimalEntered = 0;
    answer = 0;
    operator = "";
    display2.style.fontSize = "70px";
    num1 = null;
    num2 = null;
  }

  if (button === "Backspace") {
    if (display2.innerText.length <= 1) {
      display2.innerText = 0;
      numEntered = 0;
    }
    else {
      let numbers = display2.innerText.split("");
      numbers.pop();
      display2.innerText = numbers.join("");
    } 
  }

  if (button === "+/-") {
    if (parseFloat(display2.innerText) > 0) {
      let number = display2.innerText.split("");
      number.unshift("-");
      display2.innerText = number.join("");
    }
    else if (parseFloat(display2.innerText) < 0) {
      let number = display2.innerText.split("");
      number.shift();
      display2.innerText = number.join("");
    }
  }

  if (button === "+" || button === "-" || button === "*" || button === "/") {
    if (operator !== "" & answer === 0 && numEntered === 0) {
      operator = button;
      display1.innerText = `${num1} ${operator}`;
    }
    else if (operator !== "" && answer === 0) {
      num2 = parseFloat(display2.innerText);
      display1.innerText = ` ${operate(operator, num1, num2)} ${button}`;
      display2.innerText = operate(operator, num1, num2);
      num1 = parseFloat(display2.innerText);
      operator = button;
      numEntered = 0;
    }
    else if (operator !== "" && answer === 1) {
      num1 = parseFloat(display2.innerText);
      operator = button;
      display1.innerText = `${num1} ${operator}`
      numEntered = 0;
      answer = 0;
    }
    else {
      num1 = parseFloat(display2.innerText);
      operator = button;
      display1.innerText = `${display2.innerText} ${operator}`;
      decimalEntered = 0;
      numEntered = 0;
    }
  }

  if ((button === "=" || button === "Enter") && operator === "/" && answer === 0 && display2.innerText === "0") {
    num2 = parseFloat(display2.innerText);
    display1.innerText += ` ${display2.innerText} =`;
    display2.innerText = "Can't divide by zero";
  }
  else if ((button === "=" || button === "Enter") && operator !== "" && answer === 0) {
    num2 = parseFloat(display2.innerText);
    display1.innerText += ` ${display2.innerText} =`;
    display2.innerText = operate(operator, num1, num2);
    answer = 1;
    numEntered = 0;
  }
  else if ((button === "=" || button === "Enter") && operator !== "" && answer === 1) {
    num1 = parseFloat(display2.innerText);
    display1.innerText = `${num1} ${operator} ${num2} =`;
    display2.innerText = operate(operator, num1, num2);
    numEntered = 0;
  }
  else if ((button === "=" || button === "Enter") && operator === "" && answer === 0) {
    num1 = parseFloat(display2.innerText);
    display1.innerText = `${num1} =`;
  }

  if (button === "." && decimalEntered === 0 && operator === "") {
    display2.innerText += button;
    numEntered = 1;
    decimalEntered = 1;
  }
  else {
    if (button === "." && decimalEntered === 0 && numEntered === 0 && operator !== "") {
      display2.innerText = 0 + ".";
      numEntered = 1;
      decimalEntered = 1;
    }
    else if (button === "." && decimalEntered === 0 && numEntered === 1 && operator !== "") {
      display2.innerText += button;
    }
  }

  if (answer === 1 && button >= 0 && button <= 9) {
    if (numEntered === 0) {
      display1.innerText = "";
      answer = 0;
      num1 = null;
      operator = "";
      num2 = null;
    } 
  }

  if (operator === "" && numEntered === 0 && button >= 1 && button <= 9) {
    display2.innerText = button;
    numEntered = 1;
  }
  else if (operator === "" && numEntered === 1 && button >= 0 && button <= 9) {
    display2.innerText += button;
  }

  if (operator !== "" && numEntered === 0 && button >= 0 && button <= 9) {
    display2.innerText = button;
    numEntered = 1;
  }
  else if (operator !== "" && numEntered === 1 && button >= 0 && button <= 9) {
    if (display2.innerText !== "0") {
      display2.innerText += button;
    }
    else if (display2.innerText === "0") {
      display2.innerText = button;
    }
  }

  if (display2.innerText === "-") {
    display2.innerText = 0;
    numEntered = 0;
  }

  display1FontScale();
  display2FontScale();
  e.target.blur();
}