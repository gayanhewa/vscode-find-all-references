'use strict';

import * as vscode from 'vscode';
import * as child_process from 'child_process';

const PHP_MODE = 'php';

class ReferenceProvider implements vscode.ReferenceProvider {
    public provideReferences(
        document: vscode.TextDocument, position: vscode.Position,
        options: { includeDeclaration: boolean }, token: vscode.CancellationToken):
        Thenable<vscode.Location[]> {

        return new Promise<vscode.Location[]>((resolve, reject) => {
            const searchTerm = document.getText(document.getWordRangeAtPosition(position));

            // TODO : Introduce the ability to choose different search options ripgrep, silver searcher, git grep, platinum searcher etc
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

                    list.push(loc);
                }
            });

            return resolve(list);
        });
    }
}



export function activate(context: vscode.ExtensionContext) {
    let languages = [
        "php", "ruby", "rust", "python", "erlang", "java", "cpp", "c", "markdown", "xml", "haml", "twig", "bat",
        "bibtex", "clojure", "coffeescript", "css", "csharp", "diff", "dockerfile", "fsharp", "go", "groovy", "handlebars", "html",
        "ini", "json", "latex", "less", "lua", "makefile", "objective-c", "objective-cpp", "perl6", "perl", "powershell",
        "jade", "python", "r", "razor", "scss", "shaderlab", "shellscript", "sql", "swift", "tex", "xsl", "yaml"
    ];

    languages.forEach((language) => {
        context.subscriptions.push(
            vscode.languages.registerReferenceProvider(
                language, new ReferenceProvider()));
    });

}

// this method is called when your extension is deactivated
export function deactivate() {
}
