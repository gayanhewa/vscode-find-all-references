[![](https://vsmarketplacebadge.apphb.com/version/gayanhewa.referenceshelper.svg)](https://marketplace.visualstudio.com/items?itemName=gayanhewa.referenceshelper) [![](https://vsmarketplacebadge.apphb.com/installs/gayanhewa.referenceshelper.svg)](https://marketplace.visualstudio.com/items?itemName=gayanhewa.referenceshelper) [![](https://vsmarketplacebadge.apphb.com/rating/gayanhewa.referenceshelper.svg)](https://marketplace.visualstudio.com/items?itemName=gayanhewa.referenceshelper)

# Find All References README

This module enables Visual Studio code to run `Find All References` calls with the power of `ripgrep` which is a soltion written in rust and performs well than Silver Searcher, Platinum searcher etc

## Features
- Find All References

![Alt text](/assets/find-references.gif?raw=true "Find References Demo 1")

## Requirements

### Powered by Ripgrep
This module  on [ripgrep](https://github.com/BurntSushi/ripgrep) package. Instructions to install ripgrep can be found [here](https://github.com/BurntSushi/ripgrep#installation)

You can install ripgrep using homebrew, Windows Chocolatey or Cargo if you are a rust developer. You also find the binaries to install on Linux, Windows and Mac on the [github repo](https://github.com/BurntSushi/ripgrep#installation).

`$ brew install ripgrep`

`$ choco install ripgrep`

`$ cargo install ripgrep`

### Powered by Silver Searcher

You can also use Silver searcher as an alternative to ripgrep. Simply install it and update the config

`$ brew install ag`

## Extension Settings

Include if your extension adds any VS Code settings through the `contributes.configuration` extension point.

For example:

This extension contributes the following settings:

* `find.all.references.engine`: rg/ag , based on the available seacher you can use either ripgrep ( rg ) or Silver Searcher ( ag )

Use ripgrep

`
    find.all.references.engine: 'rg'
`

Use silver searcher

`
    find.all.references.engine: 'ag'
`

## Known Issues

No testing has been carried out on Windows, PR's wellcome.

**Enjoy!**
