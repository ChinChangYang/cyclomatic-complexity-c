import * as assert from 'assert';
import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

suite('Extension Test Suite', () => {
    vscode.window.showInformationMessage('Start all tests.');

    test('Cyclomatic Complexity Calculation Test', async () => {
        const testCaseName = 'case1';
        const expectedResultsPath = path.join(__dirname, `../../../src/sample/${testCaseName}.json`);
        const expectedResults = JSON.parse(fs.readFileSync(expectedResultsPath, 'utf-8'));

        const uri = vscode.Uri.file(
            path.join(__dirname, `../../../src/sample/${testCaseName}.c`)
        );

        const document = await vscode.workspace.openTextDocument(uri);

        const codeLenses = await vscode.commands.executeCommand<vscode.CodeLens[]>(
            'vscode.executeCodeLensProvider',
            document.uri
        );

        assert.strictEqual(codeLenses.length,
            expectedResults.length,
            `Number of CodeLens objects (${codeLenses.length}) does not match expected (${expectedResults.length})`);

        for (let i = 0; i < expectedResults.length; i++) {
            const expectedResult = expectedResults[i];

            const matchingCodeLens = codeLenses
                .find(cl => cl.range.start.line === expectedResult.line);

            assert.ok(matchingCodeLens, `No CodeLens found for line ${expectedResult.line}`);

            const complexityString = matchingCodeLens.command?.title.split(' ').find(s => !isNaN(Number(s)));
            assert.ok(complexityString, `Complexity string not found in CodeLens command title for line ${expectedResult.line}`);

            const complexity = Number(complexityString);
            assert.strictEqual(complexity, expectedResult.complexity,
                `For line ${expectedResult.line}: expected complexity (${expectedResult.complexity}) does not match calculated complexity (${complexity})`);
        }
    });
});
