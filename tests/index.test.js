const {
  add,
  subtract,
  multiply,
  divide,
  capitalize,
  reverseString
} = require('../src/index');

describe('Calculator Functions', () => {
  describe('add', () => {
    test('should add two positive numbers correctly', () => {
      expect(add(2, 3)).toBe(5);
      expect(add(10, 15)).toBe(25);
    });

    test('should add negative numbers correctly', () => {
      expect(add(-5, -3)).toBe(-8);
      expect(add(-10, 5)).toBe(-5);
    });

    test('should add decimal numbers correctly', () => {
      expect(add(2.5, 3.7)).toBeCloseTo(6.2);
    });

    test('should throw error for non-number inputs', () => {
      expect(() => add('2', 3)).toThrow('Both arguments must be numbers');
      expect(() => add(2, '3')).toThrow('Both arguments must be numbers');
      expect(() => add(null, 3)).toThrow('Both arguments must be numbers');
    });
  });

  describe('subtract', () => {
    test('should subtract two numbers correctly', () => {
      expect(subtract(10, 3)).toBe(7);
      expect(subtract(5, 8)).toBe(-3);
    });

    test('should handle negative numbers', () => {
      expect(subtract(-5, -3)).toBe(-2);
      expect(subtract(-5, 3)).toBe(-8);
    });

    test('should throw error for non-number inputs', () => {
      expect(() => subtract('10', 3)).toThrow('Both arguments must be numbers');
    });
  });

  describe('multiply', () => {
    test('should multiply two numbers correctly', () => {
      expect(multiply(4, 5)).toBe(20);
      expect(multiply(-3, 7)).toBe(-21);
    });

    test('should handle zero multiplication', () => {
      expect(multiply(5, 0)).toBe(0);
      expect(multiply(0, 10)).toBe(0);
    });

    test('should throw error for non-number inputs', () => {
      expect(() => multiply('4', 5)).toThrow('Both arguments must be numbers');
    });
  });

  describe('divide', () => {
    test('should divide two numbers correctly', () => {
      expect(divide(15, 3)).toBe(5);
      expect(divide(10, 4)).toBe(2.5);
    });

    test('should handle negative division', () => {
      expect(divide(-10, 2)).toBe(-5);
      expect(divide(10, -2)).toBe(-5);
    });

    test('should throw error for division by zero', () => {
      expect(() => divide(10, 0)).toThrow('Division by zero is not allowed');
    });

    test('should throw error for non-number inputs', () => {
      expect(() => divide('15', 3)).toThrow('Both arguments must be numbers');
    });
  });
});

describe('String Utility Functions', () => {
  describe('capitalize', () => {
    test('should capitalize first letter of lowercase string', () => {
      expect(capitalize('hello')).toBe('Hello');
      expect(capitalize('world')).toBe('World');
    });

    test('should handle uppercase strings', () => {
      expect(capitalize('HELLO')).toBe('Hello');
      expect(capitalize('WORLD')).toBe('World');
    });

    test('should handle mixed case strings', () => {
      expect(capitalize('hELLO')).toBe('Hello');
      expect(capitalize('wORLD')).toBe('World');
    });

    test('should handle empty string', () => {
      expect(capitalize('')).toBe('');
    });

    test('should handle single character', () => {
      expect(capitalize('a')).toBe('A');
      expect(capitalize('Z')).toBe('Z');
    });

    test('should throw error for non-string inputs', () => {
      expect(() => capitalize(123)).toThrow('Argument must be a string');
      expect(() => capitalize(null)).toThrow('Argument must be a string');
      expect(() => capitalize(undefined)).toThrow('Argument must be a string');
    });
  });

  describe('reverseString', () => {
    test('should reverse simple strings', () => {
      expect(reverseString('hello')).toBe('olleh');
      expect(reverseString('world')).toBe('dlrow');
    });

    test('should handle empty string', () => {
      expect(reverseString('')).toBe('');
    });

    test('should handle single character', () => {
      expect(reverseString('a')).toBe('a');
    });

    test('should handle strings with spaces', () => {
      expect(reverseString('hello world')).toBe('dlrow olleh');
    });

    test('should handle palindromes', () => {
      expect(reverseString('racecar')).toBe('racecar');
      expect(reverseString('level')).toBe('level');
    });

    test('should throw error for non-string inputs', () => {
      expect(() => reverseString(123)).toThrow('Argument must be a string');
      expect(() => reverseString(null)).toThrow('Argument must be a string');
    });
  });
});

describe('Edge Cases and Integration', () => {
  test('should handle large numbers', () => {
    expect(add(999999, 1)).toBe(1000000);
    expect(multiply(1000, 1000)).toBe(1000000);
  });

  test('should handle very small decimal numbers', () => {
    expect(add(0.1, 0.2)).toBeCloseTo(0.3);
  });

  test('should handle special string cases', () => {
    expect(capitalize('123abc')).toBe('123abc');
    expect(reverseString('12345')).toBe('54321');
  });
});