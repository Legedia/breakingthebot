// scientific_calculator.js
 // Get the display element where the calculator output is shown
 let display = document.getElementById('display');
 // Variable to store the current number being entered
 let currentInput = '';
 // Variable to store the selected operator (+, -, *, /, pow)
 let operator = null;
 // Variable to store the first operand
 let firstOperand = null;
 // Variable to store the value in memory
 let memory = 0;
 // Function to append a number to the current input
 function appendNumber(number) {
  currentInput += number;
  display.value = currentInput;
 }
 // Function to handle operator selection
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
 // Function to append a decimal point
 function appendDecimal() {
  if (!currentInput.includes('.')) {
   currentInput += '.';
   display.value = currentInput;
  }
 }
 // Function to clear the display
 function clearDisplay() {
  currentInput = '';
  operator = null;
  firstOperand = null;
  display.value = '';
 }
 // Function to delete the last character
 function deleteLast() {
  currentInput = currentInput.slice(0, -1);
  display.value = currentInput;
 }
 // Function to perform calculations
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
 // Function for single-operand calculations (sin, cos, etc.)
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
  firstOperand = null;
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
 // Function to open the graph window
 function openGraphWindow() {
  window.open('graph.html', '_blank', 'width=800,height=600');
 }
 // Unit Conversion Functions
 // Function to populate unit dropdowns
 function populateUnits() {
  const unitType = document.getElementById('unitType').value;
  const fromUnitSelect = document.getElementById('fromUnit');
  const toUnitSelect = document.getElementById('toUnit');
  fromUnitSelect.innerHTML = '';
  toUnitSelect.innerHTML = '';
  let units = [];
  switch (unitType) {
   case 'length':
    units = ['m', 'cm', 'mm', 'km', 'in', 'ft', 'yd', 'mi'];
    break;
   case 'mass':
    units = ['kg', 'g', 'mg', 'lb', 'oz'];
    break;
   case 'time':
    units = ['s', 'ms', 'min', 'hr', 'day'];
    break;
   case 'temperature':
    units = ['C', 'F', 'K'];
    break;
  }
  units.forEach(unit => {
   const option1 = document.createElement('option');
   option1.value = unit;
   option1.textContent = unit;
   fromUnitSelect.appendChild(option1);
   const option2 = document.createElement('option');
   option2.value = unit;
   option2.textContent = unit;
   toUnitSelect.appendChild(option2);
  });
 }
 // Function to trigger unit conversion and display result
 function displayConversionResult() {
  convertUnits();
 }
 // Function to perform unit conversion
 function convertUnits() {
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;
  const inputValue = parseFloat(document.getElementById('inputValue').value);
  const resultDiv = document.getElementById('result');
  if (isNaN(inputValue)) {
   resultDiv.textContent = 'Invalid Input';
   return;
  }
  let result;
  switch (document.getElementById('unitType').value) {
   case 'length':
    result = convertLength(inputValue, fromUnit, toUnit);
    break;
   case 'mass':
    result = convertMass(inputValue, fromUnit, toUnit);
    break;
   case 'time':
    result = convertTime(inputValue, fromUnit, toUnit);
    break;
   case 'temperature':
    result = convertTemperature(inputValue, fromUnit, toUnit);
    break;
  }
  resultDiv.textContent = `${result.toFixed(4)} ${toUnit}`;
 }
 // Function to convert length units
 function convertLength(value, fromUnit, toUnit) {
  let meters = value;
  switch (fromUnit) {
   case 'cm':
    meters = value / 100;
    break;
   case 'mm':
    meters = value / 1000;
    break;
   case 'km':
    meters = value * 1000;
    break;
   case 'in':
    meters = value * 0.0254;
    break;
   case 'ft':
    meters = value * 0.3048;
    break;
   case 'yd':
    meters = value * 0.9144;
    break;
   case 'mi':
    meters = value * 1609.34;
    break;
  }
  let result = meters;
  switch (toUnit) {
   case 'cm':
    result = meters * 100;
    break;
   case 'mm':
    result = meters * 1000;
    break;
   case 'km':
    result = meters / 1000;
    break;
   case 'in':
    result = meters / 0.0254;
    break;
   case 'ft':
    result = meters / 0.3048;
    break;
   case 'yd':
    result = meters / 0.9144;
    break;
   case 'mi':
    result = meters / 1609.34;
    break;
  }
  return result;
 }
 // Function to convert mass units
 function convertMass(value, fromUnit, toUnit) {
  let kilograms = value;
  switch (fromUnit) {
   case 'g':
    kilograms = value / 1000;
    break;
   case 'mg':
    kilograms = value / 1000000;
    break;
   case 'lb':
    kilograms = value / 2.20462;
    break;
   case 'oz':
    kilograms = value / 35.274;
    break;
  }
  let result = kilograms;
  switch (toUnit) {
   case 'g':
    result = kilograms * 1000;
    break;
   case 'mg':
    result = kilograms * 1000000;
    break;
   case 'lb':
    result = kilograms * 2.20462;
    break;
   case 'oz':
    result = kilograms * 35.274;
    break;
  }
  return result;
 }
 // Function to convert time units
 function convertTime(value, fromUnit, toUnit) {
  let seconds = value;
  switch (fromUnit) {
   case 'ms':
    seconds = value / 1000;
    break;
   case 'min':
    seconds = value * 60;
    break;
   case 'hr':
    seconds = value * 3600;
    break;
   case 'day':
    seconds = value * 86400;
    break;
  }
  let result = seconds;
  switch (toUnit) {
   case 'ms':
    result = seconds * 1000;
    break;
   case 'min':
    result = seconds / 60;
    break;
   case 'hr':
    result = seconds / 3600;
    break;
   case 'day':
    result = seconds / 86400;
    break;
  }
  return result;
 }
 // Function to convert temperature units
 function convertTemperature(value, fromUnit, toUnit) {
  let celsius = value;
  switch (fromUnit) {
   case 'F':
    celsius = (value - 32) * 5 / 9;
    break;
   case 'K':
    celsius = value - 273.15;
    break;
  }
  let result = celsius;
  switch (toUnit) {
   case 'F':
    result = (celsius * 9 / 5) + 32;
    break;
   case 'K':
    result = celsius + 273.15;
    break;
  }
  return result;
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
  document.querySelector('.buttons button[onclick*="appendDecimal()"]').click();
  appendNumber('2');
  console.assert(display.value === '0.2', "Test 16 Failed: Button input .");
  clearDisplay();
  document.querySelector('.buttons button[onclick*="clearDisplay()"]').click();
  console.assert(display.value === '', "Test 17 Failed: Button input C");
  clearDisplay();
  appendNumber('123');
  document.querySelector('.buttons button[onclick*="deleteLast()"]').click();
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