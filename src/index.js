/**
 * Main application entry point
 */

/**
 * Simple calculator functions for testing
 */
function add(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  return a + b;
}

function subtract(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  return a - b;
}

function multiply(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  return a * b;
}

function divide(a, b) {
  if (typeof a !== 'number' || typeof b !== 'number') {
    throw new Error('Both arguments must be numbers');
  }
  if (b === 0) {
    throw new Error('Division by zero is not allowed');
  }
  return a / b;
}

/**
 * String utility functions
 */
function capitalize(str) {
  if (typeof str !== 'string') {
    throw new Error('Argument must be a string');
  }
  if (str.length === 0) {
    return str;
  }
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
}

function reverseString(str) {
  if (typeof str !== 'string') {
    throw new Error('Argument must be a string');
  }
  return str.split('').reverse().join('');
}

// Main function
function main() {
  console.log('TestWithCodeCraft1 - Testing Framework Implementation');
  console.log('='.repeat(50));
  
  // Example usage
  console.log('Calculator Examples:');
  console.log(`5 + 3 = ${add(5, 3)}`);
  console.log(`10 - 4 = ${subtract(10, 4)}`);
  console.log(`6 * 7 = ${multiply(6, 7)}`);
  console.log(`15 / 3 = ${divide(15, 3)}`);
  
  console.log('\nString Examples:');
  console.log(`Capitalize 'hello' = ${capitalize('hello')}`);
  console.log(`Reverse 'world' = ${reverseString('world')}`);
}

// Export functions for testing
module.exports = {
  add,
  subtract,
  multiply,
  divide,
  capitalize,
  reverseString,
  main
};

// Run main function if this file is executed directly
if (require.main === module) {
  main();
}