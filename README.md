# testwithcodecraft1

A test project with basic functionality and comprehensive testing setup.

## Description

This project demonstrates a basic Node.js application with utility functions, proper testing, and development best practices. It includes greeting functionality, mathematical calculations, and input validation features.

## Features

- **Greeting System**: Simple greeting functionality with input validation
- **Calculator**: Basic mathematical operations (add, subtract, multiply, divide)
- **Input Validation**: Email and number validation utilities
- **Comprehensive Testing**: Full test coverage with Jest
- **Development Tools**: Hot reload with nodemon

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

```bash
# Start the application
npm start

# Run in development mode with hot reload
npm run dev
```

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch
```

## Project Structure

```
testwithcodecraft1/
├── src/
│   ├── index.js      # Main application entry point
│   └── utils.js      # Utility functions
├── tests/
│   └── utils.test.js # Test cases
├── package.json      # Project configuration
├── .gitignore       # Git ignore rules
└── README.md        # This file
```

## API Reference

### Utils Functions

#### `greet(name)`
- **Description**: Returns a greeting message
- **Parameters**: `name` (string) - The name to greet
- **Returns**: String greeting message
- **Throws**: Error if name is not a valid string

#### `calculate(a, b, operation)`
- **Description**: Performs mathematical calculations
- **Parameters**: 
  - `a` (number) - First number
  - `b` (number) - Second number
  - `operation` (string) - Operation type ('add', 'subtract', 'multiply', 'divide')
- **Returns**: Number result of the calculation
- **Throws**: Error for invalid inputs or division by zero

#### `validateInput(input, type)`
- **Description**: Validates input based on specified type
- **Parameters**:
  - `input` (string) - Input to validate
  - `type` (string) - Validation type ('email', 'number')
- **Returns**: Boolean indicating if input is valid

## Development

### Scripts

- `npm start` - Run the application
- `npm test` - Run tests with coverage
- `npm run test:watch` - Run tests in watch mode
- `npm run dev` - Run with hot reload using nodemon

### Testing

This project uses Jest for testing with the following features:
- Unit tests for all utility functions
- Code coverage reporting
- Watch mode for development

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## License

MIT License - see LICENSE file for details