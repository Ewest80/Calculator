const previousOutput = document.querySelector('.previous-output');
const currentOutput = document.querySelector('.current-output');
const numberBtns = document.querySelectorAll('[data-number]');
const operatorBtns = document.querySelectorAll('[data-operator]');
const allClearBtn = document.getElementById('allClearBtn');
const deleteBtn = document.getElementById('deleteBtn');
const equalsBtn = document.getElementById('equalsBtn');

let operand1 = '';
let operand2 = '';
let operator = null;

// Math Functions
function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function clear() {
  operand1 = '';
  operand2 = '';
  operator = null;
  previousOutput.textContent = '';
  currentOutput.textContent = '0';
}

function operate(num1, operator, num2) {
  switch (operator) {
    case '+':
      return add(num1, num2);
    case '-':
      return subtract(num1, num2);
    case '*':
      return multiply(num1, num2);
    case '÷':
      return divide(num1, num2);
  }
}

function appendNumber(number) {
  if (number === '.' && currentOutput.textContent.includes('.')) return;
  
  if (currentOutput.textContent === '0' && !(number === '.')) {
    currentOutput.textContent = number;
  }
  else {
    currentOutput.textContent += number;
  }
}

numberBtns.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.textContent);
  });
});

allClearBtn.addEventListener('click', clear);
deleteBtn.addEventListener('click', () => currentOutput.textContent = currentOutput.textContent.slice(0, -1));