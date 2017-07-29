'use strict';

import * as vscode from 'vscode';
import * as grep from 'git-grep';
import * as child_process from 'child_process';

const PHP_MODE = 'php';

class PHPReferenceProvider implements vscode.ReferenceProvider {
    public provideReferences(
        document: vscode.TextDocument, position: vscode.Position,
        options: { includeDeclaration: boolean }, token: vscode.CancellationToken):
        Thenable<vscode.Location[]> {

        return new Promise<vscode.Location[]>((resolve, reject) => {

            const searchTerm = document.getText(document.getWordRangeAtPosition(position));
            let rg = child_process.spawn('rg', ['--column', searchTerm, vscode.workspace.rootPath]);

            rg.stdout.on('data', (data) => {
                let list = [];
                let lines = data.toString().split('\n');
                lines.forEach((item) => {
                    let arr = item.split(":");

                    if (arr.length>2) {
                        let range = new vscode.Range(new vscode.Position(parseInt(arr[1]), parseInt(arr[2])), new vscode.Position(parseInt(arr[1]), parseInt(arr[2])));
                        list.push(new vscode.Location(vscode.Uri.file(arr[0]), range));
                    }
                });

                return resolve(list);
            });

            rg.stderr.on('data', (data) => {
                console.log(`stderr: ${data}`);
            });

            rg.on('close', (code) => {
                console.log(`child process exited with code ${code}`);
            });
        });
    }
}



export function activate(context: vscode.ExtensionContext) {
    console.log('stated');
    context.subscriptions.push(
        vscode.languages.registerReferenceProvider(
            PHP_MODE, new PHPReferenceProvider()));

}

// this method is called when your extension is deactivated
export function deactivate() {
}
