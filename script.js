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

let num1 = 0;
let operator = "";
let num2 = 0;

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
let digitRegex = /\d/g;

let numsEntered = 0;
function buttonClick(e) {
  if (e.target.innerText === "C") {
    display2.innerText = 0;
    numsEntered = 0;
  }
  if (numsEntered === 0 && parseInt(e.target.innerText) === 0) {
  }
  else if (numsEntered === 0 && e.target.innerText >= 0 && e.target.innerText <= 9) {
    display2.innerText = e.target.innerText;
    numsEntered = 1;
  }
  else {
    if (e.target.innerText >= 0 && e.target.innerText <= 9) {
      display2.innerText += e.target.innerText;
    }
  }
  
}