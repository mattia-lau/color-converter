import * as vscode from "vscode";
import * as Color from "color";

export const hexToColor = (command: string, type: "hsl" | "rgb") =>
  vscode.commands.registerCommand(command, () => {
    const { activeTextEditor } = vscode.window;
    if (activeTextEditor) {
      const { document } = activeTextEditor;
      const { languageId, lineCount } = document;

      if (languageId === "css" || languageId === "scss") {
        const textEdits: vscode.TextEdit[] = [];
        for (let i = 0; i < lineCount; i++) {
          const line = document.lineAt(i);
          const regex = /(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3}))/g;

          let match = null;
          while ((match = regex.exec(line.text))) {
            const origin = line.text.substr(match.index, regex.lastIndex);
            const color = new Color(origin.replace(/;/g, ""));
            const newLine = line.text.replace(
              origin,
              `${type === "hsl" ? color.hsl() : color.rgb()};`
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
  });
