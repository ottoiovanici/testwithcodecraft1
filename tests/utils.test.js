const { greet, calculate, validateInput } = require('../src/utils');

describe('Utils Functions', () => {
    describe('greet', () => {
        test('should return greeting message for valid name', () => {
            expect(greet('Alice')).toBe('Hello, Alice!');
            expect(greet('Bob')).toBe('Hello, Bob!');
        });

        test('should throw error for invalid input', () => {
            expect(() => greet('')).toThrow('Name must be a non-empty string');
            expect(() => greet(null)).toThrow('Name must be a non-empty string');
            expect(() => greet(123)).toThrow('Name must be a non-empty string');
        });
    });

    describe('calculate', () => {
        test('should perform addition correctly', () => {
            expect(calculate(2, 3, 'add')).toBe(5);
            expect(calculate(-1, 1, 'add')).toBe(0);
        });

        test('should perform subtraction correctly', () => {
            expect(calculate(5, 3, 'subtract')).toBe(2);
            expect(calculate(0, 5, 'subtract')).toBe(-5);
        });

        test('should perform multiplication correctly', () => {
            expect(calculate(4, 3, 'multiply')).toBe(12);
            expect(calculate(-2, 3, 'multiply')).toBe(-6);
        });

        test('should perform division correctly', () => {
            expect(calculate(10, 2, 'divide')).toBe(5);
            expect(calculate(9, 3, 'divide')).toBe(3);
        });

        test('should throw error for division by zero', () => {
            expect(() => calculate(5, 0, 'divide')).toThrow('Division by zero is not allowed');
        });

        test('should throw error for invalid operation', () => {
            expect(() => calculate(1, 2, 'invalid')).toThrow('Invalid operation. Use: add, subtract, multiply, or divide');
        });

        test('should throw error for non-numeric inputs', () => {
            expect(() => calculate('a', 2, 'add')).toThrow('Both arguments must be numbers');
            expect(() => calculate(1, 'b', 'add')).toThrow('Both arguments must be numbers');
        });
    });

    describe('validateInput', () => {
        test('should validate email addresses correctly', () => {
            expect(validateInput('test@example.com', 'email')).toBe(true);
            expect(validateInput('user@domain.org', 'email')).toBe(true);
            expect(validateInput('invalid-email', 'email')).toBe(false);
            expect(validateInput('user@', 'email')).toBe(false);
            expect(validateInput('@domain.com', 'email')).toBe(false);
        });

        test('should validate numbers correctly', () => {
            expect(validateInput('123', 'number')).toBe(true);
            expect(validateInput('123.45', 'number')).toBe(true);
            expect(validateInput('-67', 'number')).toBe(true);
            expect(validateInput('abc', 'number')).toBe(false);
            expect(validateInput('12abc', 'number')).toBe(false);
        });

        test('should return false for invalid inputs', () => {
            expect(validateInput('', 'email')).toBe(false);
            expect(validateInput(null, 'email')).toBe(false);
            expect(validateInput(123, 'email')).toBe(false);
        });

        test('should return false for unknown validation type', () => {
            expect(validateInput('test', 'unknown')).toBe(false);
        });
    });
});