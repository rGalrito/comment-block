module.exports = {
  activate: function() {
    atom.workspaceView.command(
      'comment-block:convert', this.convert);
    },

  convert: function() {
    var editor = atom.workspace.activePaneItem;
    var text = editor.getSelectedText();
    var lines = text.split("\n");
    var lineNumber = editor.getCursorBufferPosition().row;
    var lineText = editor.lineTextForBufferRow(lineNumber);
    //    var range = editor.getSelectedBufferRange();
    //    var range = editor.getTextInBufferRange(editor.getSelectedBufferRange());
    //    editor.setTextInBufferRange(range, text);
    console.log(editor);
    console.log(text);
    console.log(lines);
    console.log(lines.length);
    console.log(lineNumber);
    console.log(lineText);

    if (lines.length === 1 && lineText.trim() !== "")  //one line
      if (isCommented(lineText))  //line commented?
        uncommentLine(editor, lineText);
      else
        commentLine(editor, lineText);
    else if (lines.length > 1)  //more than 1 line
      if (areCommented(text)  === 1)
        uncommentLines(editor, lines);
      else
        commentLines(editor, lines);
    else
      console.log("Something is wrong");
  }
};

function isCommented (lineText) {
  //is it to comment
  if (lineText.trim().indexOf("//") >= 0)
    return 1
  return 0;
}


function commentLine(editor, lineText) {
  console.log("commenting line");
  var commentedText = "//" + lineText + "\n";
  editor.deleteLine();
  editor.insertText(commentedText);
}

function uncommentLine(editor, toUncommentText) {
  console.log("uncommenting line");
  //add // at the begin of the line
  var uncommentedText = toUncommentText.substr(2) + "\n";
  editor.deleteLine();
  editor.insertText(uncommentedText);
}

function commentLines(editor, lines) {
  console.log("commenting lines");
}
function uncommentLines(editor, lines) {
  console.log("uncommenting lines");
/*
  if (lines[0].length > 0 && lines.length == 2 && lines[1] === "") {
    console.log("entire line selected");
  }
  //if several lines selected
  else if (lines.length > 0) {
    console.log("several lines selected");
    //comment text
    text = "\/*\n" + text + "*\/\n";
    //add text
    editor.insertText(text);
  } else {
    console.log("some unxpected stuff");
  }
*/
}
