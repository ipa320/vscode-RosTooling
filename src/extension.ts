'use strict';

import * as net from 'net';

//import {Trace} from 'vscode-jsonrpc';
import { window, workspace, commands, ExtensionContext, Uri } from 'vscode';
import { LanguageClient, LanguageClientOptions, StreamInfo } from 'vscode-languageclient/node';

let lc: LanguageClient;

export function activate(context: ExtensionContext) {
    // The server is a started as a separate app and listens on port 5007
    let connectionInfo = {
        port: 5008,
        host: "0.0.0.0"
    };
    let serverOptions = () => {
        // Connect to language server via socket
        let socket = net.connect(connectionInfo);
        let result: StreamInfo = {
            writer: socket,
            reader: socket
        };
        return Promise.resolve(result);
    };
    
    let clientOptions: LanguageClientOptions = {
        documentSelector: ['ros'],
        synchronize: {
            fileEvents: workspace.createFileSystemWatcher('**/*.*')
        }
    };
    
    // Create the language client and start the client.
    lc = new LanguageClient('Xtext Server', serverOptions, clientOptions);

    var disposable2 =commands.registerCommand("ros.a.proxy", async () => {
        let activeEditor = window.activeTextEditor;
        if (!activeEditor || !activeEditor.document || activeEditor.document.languageId !== 'ros') {
            return;
        }

        if (activeEditor.document.uri instanceof Uri) {
            commands.executeCommand("ros.a", activeEditor.document.uri.toString());
        }
    })

    context.subscriptions.push(disposable2);

    // enable tracing (.Off, .Messages, Verbose)
    //lc.setTrace(Trace.Verbose);
    lc.start();
}
export function deactivate() {
    return lc.stop();
}
