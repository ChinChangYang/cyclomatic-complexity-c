# Cyclomatic Complexity C - Troubleshooting Guide

Here are some common issues you might face while installing or using the Cyclomatic Complexity C extension and their possible solutions.

## I can't install LLVM or libclang.

Ensure you have the necessary permissions to install software on your machine. On Linux, you might need to use `sudo`. On MacOS, you might need to install Homebrew first.

If you don't have root permissions, you can still build LLVM from source, and install it to your home directory. See the official LLVM [Getting Started](https://llvm.org/docs/GettingStarted.html) guide for instructions.

If you're behind a corporate firewall, it might block some downloads. In that case, please contact your IT department.

## llvm-config command not found.

This indicates that either LLVM is not installed or it's not in your system PATH. Make sure you've followed the installation instructions for your operating system in the README.

If LLVM is installed but `llvm-config` is not in your PATH, you'll need to add it. The method for this varies by operating system.

## The extension doesn't seem to be working.

Ensure that you've correctly built and installed the `ccc` program according to the instructions in the README. The extension won't work without it.

Make sure that you're working with a C file. The extension is designed to be activated for C files only.

Check the Visual Studio Code output and error logs for any error messages.

## There's an error message about a missing shared library when I try to run the `ccc` program.

If you built the `ccc` program on a different machine, you might encounter this error when you try to run it on another machine due to a missing shared library. See [this blog post](https://chinchangyang.github.io/cross-platform-build/clang/libclang/dependency-management/llvm/2023/05/19/resolving-missing-shared.html) for a detailed discussion on how to handle this.

If you're still facing problems, please [open a new issue](https://github.com/ChinChangYang/cyclomatic-complexity-c/issues/new) in the GitHub repository. Include as many details as you can, such as your operating system, LLVM version, and any error messages you're seeing. This will help us diagnose and fix the issue.
