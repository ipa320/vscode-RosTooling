'use strict';

import * as net from 'net';

//import {Trace} from 'vscode-jsonrpc';
//import { window, workspace, commands, ExtensionContext, Uri } from 'vscode';
import { workspace, ExtensionContext } from 'vscode';
import { LanguageClient, LanguageClientOptions, StreamInfo } from 'vscode-languageclient/node';

let lc: LanguageClient;

export function activate(context: ExtensionContext) {
    // The server is a started as a separate app and listens on port 5007
    let connectionInfo = {
        host: "localhost",
        port: 5008
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
        documentSelector: ['ros1'],
        synchronize: {
            fileEvents: workspace.createFileSystemWatcher('**/*.*')
        }
    };
    
    // Create the language client and start the client.
    lc = new LanguageClient('Xtext Server', serverOptions, clientOptions);

    var disposable = lc.start();
    /**
    var disposable2 =commands.registerCommand("ros1.a.proxy", async () => {
        let activeEditor = window.activeTextEditor;
        if (!activeEditor || !activeEditor.document || activeEditor.document.languageId !== 'ros1') {
            return;
        }

        if (activeEditor.document.uri instanceof Uri) {
            commands.executeCommand("ros1.a", activeEditor.document.uri.toString());
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
