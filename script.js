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
  else if (operator === "−") {
    return subtract(num1, num2);
  }
  else if (operator === "×") {
    return multiply(num1, num2);
  }
  else if (operator === "÷") {
    return divide(num1, num2);
  }
  else {
    return "operate error";
  };
};

// Dark/light theme selection
let themeSelector = document.getElementById("theme-selector");
themeSelector.addEventListener("click", themeToggle);

function themeToggle() {
  let htmlElement = document.getElementsByTagName("html");
  if (htmlElement[0].classList[0] === "theme-dark") {
    htmlElement[0].classList = "theme-light";
  }
  else {
    htmlElement[0].classList = "theme-dark";
  }
};

let displayContainer = document.getElementById("display-container");
let display1 = document.getElementById("display1");
let display2 = document.getElementById("display2");
let allButtons = document.getElementsByTagName("button");

// Mouse click event listener for all buttons
for (let i = 0; i < allButtons.length; i++) {
  allButtons[i].addEventListener("click", buttonClick);
};

// Keyboard keydown event listeners
window.addEventListener("keydown", buttonClick);
window.addEventListener("keydown", addKeyHighlight);

// Add button highlight class on keydown event
function addKeyHighlight(e) {
  for (let i = 0; i < allButtons.length; i++) {
    if (allButtons[i].innerText === e.key) {
      allButtons[i].classList.add("highlight");
    }
    else if (allButtons[i].innerText === "C" && e.key === "c") {
      allButtons[i].classList.add("highlight");
    }
    else if (allButtons[i].innerText === "=" && e.key === "Enter") {
      allButtons[i].classList.add("highlight");
    }
  }
  setTimeout(removeKeyHighlight, 100);
};

// Remove button highlight class after keydown event
function removeKeyHighlight() {
  for (let i = 0; i < allButtons.length; i++) {
    allButtons[i].classList.remove("highlight");
  }
};

let num1 = null;
let operator = "";
let num2 = null;
let numEntered = 0;
let decimalEntered = 0;
let answer = 0;
let negativeNum = 0;
let numRegEx = /[^.]+/g;
let commaRegEx = /[,]+/g;
let allNumRegEx = /[0-9,.]+/g;
let exponentialRegEx = /[e][+-]/g;
let savedNum = "0";
display2.style.fontSize = "80px";

// Scale display2 (larger text) font size to fit within displayContainer
function display2FontScale() {
  if (display2.clientWidth <= displayContainer.clientWidth) {
    display2.style.fontSize = "80px";
  }
  if (display2.clientWidth > displayContainer.clientWidth) {
    let display2FontSize = 80;
    while (display2.clientWidth > displayContainer.clientWidth) {
      display2FontSize -= 1;
      display2.style.fontSize = display2FontSize + "px";
    }
  }
};

// Scale display1 (smaller text) font size to fit within displayContainer
function display1FontScale() {
  if (display1.clientWidth <= displayContainer.clientWidth) {
    display1.style.fontSize = "22px";
  }
  if (display1.clientWidth > displayContainer.clientWidth) {
    let display1FontSize = 22;
    while (display1.clientWidth > displayContainer.clientWidth) {
      display1FontSize -= 1;
      display1.style.fontSize = display1FontSize + "px";
    }
  }
};

// Insert commas into integers where appropriate (for use in display1 and display2)
function commaInsert(num) {
  if (num.match(allNumRegEx)) {
    let fullNum = num.match(numRegEx);
    let numWhole = fullNum[0];
    let numFraction = null;

    // If number is fractional, copy fraction part (index 1) to numFraction
    if (fullNum[1]) {
      numFraction = fullNum[1];
    }

    // If numWhole contains commas, remove them and resave string to numWhole
    if (numWhole) {
      let x = [];
      for (let i = 0; i < numWhole.length; i++) {
        if (numWhole[i] === ",") {
          x = numWhole.split("");
          x.splice(i, 1);
          numWhole = x.join("");
        }
      }
      // If number was fractional, rejoin the integer with the fractional number as a float
      // Save float to savedNum for later use
      if (numFraction) {
        savedNum = parseFloat(numWhole + "." + numFraction);
      }
      else {
        savedNum = parseFloat(numWhole);
      }
      
      // If first element of numWhole is a minus symbol (negative number), remove it
      if (numWhole[0] === "-") {
        x = numWhole.split("");
        x.splice(0, 1);
        numWhole = x.join("");
        negativeNum = 1;
      }

      // If numWhole is an exponential number, (i.e. 123e+45) do nothing
      // Else splice in a comma after every 3 index positions
      if (numWhole.match(exponentialRegEx)) {
      }
      else {
        x = numWhole.split("");
        if (x.length > 3) {
          for (let i = -(x.length - 1); i < 0; i++) {
            if (i % 3 === 0) {
              x.splice(i, 0, ",");
              console.log(x);
            }
            else {
              continue;
            }
          }
        };
        numWhole = x.join("");
      }

      // If numWhole was a negative number, re-insert the minus symbol
      if (negativeNum) {
        x = numWhole.split("");
        x.unshift("-");
        numWhole = x.join("");
        negativeNum = 0;
      }

      // If number was fractional, combine numWhole and numFraction and save to num
      // Else save only numWhole
      if (decimalEntered === 1 && !numFraction) {
      }
      else if (decimalEntered === 1 && numFraction) {
        num = `${numWhole}.${numFraction}`;
      }
      else if (decimalEntered === 0 && !numFraction) {
        num = `${numWhole}`;
      }

      if (answer === 1 && numFraction) {
        num = `${numWhole}.${numFraction}`;
      }
    }
  }
  return num;
};

// Handles all actions taken when user presses a valid key or clicks on any button
function buttonClick(e) {
  let button = "";
  if (e.key) {
    button = e.key;
  }
  else if (e.target.innerText) {
    button = e.target.innerText;
  }
  else {
    button = "Backspace";
  }

  if (button === "+") {
    button = "+";
  }
  else if (button === "-") {
    button = "−";
  }
  else if (button === "*") {
    button = "×";
  }
  else if (button === "/") {
    button = "÷";
  }

  if (button === "C" || button === "c") {
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
      numEntered = 1;
    } 
  }

  if (button === "+/−") {
    if (parseFloat(display2.innerText) > 0) {
      let number = display2.innerText.split("");
      number.unshift("-");
      display2.innerText = number.join("");
      numEntered = 1;
    }
    else if (parseFloat(display2.innerText) < 0) {
      let number = display2.innerText.split("");
      number.shift();
      display2.innerText = number.join("");
      numEntered = 1;
    }
  }

  if (button === "+" || button === "−" || button === "×" || button === "÷") {
    if (operator !== "" & answer === 0 && numEntered === 0) {
      operator = button;
      display1.innerText = `${commaInsert(num1.toString())} ${operator}`;
    }
    else if (operator !== "" && answer === 0) {
      num2 = parseFloat(savedNum);
      display1.innerText = ` ${commaInsert(operate(operator, num1, num2).toString())} ${button}`;
      display2.innerText = operate(operator, num1, num2);
      num1 = parseFloat(savedNum);
      operator = button;
      numEntered = 0;
    }
    else if (operator !== "" && answer === 1) {
      num1 = parseFloat(savedNum);
      operator = button;
      display1.innerText = `${display2.innerText} ${operator}`
      numEntered = 0;
      answer = 0;
    }
    else {
      num1 = parseFloat(savedNum);
      operator = button;
      display1.innerText = `${display2.innerText} ${operator}`;
      decimalEntered = 0;
      numEntered = 0;
    }
  }

  if ((button === "=" || button === "Enter") && operator === "/" && answer === 1 && display2.innerText === "Can't divide by zero") {
    display2.innerText = "Can't divide by zero";
    answer = 1;
    numEntered = 0;
  }
  else if ((button === "=" || button === "Enter") && operator === "/" && answer === 0 && display2.innerText === "0") {
    num2 = parseFloat(savedNum);
    display1.innerText += ` ${display2.innerText} =`;
    display2.innerText = "Can't divide by zero";
    answer = 1;
    numEntered = 0;
  }
  else if ((button === "=" || button === "Enter") && operator !== "" && answer === 0) {
    num2 = parseFloat(savedNum);
    display1.innerText += ` ${display2.innerText} =`;
    display2.innerText = operate(operator, num1, num2);
    answer = 1;
    numEntered = 0;
  }
  else if ((button === "=" || button === "Enter") && operator !== "" && answer === 1) {
    num1 = parseFloat(savedNum);
    display1.innerText = `${commaInsert(num1.toString())} ${operator} ${commaInsert(num2.toString())} =`;
    display2.innerText = operate(operator, num1, num2);
    numEntered = 0;
  }
  else if ((button === "=" || button === "Enter") && operator === "" && answer === 0) {
    num1 = parseFloat(savedNum);
    display1.innerText = `${num1} =`;
  }

  if (button === "." && decimalEntered === 0 && operator === "") {
    display2.innerText += button;
    numEntered = 1;
    decimalEntered = 1;
  }
  else if (button === "." && decimalEntered === 0 && answer === 1 && numEntered === 0) {
    display1.innerText = "";
    display2.innerText = 0 + ".";
    answer = 0;
    num1 = null;
    operator = "";
    num2 = null;
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
      decimalEntered = 1;
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
    if (display2.innerText.length <= 20) {
      display2.innerText += button;
    }
  }

  if (operator !== "" && numEntered === 0 && button >= 0 && button <= 9) {
    display2.innerText = button;
    numEntered = 1;
  }
  else if (operator !== "" && numEntered === 1 && button >= 0 && button <= 9) {
    if (display2.innerText !== "0" && display2.innerText.length <= 20) {
      display2.innerText += button;
    }
    else if (display2.innerText === "0") {
      display2.innerText = button;
    }
  };

  if (display2.innerText === "-") {
    display2.innerText = 0;
    numEntered = 0;
  }

  display2.innerText = commaInsert(display2.innerText);
  display1FontScale();
  display2FontScale();
  e.target.blur();
}