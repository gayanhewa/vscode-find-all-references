'use strict';

import * as vscode from 'vscode';
import * as child_process from 'child_process';
import { EngineOptions } from './EngineOptions';


export class ReferenceProvider implements vscode.ReferenceProvider {
    public provideReferences(
        document: vscode.TextDocument, position: vscode.Position,
        options: { includeDeclaration: boolean }, token: vscode.CancellationToken):
        Thenable<vscode.Location[]> {

        return new Promise<vscode.Location[]>((resolve, reject) => {
            const searchTerm = document.getText(document.getWordRangeAtPosition(position));
            const options = this.getEngineOptions();
            // TODO : Introduce the ability to choose different search options ripgrep, silver searcher, git grep, platinum searcher etc
            let rg = child_process.spawnSync(options.getEngine(), [options.getOptions(), searchTerm, vscode.workspace.rootPath]);
            let lines = rg.stdout.toString().split('\n');
            let list = [];

            lines.forEach((item) => {
                console.log(item);
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

    private getEngineOptions(): EngineOptions {
        const engine = vscode.workspace.getConfiguration().get<string>('find.all.references.engine');
        const engine_options = vscode.workspace.getConfiguration().get<string>('find.all.references.options');

        // --column is hardcoded because its mandatory for now
        const options = '--column '+engine_options;
        console.log("Find All References Is Configured to use :", engine);
        console.log("Find All References Is Configured with options:", options);

        const ops = new EngineOptions(engine === undefined? 'rg': engine, options);
        console.log('ops', ops);
        return ops;
    }
}
