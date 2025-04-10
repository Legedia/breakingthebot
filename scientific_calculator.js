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
    if (currentInput === '' && operator === null) {
        return;
    }
    let operand = parseFloat(currentInput);
    if (operator !== null) {
        operand = firstOperand;
    }
    let result;
    switch (op) {
        case 'sin':
            result = Math.sin(operand);
            break;
        case 'cos':
            result = Math.cos(operand);
            break;
        case 'tan':
            result = Math.tan(operand);
            break;
        case 'log':
            if (operand <= 0) {
                result = 'Error: Invalid input';
            } else {
                result = Math.log10(operand);
            }
            break;
        case 'ln':
            if (operand <= 0) {
                result = 'Error: Invalid input';
            } else {
                result = Math.log(operand);
            }
            break;
        case 'sqrt':
            if (operand < 0) {
                result = 'Error: Invalid input';
            } else {
                result = Math.sqrt(operand);
            }
            break;
        case '1/x':
            if (operand === 0) {
                result = 'Error: Division by zero';
            } else {
                result = 1 / operand;
            }
            break;
        case 'x^2':
            result = Math.pow(operand, 2);
            break;
        case 'x^3':
            result = Math.pow(operand, 3);
            break;
        case 'e^x':
            result = Math.exp(operand);
            break;
        case '10^x':
            result = Math.pow(10, operand);
            break;
        case '!':
            if (operand < 0 || !Number.isInteger(operand)) {
                result = 'Error: Invalid input';
            } else if (operand === 0) {
                result = 1;
            } else {
                let factorial = 1;
                for (let i = 1; i <= operand; i++) {
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
    operator = null;
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

// --- Test Functions ---

function runBasicTests() {
    console.log("--- Basic Tests ---");
    clearDisplay();
    appendNumber('5');
    appendOperator('+');
    appendNumber('3');
    calculate();
    console.assert(display.value === '8', "Test 1 Failed: Addition");

    clearDisplay();
    appendNumber('10');
    appendOperator('-');
    appendNumber('4');
    calculate();
    console.assert(display.value === '6', "Test 2 Failed: Subtraction");

    clearDisplay();
    appendNumber('2');
    appendOperator('*');
    appendNumber('6');
    calculate();
    console.assert(display.value === '12', "Test 3 Failed: Multiplication");

    clearDisplay();
    appendNumber('15');
    appendOperator('/');
    appendNumber('3');
    calculate();
    console.assert(display.value === '5', "Test 4 Failed: Division");

    clearDisplay();
    appendNumber('5');
    appendDecimal();
    appendNumber('5');
    console.assert(display.value === '5.5', "Test 5 Failed: Decimal input");
}

function runScientificTests() {
    console.log("--- Scientific Tests ---");
    clearDisplay();
    currentInput = '0';
    calculateSingleOperand('sin');
    console.assert(Math.abs(parseFloat(display.value) - 0) < 1e-9, "Test 6 Failed: sin(0)");

    clearDisplay();
    currentInput = '0';
    calculateSingleOperand('cos');
    console.assert(Math.abs(parseFloat(display.value) - 1) < 1e-9, "Test 7 Failed: cos(0)");

    clearDisplay();
    currentInput = '2';
    calculateSingleOperand('x^2');
    console.assert(display.value === '4', "Test 8 Failed: x^2");

    clearDisplay();
    currentInput = '3';
    calculateSingleOperand('!');
    console.assert(display.value === '6', "Test 9 Failed: Factorial");

    clearDisplay();
    currentInput = '10';
    calculateSingleOperand('log');
    console.assert(Math.abs(parseFloat(display.value) - 1) < 1e-9, "Test 10 Failed: log(10)");
}

function runMemoryTests() {
    console.log("--- Memory Tests ---");
    clearDisplay();
    appendNumber('10');
    memoryAdd();
    clearDisplay();
    appendNumber('5');
    memoryAdd();
    memoryRecall();
    console.assert(display.value === '15', "Test 11 Failed: Memory Add and Recall");

    clearDisplay();
    appendNumber('20');
    memoryAdd();
    appendNumber('5');
    memorySubtract();
    memoryRecall();
    console.assert(display.value === '15', "Test 12 Failed: Memory Subtract and Recall");

    memoryClear();
    memoryRecall();
    console.assert(display.value === '0', "Test 13 Failed: Memory Clear");
}

// Run the tests when the script loads
runBasicTests();
runScientificTests();
runMemoryTests();

console.log("All tests completed. Check the console for any 'Failed' assertions.");