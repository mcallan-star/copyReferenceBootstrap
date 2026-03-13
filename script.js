let currentInput = '';
let previousInput = '';
let operator = null;

//grab html IDs
const displayResult = document.getElementById('display-result');
const displayHistory = document.getElementById('display-history');
//attach event listeners for action/value
document.querySelectorAll('button').forEach(function button() {
    // dataset is a built-in browser API which maps the html attribute to an object
    const action = this.dataset.action;
    const value = this.dataset.value;
    //iterating through each button click 
    if (action === 'number') {
        button.addEventListener('click', () => inputNumber(value));
    } else if (action === 'operator') {
        button.addEventListener('click', () => setOperator(value));
    } else if (action === 'equals') {
        button.addEventListener('click', () => calculate());
    }
    else if (action === 'c') {
        button.addEventListener('click', () => clearAll());
    } else if (action === 'del') {
        button.addEventListener('click', () => deleteLast());
    }
})
const symbols = {
    add: '+',
    subtract: '-',
    multiply: '×',
    divide: '÷',
};

function updateExpression() {
    if (operator && previousInput) {
        const b = currentInput ? ' ' + currentInput : '';
        //put nums and symbols on the right side
        displayResult.textContent = previousInput + ' ' + symbols[operator] + b;
    } else {
        displayResult.textContent = currentInput || '0';
    }
}

//function to input user numbers to the display result
function inputNumber(num) {
    currentInput += num;
    //clears the right side
    updateExpression();
}
//op represents the operator to be set
function setOperator(op) {
    if (!currentInput)
        return;
    operator = op;
    //prep display for next input, storing
    previousInput = currentInput;
    currentInput = '';
    //update the display with the numbers and symbols
    updateExpression();
}
// 4 math functions 
function add(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function multiply(a, b) {
    return a * b;
}
function divide(a, b) {
    return a / b;
}

function calculate() {
    if (!previousInput || !currentInput || !operator)
        return;

    const a = parseFloat(previousInput);
    const b = parseFloat(currentInput);

    let result;
    if (operator === 'add')
        result = add(a, b);
    else if (operator === 'subtract')
        result = subtract(a, b);
    else if (operator === 'multiply')
        result = multiply(a, b);
    else if (operator === 'divide')
        result = divide(a, b);
    else return;
    displayHistory.textContent = previousInput + ' ' + symbols[operator] + ' ' + currentInput + ' =';
    displayResult.textContent = result;

    // clear expression
    currentInput = String(result);
    previousInput = '';
    operator = null;
}

function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = null;
    displayHistory.textContent = '';
    displayResult.textContent = '0';
    updateExpression();
}

function deleteLast() {
    //get everything from the beginning up until the last element
    currentInput = currentInput.slice(0, -1);
    updateExpression();
}
