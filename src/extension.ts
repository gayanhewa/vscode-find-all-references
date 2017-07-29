'use strict';

import * as vscode from 'vscode';

const PHP_MODE = 'php';

class PHPReferenceProvider implements vscode.ReferenceProvider {
    public provideReferences(
        document: vscode.TextDocument, position: vscode.Position,
        options: { includeDeclaration: boolean }, token: vscode.CancellationToken):
        Thenable<vscode.Location[]> {

        return new Promise((resolve, reject) => {

            let uri = vscode.Uri.parse("/Users/gayan.hewa/Workspace/phphelper/index.php");
            let pos =  new vscode.Position(8,22);
            console.log(pos);

            let arr = [new vscode.Location(uri, pos)];
            return arr;
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
