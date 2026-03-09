let currentInput = '';
let previousInput = '';
let operator = null;

const symbols = {
    add: '+',
    subtract: '-',
    multiply: '×',
    divide: '÷'
};

function updateExpression() {
    if (!operator || !previousInput) {
        document.getElementById('display-expression').textContent = '';
        return;
    }

    const b = currentInput ? ' ' + currentInput : '';
    document.getElementById('display-expression').textContent = previousInput + ' ' + symbols[operator] + b;
}

//function to input user numbers to the display result
function inputNumber(num) {
    currentInput += num;
    document.getElementById('display-result').textContent = currentInput;
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
    //string--> floating point
    const a = parseFloat(previousInput);
    const b = parseFloat(currentInput);

    // dictionary 
    const ops = { add, subtract, multiply, divide };
    // operator key calls that function with a, b as arguments
    const result = ops[operator](a, b);

    //update display with result
    document.getElementById('display-result').textContent = result;

    // clear expression  
    document.getElementById('display-expression').textContent = '';
    currentInput = String(result);
    previousInput = '';
    operator = null;
}

function clearAll() {
    //zero out everything
    currentInput = '';
    previousInput = '';
    operator = null;
    document.getElementById('display-result').textContent = '0';
    updateExpression();
}

function deleteLast() {
    //get everything from the beginning up until the last element
    currentInput = currentInput.slice(0, -1);
    document.getElementById('display-result').textContent = currentInput || '0';
    updateExpression();
}
