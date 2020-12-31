// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as Color from "color";
import * as vscode from "vscode";
import { hexToColor } from "./converter";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "Color" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  let stringToHex = vscode.commands.registerCommand(
    "color-code-converter.color-to-hex",
    () => {
      const { activeTextEditor } = vscode.window;
      if (activeTextEditor) {
        const { document } = activeTextEditor;
        const { languageId, lineCount } = document;

        if (languageId === "css" || languageId === "scss") {
          const textEdits: vscode.TextEdit[] = [];
          for (let i = 0; i < lineCount; i++) {
            const line = document.lineAt(i);
            const regex = /((rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\))/gi;

            let match = null;
            while ((match = regex.exec(line.text))) {
              const origin = line.text.substr(match.index, regex.lastIndex);
              const color = new Color(origin.replace(/;/g, ""));

              const newLine = line.text.replace(
                origin,
                `${color.hex()}${(color.alpha() * 255).toString(16).padStart(2, "0")};`
              );
              textEdits.push(vscode.TextEdit.replace(line.range, newLine));
            }
          }
          const workEdits = new vscode.WorkspaceEdit();
          workEdits.set(document.uri, textEdits);
          vscode.workspace.applyEdit(workEdits);
        }
      }
      return true;
    }
  );

  context.subscriptions.push(stringToHex);
  context.subscriptions.push(
    hexToColor("color-code-converter.hex-to-color-hsl", "hsl")
  );
  context.subscriptions.push(
    hexToColor("color-code-converter.hex-to-color-rgb", "rgb")
  );
}

// this method is called when your extension is deactivated
export function deactivate() {}
