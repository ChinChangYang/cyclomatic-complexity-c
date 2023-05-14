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

This project is built using TypeScript for the extension itself and a C++ program for the C code parsing and Cyclomatic Complexity calculation. The C++ program utilizes Clang's AST (Abstract Syntax Tree) traversal and has replaced the previous Python script to reduce dependency on Python.

During development, I encountered several build issues with the C++ program, which were resolved by executing the following command:

```bash
g++ ccc.cpp -o ccc $(llvm-config --cxxflags) $(llvm-config --ldflags) -lclang $(llvm-config --libs --system-libs)
```

This command uses `llvm-config` to get the appropriate flags and libraries required to compile the C++ program with Clang libraries.

You can run the tests for the Cyclomatic Complexity calculation with the provided C++ program (`src/ccc/ccc.cpp`).

## Known Issues

In case you face any errors during the execution of the extension, please check the "Output" tab in Visual Studio Code, which will provide information on potential issues.

## Contributing

We welcome contributions! Please see the [contributing guide](CONTRIBUTING.md) for more details.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
