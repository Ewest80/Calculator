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

// Clear all fields
function clear() {
  operand1 = '';
  operand2 = '';
  operator = null;
  previousOutput.textContent = '';
  currentOutput.textContent = '0';
}

function operate(num1, operator, num2) {
  num1 = Number(num1);
  num2 = Number(num2);

  switch (operator) {
    case '+':
      return add(num1, num2);
    case '-':
      return subtract(num1, num2);
    case '*':
      return multiply(num1, num2);
    case '/':
      if (num2 === 0) return null;
      return divide(num1, num2);
  }
}

function notValid() {
  return isNaN(currentOutput.textContent) && !(currentOutput.textContent === '.');
}

function appendNumber(number) {
  if (notValid()) return;
  if (number === '.' && currentOutput.textContent.includes('.')) return;
  
  if (currentOutput.textContent === '0' && !(number === '.')) {
    currentOutput.textContent = number;
  }
  else {
    currentOutput.textContent += number;
  }
}

function setOperator(newOperator) {
  if (notValid()) return;
  if (currentOutput.textContent != '') {
    if (operator !== null) calculate();
    operand1 = currentOutput.textContent;
    operator = newOperator;
    previousOutput.textContent = `${operand1} ${operator}`
    currentOutput.textContent = '';
  }
}

function calculate() {
  if (operator === null || notValid() || currentOutput.textContent === '') return;
  if (currentOutput.textContent === '0' && operator === '/') {
    previousOutput.textContent = 'WHY!?! ... Press AC';
    currentOutput.textContent = 'BOOM!';
    return;
  }
  operand2 = currentOutput.textContent;
  currentOutput.textContent = Math.round(operate(operand1, operator, operand2) * 1000) / 1000;
  previousOutput.textContent = `${operand1} ${operator} ${operand2} =`;
  operator = null;
}

numberBtns.forEach(button => {
  button.addEventListener('click', () => {
    appendNumber(button.textContent);
  });
});

operatorBtns.forEach(button => {
  button.addEventListener('click', () => {
    setOperator(button.textContent);
  });
});

equalsBtn.addEventListener('click', calculate);
allClearBtn.addEventListener('click', clear);
deleteBtn.addEventListener('click', () => {
  if (notValid()) return;
  currentOutput.textContent = currentOutput.textContent.slice(0, -1)
});