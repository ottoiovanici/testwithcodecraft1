/**
 * Utility functions for the test application
 */

/**
 * Greets a person with a hello message
 * @param {string} name - The name to greet
 * @returns {string} Greeting message
 */
function greet(name) {
    if (!name || typeof name !== 'string') {
        throw new Error('Name must be a non-empty string');
    }
    return `Hello, ${name}!`;
}

/**
 * Performs basic mathematical calculations
 * @param {number} a - First number
 * @param {number} b - Second number
 * @param {string} operation - Operation to perform (add, subtract, multiply, divide)
 * @returns {number} Result of the calculation
 */
function calculate(a, b, operation) {
    if (typeof a !== 'number' || typeof b !== 'number') {
        throw new Error('Both arguments must be numbers');
    }
    
    switch (operation) {
        case 'add':
            return a + b;
        case 'subtract':
            return a - b;
        case 'multiply':
            return a * b;
        case 'divide':
            if (b === 0) {
                throw new Error('Division by zero is not allowed');
            }
            return a / b;
        default:
            throw new Error('Invalid operation. Use: add, subtract, multiply, or divide');
    }
}

/**
 * Validates input based on type
 * @param {string} input - Input to validate
 * @param {string} type - Type of validation (email, number)
 * @returns {boolean} True if valid, false otherwise
 */
function validateInput(input, type) {
    if (!input || typeof input !== 'string') {
        return false;
    }
    
    switch (type) {
        case 'email':
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return emailRegex.test(input);
        case 'number':
            return !isNaN(input) && !isNaN(parseFloat(input));
        default:
            return false;
    }
}

module.exports = {
    greet,
    calculate,
    validateInput
};