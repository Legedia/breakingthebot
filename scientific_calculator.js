// scientific_calculator.js

let display = document.getElementById('display');
let currentInput = '';
let operator = null;
let firstOperand = null;
let memory = 0;

function appendNumber(number) {
    currentInput += number;
    display.value = currentInput;
}

function appendOperator(op) {
    if (currentInput === '' && firstOperand === null) {
        return;
    }
    if (firstOperand !== null) {
        calculate();
    }
    firstOperand = parseFloat(currentInput);
    operator = op;
    currentInput = '';
}

function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        display.value = currentInput;
    }
}

function clearDisplay() {
    currentInput = '';
    operator = null;
    firstOperand = null;
    display.value = '';
}

function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
}

function calculate() {
    if (operator === null || firstOperand === null) {
        return;
    }
    let secondOperand = parseFloat(currentInput);
    let result;

    switch (operator) {
        case '+':
            result = firstOperand + secondOperand;
            break;
        case '-':
            result = firstOperand - secondOperand;
            break;
        case '*':
            result = firstOperand * secondOperand;
            break;
        case '/':
            if (secondOperand === 0) {
                result = 'Error: Division by zero';
            } else {
                result = firstOperand / secondOperand;
            }
            break;
        case 'sin':
            result = Math.sin(firstOperand);
            break;
        case 'cos':
            result = Math.cos(firstOperand);
            break;
        case 'tan':
            result = Math.tan(firstOperand);
            break;
        case 'log':
            if (firstOperand <= 0) {
                result = 'Error: Invalid input';
            } else {
                result = Math.log10(firstOperand);
            }
            break;
        case 'ln':
            if (firstOperand <= 0) {
                result = 'Error: Invalid input';
            } else {
                result = Math.log(firstOperand);
            }
            break;
        case 'sqrt':
            if (firstOperand < 0) {
                result = 'Error: Invalid input';
            } else {
                result = Math.sqrt(firstOperand);
            }
            break;
        case 'pow':
            result = Math.pow(firstOperand, secondOperand);
            break;
        default:
            return;
    }

    display.value = result;
    currentInput = String(result);
    operator = null;
    firstOperand = null;
}

function calculateSingleOperand(op) {
    if (currentInput === '') {
        return;
    }
    firstOperand = parseFloat(currentInput);
    let result;
    switch (op) {
        case 'sin':
            result = Math.sin(firstOperand);
            break;
        case 'cos':
            result = Math.cos(firstOperand);
            break;
        case 'tan':
            result = Math.tan(firstOperand);
            break;
        case 'log':
            if (firstOperand <= 0) {
                result = 'Error: Invalid input';
            } else {
                result = Math.log10(firstOperand);
            }
            break;
        case 'ln':
            if (firstOperand <= 0) {
                result = 'Error: Invalid input';
            } else {
                result = Math.log(firstOperand);
            }
            break;
        case 'sqrt':
            if (firstOperand < 0) {
                result = 'Error: Invalid input';
            } else {
                result = Math.sqrt(firstOperand);
            }
            break;
        case '1/x':
            if (firstOperand === 0) {
                result = 'Error: Division by zero';
            } else {
                result = 1 / firstOperand;
            }
            break;
        case 'x^2':
            result = Math.pow(firstOperand, 2);
            break;
        case 'x^3':
            result = Math.pow(firstOperand, 3);
            break;
        case 'e^x':
            result = Math.exp(firstOperand);
            break;
        case '10^x':
            result = Math.pow(10, firstOperand);
            break;
        case '!':
            if (firstOperand < 0 || !Number.isInteger(firstOperand)) {
                result = 'Error: Invalid input';
            } else if (firstOperand === 0) {
                result = 1;
            } else {
                let factorial = 1;
                for (let i = 1; i <= firstOperand; i++) {
                    factorial *= i;
                }
                result = factorial;
            }
            break;
        default:
            return;
    }
    display.value = result;
    currentInput = String(result);
    firstOperand = null;
}

function memoryRecall() {
    currentInput = String(memory);
    display.value = currentInput;
}

function memoryAdd() {
    if (currentInput !== '') {
        memory += parseFloat(currentInput);
    }
}

function memorySubtract() {
    if (currentInput !== '') {
        memory -= parseFloat(currentInput);
    }
}

function memoryClear() {
    memory = 0;
}