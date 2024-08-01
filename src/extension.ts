'use strict';

// import * as net from 'net';
import { spawn } from 'child_process';
import * as path from 'path';

//import {Trace} from 'vscode-jsonrpc';
//import { window, workspace, commands, ExtensionContext, Uri } from 'vscode';
import { workspace, ExtensionContext } from 'vscode';
import { LanguageClient, LanguageClientOptions } from 'vscode-languageclient/node';

let lc: LanguageClient;

export function activate(context: ExtensionContext) {
    // // The server is a started as a separate app and listens on port 5007
    // let connectionInfo = {
    //     host: "localhost",
    //     port: 5008
    // };
    // let serverOptions = () => {
    //     // Connect to language server via socket
    //     let socket = net.connect(connectionInfo);
    //     let result: StreamInfo = {
    //         writer: socket,
    //         reader: socket
    //     };
    //     return Promise.resolve(result);
    // };

    var serverOptions = function () {
        // Connect to the language server via a io channel
        var jar = context.asAbsolutePath(path.join('resources', 'de.fraunhofer.ipa.ros.xtext.ide-3.0.0-SNAPSHOT-ls.jar'));
        var child = spawn('java', ['-Xdebug', '-Xrunjdwp:server=y,transport=dt_socket,address=8000,suspend=n,quiet=y', '-jar', jar, '-log debug']);
        console.log(child.stdout.toString());
        child.stdout.on('data', function (chunk) {
            console.log(chunk.toString());
        });
        child.stderr.on('data', function (chunk) {
            console.error(chunk.toString());
        });
        return Promise.resolve(child);
    };
    
    let clientOptions: LanguageClientOptions = {
        documentSelector: ['ros'],
        synchronize: {
            fileEvents: workspace.createFileSystemWatcher('**/*.*')
        }
    };

    // Create the language client and start the client.
    lc = new LanguageClient('Xtext Server', serverOptions, clientOptions);

    var disposable = lc.start();
    /**
    var disposable2 =commands.registerCommand("ros.a.proxy", async () => {
        let activeEditor = window.activeTextEditor;
        if (!activeEditor || !activeEditor.document || activeEditor.document.languageId !== 'ros') {
            return;
        }

        if (activeEditor.document.uri instanceof Uri) {
            commands.executeCommand("ros.a", activeEditor.document.uri.toString());
        }
    })*/

    //context.subscriptions.push(disposable2);
    context.subscriptions.push(disposable);

    // enable tracing (.Off, .Messages, Verbose)
    //lc.setTrace(Trace.Verbose);
    //lc.start();
}
export function deactivate() {
    return lc.stop();
}
