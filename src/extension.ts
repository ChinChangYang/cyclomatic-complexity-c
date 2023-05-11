import * as vscode from 'vscode';
import { spawnSync } from 'child_process';

export function activate(context: vscode.ExtensionContext) {
    // Register the CodeLens provider
    let provider = new CyclomaticComplexityCodeLensProvider();
    let providerDisposable = vscode.languages.registerCodeLensProvider({ language: 'c', scheme: 'file' }, provider);
    context.subscriptions.push(providerDisposable);
}

class CyclomaticComplexityCodeLensProvider implements vscode.CodeLensProvider {
    provideCodeLenses(document: vscode.TextDocument): vscode.CodeLens[] {
        // Spawn a new process to run your script
        const script = spawnSync('python', ['path/to/ccc.py', document.fileName]);
        const output = script.stdout.toString();
    
        // Parse the output and create a CodeLens for each function
        let codeLenses = [];
        for (let line of output.split('\n')) {
            if (line.trim() !== '') { // Ignore empty or invalid lines
                const [functionLine, complexity] = line.split(' ');
                const codeLensLine = Math.max(Number(functionLine) - 1, 0);
                let range = new vscode.Range(codeLensLine, 0, codeLensLine, 0);
                let command = {
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
