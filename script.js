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

let num1 = 0;
let operator = "";
let num2 = 0;
let numEntered = 0;
let decimalEntered = 0;
let answer = 0;
let regEx = /\d+/g;
display2.style.fontSize = "70px";

function fontScale() {
  if (display2.clientWidth <= 358) {
    display2.style.fontSize = "70px";
  }
  if (display2.clientWidth > 358) {
    // display2FontSize = regEx.exec(display2.style.fontSize)[0];
    let display2FontSize = 70;
    while (display2.clientWidth > 358) {
      display2FontSize -= 1;
      display2.style.fontSize = display2FontSize + "px";
    }
  }
};

function buttonClick(e) {
  if (e.target.innerText === "C") {
    display1.innerText = "";
    display2.innerText = 0;
    numEntered = 0;
    decimalEntered = 0;
    answer = 0;
    operator = "";
    display2.style.fontSize = "70px";
  }

  if (e.target.innerText === "+" || e.target.innerText === "-" || e.target.innerText === "*" || e.target.innerText === "/") {
    num1 = parseFloat(display2.innerText);
    operator = e.target.innerText;
    display1.innerText = `${display2.innerText} ${operator}`;
    decimalEntered = 0;
    numEntered = 0;
  }

  if (e.target.innerText === "=" && operator !== "" && answer === 0) {
    num2 = parseFloat(display2.innerText);
    display1.innerText += ` ${display2.innerText} =`;
    display2.innerText = operate(operator, num1, num2);
    answer = 1;
    fontScale();
  }
  else if (e.target.innerText === "=" && operator !== "" && answer === 1) {
    num1 = parseFloat(display2.innerText);
    display1.innerText = `${num1} ${operator} ${num2} =`;
    display2.innerText = operate(operator, num1, num2);
    fontScale();
  }
  else if (e.target.innerText === "=" && operator === "" && answer === 0) {
    num1 = parseFloat(display2.innerText);
    display1.innerText = num1 + " =";
    fontScale();
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



// display2.style.fontSize = "70px";
// let regExNum = parseInt(regEx.exec(display2.style.fontSize)[0]);
// console.log(regExNum);
// console.log(display2.clientWidth);
// console.log(displayContainer.clientWidth);

// if (display2.clientWidth > 360) {
//   display2.style.fontSize = "70px";
//   let newFontSize = parseInt(regEx.exec(display2.style.fontSize)[0]);
//   while (display2.clientWidth > 360) {
//     newFontSize -= 1;
//     display2.style.fontSize = newFontSize + "px";
//   }
// }