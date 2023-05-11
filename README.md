# Cyclomatic Complexity Calculator for C - Visual Studio Code Extension

This Visual Studio Code extension calculates the Cyclomatic Complexity of C functions directly in your editor, providing a quick and easy way to assess the complexity and maintainability of your code.

## Features

- Real-time Cyclomatic Complexity calculation: The extension automatically calculates the Cyclomatic Complexity of your C functions as you code.
- Cyclomatic Complexity display with CodeLens: The calculated Cyclomatic Complexity is displayed above each function using CodeLens.

## How to Install

1. Download the extension from the Visual Studio Code Marketplace.
2. Install it in your Visual Studio Code.
3. The extension will be automatically activated when you open a C file.

## How to Use

Once you've installed the extension, simply open a C file in Visual Studio Code. The extension will automatically calculate and display the Cyclomatic Complexity for each function in your code.

## Development

This project is built using TypeScript for the extension itself and Python for the C code parsing and Cyclomatic Complexity calculation.

You can run the tests for the Cyclomatic Complexity calculation with the provided Python script (`src/ccctest.py`).

## Contributing

We welcome contributions! Please see the [contributing guide](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
