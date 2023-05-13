import * as vscode from 'vscode';
import { spawn } from 'child_process';
import path = require('path');

export function activate(context: vscode.ExtensionContext) {
    // Register the CodeLens provider
    const provider = new CyclomaticComplexityCodeLensProvider();
    const providerDisposable = vscode.languages.registerCodeLensProvider({ language: 'c', scheme: 'file' }, provider);
    context.subscriptions.push(providerDisposable);
}

class CyclomaticComplexityCodeLensProvider implements vscode.CodeLensProvider {
    async provideCodeLenses(document: vscode.TextDocument): Promise<vscode.CodeLens[]> {
        const cwd = path.join(__dirname, "../src/ccc");
        const script = spawn('./ccc', [document.fileName], { cwd: cwd });

        // Wait for the script to finish and get its output
        const output = await new Promise<string>((resolve, reject) => {
            let stdout = '';
            script.stdout.on('data', chunk => stdout += chunk);
            script.stderr.on('data', chunk => console.error(chunk.toString()));
            script.on('error', reject);
            script.on('close', code => code === 0 ? resolve(stdout) : reject(`ccc exited with code ${code}`));
        });

        // Parse the output and create a CodeLens for each function
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

    resolveCodeLens(codeLens: vscode.CodeLens): vscode.CodeLens {
        // The command has already been set in provideCodeLenses, so we don't need to do anything here
        return codeLens;
    }
}
