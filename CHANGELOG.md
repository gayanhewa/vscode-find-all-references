# Change Log
All notable changes to the "Find All References" extension will be documented in this file.

## [v0.2.0]

- Fix the issue with the passing in additional options to the engine
- Support all available options without restriction to the engine

## [v0.1.3]

- Fixing the bug with the config option not getting picked up
- Refactoring the main classes
- Introducing additional options for the searcher `tool --arguments` with a default `--column` argument

## [v0.1.2]

- Remove registered command that is unused.

## [v0.1.0]

The initial release of the application. The release is still in beta, expect certain things to fail. Please report issues.

- Supports find references using ripgrep
- Supports find all references using silver searcher
- The reference search support bind to all languages in the list of [identifiers](https://code.visualstudio.com/docs/languages/identifiers) except for typescript since vscode ships with that built in.
