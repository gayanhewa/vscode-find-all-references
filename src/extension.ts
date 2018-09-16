'use strict';

import * as vscode from 'vscode';
import { ReferenceProvider } from './Providers/ReferenceProvider';

export function activate(context: vscode.ExtensionContext) {
    let languages = [
        "php", "ruby", "rust", "python", "erlang", "java", "cpp", "c", "markdown", "xml", "haml", "twig", "bat",
        "bibtex", "clojure", "coffeescript", "css", "csharp", "diff", "dockerfile", "fsharp", "go", "groovy", "handlebars", "html",
        "ini", "json", "latex", "less", "lua", "makefile", "objective-c", "objective-cpp", "perl6", "perl", "powershell",
        "jade", "python", "r", "razor", "scss", "shaderlab", "shellscript", "sql", "swift", "tex", "xsl", "yaml",
        "fortran", "fortran-modern"
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
