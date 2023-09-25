[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

# vscode-RosTooling

This repository contains the implementation of the [VSCode](https://code.visualstudio.com/api) extension to suport the [RosTooling](https://github.com/ipa320/ros-model) DSLs. Thansk to the extension, a textual editor include features like autocomplete, grammar checker and code generation.

Technical Maintainer: [**ipa-nhg**](https://github.com/ipa-nhg/) (**Nadia Hammoudeh Garcia**, **Fraunhofer IPA**) - **nadia.hammoudeh.garcia@ipa.fraunhofer.de**

## Usage from user perspective
Start the server:
```
cd vscode-RosTooling/resources
java -jar de.fraunhofer.ipa.ros.xtext.ide-3.0.0-SNAPSHOT-ls.jar -port 5008 -host 0.0.0.0
```
Start VS code:
```
$ git clone git@github.com:ipa320/vscode-RosTooling.git
$ cd vscode-RosTooling
$ code .
```
To start the extension in debug mode, press `F5`.


## Installation and debug from developer perspective

### Pre-requisites
### Install nvm
```
sudo apt install curl 
curl https://raw.githubusercontent.com/creationix/nvm/master/install.sh | bash 
source ~/.bashrc
source ~/.nvm/nvm.sh
nvm install 12
```

#### Generate the jar files
```
git clone git@github.com:ipa320/ros-model
cd ros-model/plugins/de.fraunhofer.ipa.ros.xtext.ide
mvn clean install
```

The .jar file will be generated under the folder `ros-model/plugins/de.fraunhofer.ipa.ros.xtext.ide/target`.

## Compile the plugin
```
cd vscode-RosTooling
source ~/.nvm/nvm.sh
nvm use 12
yarn install (maybe activate a virtual-env)
yarn build
```

## Start the plugin
```
code vscode-RosTooling
```

Press F5
