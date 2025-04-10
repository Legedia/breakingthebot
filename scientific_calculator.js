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
 // Function to open the graph window
 function openGraphWindow() {
  window.open('graph.html', '_blank', 'width=800,height=600');
 }
 // Unit Conversion Functions
 // Function to populate the unit dropdowns based on the selected unit type
 function populateUnits() {
  const unitType = document.getElementById('unitType').value;
  const fromUnitSelect = document.getElementById('fromUnit');
  const toUnitSelect = document.getElementById('toUnit');
  // Clear previous options
  fromUnitSelect.innerHTML = '';
  toUnitSelect.innerHTML = '';
  let units = [];
  // Populate units based on the selected type
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
  // Add options to the select elements
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
 // Function to trigger the unit conversion and display the result
 function displayConversionResult() {
  convertUnits(); // Call the conversion function
 }
 // Function to perform the unit conversion
 function convertUnits() {
  const fromUnit = document.getElementById('fromUnit').value;
  const toUnit = document.getElementById('toUnit').value;
  const inputValue = parseFloat(document.getElementById('inputValue').value);
  const resultDiv = document.getElementById('result');
  // Validate input
  if (isNaN(inputValue)) {
   resultDiv.textContent = 'Invalid Input';
   return;
  }
  let result;
  // Perform conversion based on the selected unit type
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
  // Display the result
  resultDiv.textContent = `${result.toFixed(4)} ${toUnit}`;
 }
 // Function to convert length units
 function convertLength(value, fromUnit, toUnit) {
  let meters = value;
  // Convert to meters
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
  // Convert from meters
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
  // Convert to kilograms
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
  // Convert from kilograms
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
  // Convert to seconds
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
  // Convert from seconds
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
  // Convert to Celsius
  switch (fromUnit) {
   case 'F':
    celsius = (value - 32) * 5 / 9;
    break;
   case 'K':
    celsius = value - 273.15;
    break;
  }
  let result = celsius;
  // Convert from Celsius
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
 // --- Test Functions (unchanged) ---
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
 // Get references to input and display
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
    let result = new Function('return ' + currentInput)();
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