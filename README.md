# Cyclomatic Complexity Calculator for C - Visual Studio Code Extension

This Visual Studio Code (VSCode) extension calculates the Cyclomatic Complexity of C functions directly in your editor, offering a quick and seamless method to assess the complexity and maintainability of your code.

## Features

- **Real-time Cyclomatic Complexity calculation:** The extension automatically calculates the Cyclomatic Complexity of your C functions as you type.
- **Cyclomatic Complexity display with CodeLens:** The calculated Cyclomatic Complexity is presented above each function using CodeLens, providing an immediate and clear visualization.

## Prerequisites

Before installing the extension, please make sure that LLVM and libclang are installed on your system.

- **Ubuntu:**
    ```bash
    sudo apt-get install llvm clang libclang-dev
    ```
- **MacOS:**
    ```bash
    brew install llvm
    ```
For other operating systems, refer to the official LLVM [Getting Started](https://llvm.org/docs/GettingStarted.html) guide. To check if LLVM and libclang are correctly installed, you can run `llvm-config --version` in your terminal. If LLVM is installed, this command should display the installed version.

## Installation

1. **Download and install the extension from the [VSCode Marketplace](https://marketplace.visualstudio.com/VSCode).**

2. **Build and install the `ccc` program:**
    - Download `ccc.cpp` from our [GitHub repository](https://github.com/ChinChangYang/cyclomatic-complexity-c/blob/main/src/ccc/ccc.cpp).
    - Open a terminal and navigate to the directory containing `ccc.cpp`.
    - Build the `ccc` program using the following command:
        ```bash
        g++ ccc.cpp -o ccc $(llvm-config --cxxflags) $(llvm-config --ldflags) -lclang $(llvm-config --libs --system-libs)
        ```
    - Move the `ccc` program to the `~/.cyclomatic_complexity_c/` directory:
        ```bash
        mv ccc ~/.cyclomatic_complexity_c/
        ```
3. The extension will be automatically activated when you open a C file in VSCode.

## Usage

Open a C file in VSCode. The extension will automatically calculate and display the Cyclomatic Complexity for each function in your code.

## Development

This project leverages TypeScript for the extension itself and a C++ program for parsing C code and calculating Cyclomatic Complexity. The C++ program utilizes Clang's AST (Abstract Syntax Tree) traversal.

During development, several build issues were encountered with the C++ program. They were resolved by executing the build command provided in the Installation section.

## Troubleshooting

If you face any issues during the extension's operation, check the "Output" tab in VSCode, which will provide information on potential problems. Refer to our [troubleshooting guide](TROUBLESHOOTING.md) or [open an issue](https://github.com/ChinChangYang/cyclomatic-complexity-c/issues/new) on GitHub for further assistance.

## Contributing

We welcome contributions! Please review our [contributing guide](CONTRIBUTING.md) for more information.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
