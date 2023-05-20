import * as vscode from 'vscode';
import { spawn } from 'child_process';
import path = require('path');
import os = require('os');
import fs = require('fs');

export function activate(context: vscode.ExtensionContext) {
    const provider = new CyclomaticComplexityCodeLensProvider();
    const providerDisposable = vscode.languages.registerCodeLensProvider({ language: 'c', scheme: 'file' }, provider);
    context.subscriptions.push(providerDisposable);
}

class CyclomaticComplexityCodeLensProvider implements vscode.CodeLensProvider {
    cccPath = path.join(os.homedir(), '.cyclomatic_complexity_c', 'ccc');

    async provideCodeLenses(document: vscode.TextDocument): Promise<vscode.CodeLens[]> {
        if (!fs.existsSync(this.cccPath)) {
            vscode.window.showErrorMessage('The "ccc" binary could not be found. Please follow the instructions in the README to build and install "ccc".');
            return [];
        }

        const output = await this.getScriptOutput(document);
        return this.createCodeLensesFromOutput(output);
    }

    private async getScriptOutput(document: vscode.TextDocument): Promise<string> {
        const script = spawn(this.cccPath);

        // Write the content of the current file to the ccc program
        script.stdin.write(document.getText());
        script.stdin.end();

        // Wait for the script to finish and get its output
        return new Promise<string>((resolve, reject) => {
            let stdout = '';
            script.stdout.on('data', chunk => stdout += chunk);
            script.stderr.on('data', chunk => console.error(chunk.toString()));
            script.on('error', reject);
            script.on('close', code => code === 0 ? resolve(stdout) : reject(`ccc exited with code ${code}`));
        });
    }

    private createCodeLensesFromOutput(output: string): vscode.CodeLens[] {
        const codeLenses = [];
        for (const line of output.split('\n')) {
            if (line.trim() !== '') { // Ignore empty or invalid lines
                const [functionLine, complexity] = line.split(' ');
                const codeLensLine = Math.max(Number(functionLine) - 1, 0);
                const range = new vscode.Range(codeLensLine, 0, codeLensLine, 0);
                const command = {
                    title: `Cyclomatic Complexity: ${complexity}`,
                    command: ''
                };
                codeLenses.push(new vscode.CodeLens(range, command));
            }
        }
        return codeLenses;
    }
}
