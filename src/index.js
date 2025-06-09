const { greet, calculate, validateInput } = require('./utils');

/**
 * Main application entry point
 */
function main() {
    console.log('=== Test Application Started ===');
    
    // Test greeting functionality
    console.log(greet('World'));
    console.log(greet('CodeCraft'));
    
    // Test calculation functionality
    console.log(`Addition: ${calculate(5, 3, 'add')}`);
    console.log(`Subtraction: ${calculate(10, 4, 'subtract')}`);
    console.log(`Multiplication: ${calculate(6, 7, 'multiply')}`);
    console.log(`Division: ${calculate(15, 3, 'divide')}`);
    
    // Test input validation
    console.log(`Valid email: ${validateInput('test@example.com', 'email')}`);
    console.log(`Valid number: ${validateInput('123', 'number')}`);
    console.log(`Invalid email: ${validateInput('invalid-email', 'email')}`);
    
    console.log('=== Test Application Completed ===');
}

// Run the application if this file is executed directly
if (require.main === module) {
    main();
}

module.exports = { main };