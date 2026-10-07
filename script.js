// Get the elements from the page
const buttons = document.getElementById("buttons");
const currentDisplay = document.getElementById("current");
const historyDisplay = document.getElementById("history");

// Calculator state: the things the calculator must remember
let currentValue = "0";      // the number being typed (kept as text)
let previousValue = "";      // the first number, saved when an operator is chosen
let operator = null;         // "+", "-", "*", "/" or null
let startNewNumber = false;  // true when the next digit should start a new number
let isError = false;         // true while an error message is showing

const MAX_DIGITS = 12;

// Symbols to show on the display for each operator
const symbols = { "+": "+", "-": "\u2212", "*": "\u00d7", "/": "\u00f7" };

// ---------- Display ----------
function updateDisplay() {
  currentDisplay.textContent = currentValue;
  currentDisplay.classList.toggle("error", isError);

  if (operator !== null) {
    historyDisplay.textContent = previousValue + " " + symbols[operator];
  } else {
    historyDisplay.textContent = "";
  }
}

// ---------- Reset ----------
function clearAll() {
  currentValue = "0";
  previousValue = "";
  operator = null;
  startNewNumber = false;
  isError = false;
}

// ---------- Arithmetic (no eval) ----------
// Returns the result as a number, or null if dividing by zero
function calculate(a, b, op) {
  if (op === "+") {
    return a + b;
  } else if (op === "-") {
    return a - b;
  } else if (op === "*") {
    return a * b;
  } else if (op === "/") {
    if (b === 0) {
      return null;
    }
    return a / b;
  }
}

// Round away tiny floating-point errors (0.1 + 0.2 becomes 0.3)
function formatResult(number) {
  return String(Number(number.toFixed(10)));
}

function showDivideByZero() {
  clearAll();
  currentValue = "Cannot divide by zero";
  isError = true;
}

// ---------- Button actions ----------
function inputNumber(digit) {
  if (isError) {
    clearAll();
  }

  if (startNewNumber) {
    currentValue = digit;
    startNewNumber = false;
  } else if (currentValue === "0") {
    currentValue = digit;
  } else if (currentValue.replace("-", "").replace(".", "").length < MAX_DIGITS) {
    currentValue = currentValue + digit;
  }
}

function inputDecimal() {
  if (isError) {
    clearAll();
  }

  if (startNewNumber) {
    currentValue = "0.";
    startNewNumber = false;
  } else if (!currentValue.includes(".")) {
    currentValue = currentValue + ".";
  }
}

function chooseOperator(newOperator) {
  if (isError) {
    return;
  }

  // Operator pressed twice in a row: just change the operator
  if (operator !== null && startNewNumber) {
    operator = newOperator;
    return;
  }

  // Chain: 12 + 5 then "x" calculates 12 + 5 first
  if (operator !== null) {
    const result = calculate(Number(previousValue), Number(currentValue), operator);
    if (result === null) {
      showDivideByZero();
      return;
    }
    currentValue = formatResult(result);
  }

  previousValue = currentValue;
  operator = newOperator;
  startNewNumber = true;
}

function pressEquals() {
  // Nothing to calculate yet
  if (isError || operator === null || startNewNumber) {
    return;
  }

  const result = calculate(Number(previousValue), Number(currentValue), operator);

  if (result === null) {
    showDivideByZero();
    return;
  }

  currentValue = formatResult(result);
  previousValue = "";
  operator = null;
  startNewNumber = true;   // the next digit starts a fresh calculation
}

// ---------- One click listener for all the buttons (event delegation) ----------
buttons.addEventListener("click", function (event) {
  const button = event.target.closest("button");
  if (!button) {
    return;
  }

  const type = button.dataset.type;
  const value = button.dataset.value;

  if (type === "number") {
    inputNumber(value);
  } else if (type === "decimal") {
    inputDecimal();
  } else if (type === "operator") {
    chooseOperator(value);
  } else if (type === "equals") {
    pressEquals();
  } else if (type === "clear") {
    clearAll();
  }

  updateDisplay();
});

updateDisplay();