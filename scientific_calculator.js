// scientific_calculator.js

// Get the display element where the calculator output is shown
let display = document.getElementById('display');
// Variable to store the current number being entered by the user
let currentInput = '';
// Variable to store the selected operator (+, -, *, /, pow)
let operator = null;
// Variable to store the first operand in a calculation
let firstOperand = null;
// Variable to store the value in the calculator's memory
let memory = 0;

// Function to append a number to the current input
function appendNumber(number) {
    currentInput += number;
    display.value = currentInput;
}

// Function to handle the selection of an operator
function appendOperator(op) {
    // If no input and no first operand, do nothing
    if (currentInput === '' && firstOperand === null) {
        return;
    }
    // If there's a first operand already, perform the pending calculation
    if (firstOperand !== null) {
        calculate();
    }
    // Store the current input as the first operand
    firstOperand = parseFloat(currentInput);
    // Store the selected operator
    operator = op;
    // Reset current input to prepare for the second operand
    currentInput = '';
}

// Function to append a decimal point to the current input
function appendDecimal() {
    // Only append if there isn't already a decimal point in the current input
    if (!currentInput.includes('.')) {
        currentInput += '.';
        display.value = currentInput;
    }
}

// Function to clear the display and reset all variables
function clearDisplay() {
    currentInput = '';
    operator = null;
    firstOperand = null;
    display.value = '';
    // Also clear the keyboard input field
    document.getElementById('keyboardInput').value = '';
}

// Function to delete the last character from the current input
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
    // Also update the keyboard input field
    document.getElementById('keyboardInput').value = currentInput;
}

// Function to perform the calculation when the equals button is pressed
function calculate() {
    // If no operator or first operand is set, do nothing
    if (operator === null || firstOperand === null) {
        return;
    }
    // Parse the current input as the second operand
    let secondOperand = parseFloat(currentInput);
    let result;

    // Perform the operation based on the stored operator
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
            // Handle division by zero error
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

    // Display the result
    display.value = result;
    // Update the keyboard input field
    document.getElementById('keyboardInput').value = String(result);
    // Set the result as the current input for potential further calculations
    currentInput = String(result);
    // Reset operator and first operand
    operator = null;
    firstOperand = null;
}

// Function to perform calculations that involve a single operand (e.g., sin, cos, sqrt)
function calculateSingleOperand(op) {
    // If no input and no pending operator, do nothing
    if (currentInput === '' && operator === null) {
        return;
    }
    // Use the current input as the operand, or the first operand if an operator is pending
    let operand = parseFloat(currentInput);
    if (operator !== null) {
        operand = firstOperand;
    }
    let result;

    // Perform the single operand operation based on the button clicked
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
            // Handle invalid input for logarithm
            if (operand <= 0) {
                result = 'Error: Invalid input';
            } else {
                result = Math.log10(operand);
            }
            break;
        case 'ln':
            // Handle invalid input for natural logarithm
            if (operand <= 0) {
                result = 'Error: Invalid input';
            } else {
                result = Math.log(operand);
            }
            break;
        case 'sqrt':
            // Handle invalid input for square root
            if (operand < 0) {
                result = 'Error: Invalid input';
            } else {
                result = Math.sqrt(operand);
            }
            break;
        case '1/x':
            // Handle division by zero for reciprocal
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
            // Handle invalid input for factorial
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
    // Display the result
    display.value = result;
    // Update the keyboard input field
    document.getElementById('keyboardInput').value = String(result);
    // Set the result as the current input
    currentInput = String(result);
    // Reset operator and first operand
    firstOperand = null;
    operator = null;
}

// Function to recall the value stored in memory
function memoryRecall() {
    currentInput = String(memory);
    display.value = currentInput;
    // Update the keyboard input field
    document.getElementById('keyboardInput').value = currentInput;
}

// Function to add the current input to the memory
function memoryAdd() {
    if (currentInput !== '') {
        memory += parseFloat(currentInput);
    }
}

// Function to subtract the current input from the memory
function memorySubtract() {
    if (currentInput !== '') {
        memory -= parseFloat(currentInput);
    }
}

// Function to clear the memory
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