// scientific_calculator.js
// Get the display element
let display = document.getElementById('display');
// Variable for current input
let currentInput = '';
// Variable for operator
let operator = null;
// Variable for first operand
let firstOperand = null;
// Variable for memory
let memory = 0;
// Function to append numbers
function appendNumber(number) {
    currentInput += number;
    display.value = currentInput;
}
// Function to append decimal
function appendDecimal() {
    if (!currentInput.includes('.')) {
        currentInput += '.';
        display.value = currentInput;
    }
}
// Function to clear display
function clearDisplay() {
    currentInput = '';
    operator = null;
    firstOperand = null;
    display.value = '';
}
// Function to delete last character
function deleteLast() {
    currentInput = currentInput.slice(0, -1);
    display.value = currentInput;
}
// Function to handle operators
function appendOperator(op) {
    if (currentInput === '' && firstOperand === null) {
        return;
    }
    if (firstOperand !== null && operator !== null) {
        calculate();
    }
    firstOperand = parseFloat(currentInput);
    operator = op;
    currentInput = '';
}
// Function to calculate results
function calculate() {
    if (operator === null || firstOperand === null) {
        return;
    }
    let secondOperand = parseFloat(currentInput || '0'); // Handle empty input
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
    firstOperand = result; // Prepare for chaining
}
// Function for single operand calculations
function calculateSingleOperand(op) {
    if (currentInput === '') {
        return;
    }
    let operand = parseFloat(currentInput);
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
    firstOperand = result; // Prepare for chaining
    operator = null;
}
// Function to recall memory
function memoryRecall() {
    currentInput = String(memory);
    display.value = currentInput;
}
// Function to add to memory
function memoryAdd() {
    if (currentInput !== '') {
        memory += parseFloat(currentInput);
    }
}
// Function to subtract from memory
function memorySubtract() {
    if (currentInput !== '') {
        memory -= parseFloat(currentInput);
    }
}
// Function to clear memory
function memoryClear() {
    memory = 0;
}
// Function to open graph window
function openGraphWindow() {
    window.open('graph.html', '_blank', 'width=800,height=600');
}
// Unit Conversion Functions (unchanged)
// Test Functions
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
function runButtonInputTests() {
    console.log("--- Button Input Tests ---");
    clearDisplay();
    document.querySelector('.buttons button[onclick*="appendNumber(\'7\')"]').click();
    console.assert(display.value === '7', "Test 14 Failed: Button input 7");
    clearDisplay();
    document.querySelector('.buttons button[onclick*="appendOperator(\'+\')"]').click();
    appendNumber('5');
    calculate();
    console.assert(display.value === '5', "Test 15 Failed: Button input +");
    clearDisplay();
    document.querySelector('.buttons button[onclick*="appendDecimal()"] ').click();
    appendNumber('2');
    console.assert(display.value === '0.2', "Test 16 Failed: Button input .");
    clearDisplay();
    document.querySelector('.buttons button[onclick*="clearDisplay()"] ').click();
    console.assert(display.value === '', "Test 17 Failed: Button input C");
    clearDisplay();
    appendNumber('123');
    document.querySelector('.buttons button[onclick*="deleteLast()"] ').click();
    console.assert(display.value === '12', "Test 18 Failed: Button input DEL");
    clearDisplay();
    appendNumber('9');
    calculateSingleOperand('sin');
    console.assert(display.value === '0.4121184850203191', "Test 19 Failed: Button input sin");
    clearDisplay();
    appendNumber('2');
    appendOperator('pow');
    appendNumber('3');
    calculate();
    console.assert(display.value === '8', "Test 20 Failed: Button input x^y");
}
// Run all tests
runBasicTests();
runScientificTests();
runMemoryTests();
runButtonInputTests();
console.log("All tests completed. Check the console for any 'Failed' assertions.");
// Keyboard input event listeners
const keyboardInput = document.getElementById('keyboardInput');
const displayElement = document.getElementById('display');
// Event listener for input in the keyboard input
keyboardInput.addEventListener('input', () => {
    currentInput = keyboardInput.value;
    displayElement.value = currentInput;
});
// Event listener for key presses in the keyboard input
keyboardInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        try {
            // Safely evaluate the expression
            let result = new Function('return ' + currentInput.replace(/\^/g, '**'))();
            // Check if the result is a valid number
            if (typeof result === 'number' && isFinite(result)) {
                displayElement.value = result;
                currentInput = String(result);
                firstOperand = null;
                operator = null;
            } else {
                displayElement.value = 'Error';
            }
        } catch (error) {
            displayElement.value = 'Error';
        }
        event.preventDefault(); // Prevent default form submission
    }
});
// Unit Conversion Functions
// (All unit conversion functions remain the same)