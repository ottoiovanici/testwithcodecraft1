# testwithcodecraft1

A test project demonstrating the implementation of a basic testing framework using Jest.

## Description

This project serves as a foundation for testing JavaScript applications. It includes a simple calculator and string utility functions along with comprehensive test suites to demonstrate testing best practices.

## Features

- **Calculator Functions**: Basic arithmetic operations (add, subtract, multiply, divide)
- **String Utilities**: String manipulation functions (capitalize, reverse)
- **Comprehensive Testing**: Full test coverage with Jest
- **Error Handling**: Proper input validation and error messages
- **Code Coverage**: Coverage reporting and thresholds

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd testwithcodecraft1
```

2. Install dependencies:
```bash
npm install
```

## Usage

### Running the Application

To run the main application:
```bash
npm start
```

### Running Tests

To run all tests:
```bash
npm test
```

To run tests in watch mode (automatically re-run on file changes):
```bash
npm run test:watch
```

To run tests with coverage report:
```bash
npm run test:coverage
```

## API Reference

### Calculator Functions

- `add(a, b)` - Adds two numbers
- `subtract(a, b)` - Subtracts second number from first
- `multiply(a, b)` - Multiplies two numbers
- `divide(a, b)` - Divides first number by second

### String Utilities

- `capitalize(str)` - Capitalizes the first letter of a string
- `reverseString(str)` - Reverses the characters in a string

## Testing

This project uses Jest as the testing framework. Tests are located in the `tests/` directory and follow the naming convention `*.test.js`.

### Test Coverage

The project maintains high test coverage standards:
- Branches: 80%
- Functions: 80%
- Lines: 80%
- Statements: 80%

### Test Structure

- **Unit Tests**: Individual function testing
- **Edge Cases**: Boundary condition testing
- **Error Handling**: Invalid input testing
- **Integration**: Combined functionality testing

## Project Structure

```
testwithcodecraft1/
├── src/
│   └── index.js          # Main application code
├── tests/
│   └── index.test.js     # Test suites
├── coverage/             # Coverage reports (generated)
├── jest.config.js        # Jest configuration
├── package.json          # Project dependencies and scripts
├── .gitignore           # Git ignore patterns
└── README.md            # This file
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

MIT License - see LICENSE file for details.