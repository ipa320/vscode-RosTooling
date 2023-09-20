[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)

# vscode-RosTooling

We introduce a text and graphical IDE based on [VSCode](https://code.visualstudio.com/api) (desktop) and [Theia](https://theia-ide.org/) (web), with the kinematic model descibed in https://github.com/ipa320/ros-model as the base. This IDE allows creating kinematic models from scratch and composing those models. 

The text-based editor provides typical IDE features like code completion and navigation to declaration of a symbol. The graphical editor allows editing and visualizing the model as a TF tree. A live visualization of the models can be previewed in a side panel while editing in both tools. 

Technical Maintainer: [**ipa-nhg**](https://github.com/ipa-nhg/) (**Nadia Hammoudeh Garcia**, **Fraunhofer IPA**) - **nadia.hammoudeh.garcia@ipa.fraunhofer.de**

## Usage from user perspective
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

#### Start the language server
```
cd vscode-RosTooling/resources
java -jar de.fraunhofer.ipa.ros.xtext.ide-3.0.0-SNAPSHOT-ls.jar -port 5008 -host 0.0.0.0
```

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
