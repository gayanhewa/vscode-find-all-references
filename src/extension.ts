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

            let rg = child_process.spawnSync('rg', ['--column', searchTerm, vscode.workspace.rootPath]);
            let lines = rg.stdout.toString().split('\n');

            let list = [];

            lines.forEach((item) => {
                let arr = item.split(":");

                if (arr.length>2) {
                    // Position starts from zero refer to vscode.d.ts
                    let line_no = parseInt(arr[1])-1;
                    let col_no = parseInt(arr[2])-1;

                    let start_pos = new vscode.Position(line_no, col_no);
                    let end_pos = new vscode.Position(line_no, col_no+searchTerm.length);
                    let loc = new vscode.Location(vscode.Uri.file(arr[0]), new vscode.Range(start_pos, end_pos));
                    console.log(loc);
                    list.push(loc);
                }
            });

            return resolve(list);
        });
    }
}



export function activate(context: vscode.ExtensionContext) {
    context.subscriptions.push(
        vscode.languages.registerReferenceProvider(
            PHP_MODE, new PHPReferenceProvider()));
}

// this method is called when your extension is deactivated
export function deactivate() {
}
