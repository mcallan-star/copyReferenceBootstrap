let currentInput = '';
let previousInput = '';
let operator = null;

//grab html IDs
const displayResult = document.getElementById('display-result');
const displayExpression = document.getElementById('display-expression')


const symbols = {
    add: '+',
    subtract: '-',
    multiply: '×',
    divide: '÷'
};

function updateExpression() {
    if (!operator || !previousInput) {
        displayExpression.textContent = '';
        return;
    }

    const b = currentInput ? ' ' + currentInput : '';
    displayExpression.textContent = previousInput + ' ' + symbols[operator] + b;
}

//function to input user numbers to the display result
function inputNumber(num) {
    currentInput += num;
    displayResult.textContent = currentInput;
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
    displayResult.textContent = result;

    // clear expression  
    displayExpression.textContent = '';
    currentInput = String(result);
    previousInput = '';
    operator = null;
}

function clearAll() {
    currentInput = '';
    previousInput = '';
    operator = null;
    displayResult.textContent = '0';
    updateExpression();
}

function deleteLast() {
    //get everything from the beginning up until the last element
    currentInput = currentInput.slice(0, -1);
    displayResult.textContent = currentInput || '0';
    updateExpression();
}
