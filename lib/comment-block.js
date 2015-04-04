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
      if (areCommented(text) === 1)
        uncommentLines(editor, lines);
      else
        commentLines(editor, lines);
    else
      console.log("Something is wrong");
  }
};

function isCommented (lineText) {
  console.log(lineText.trim().indexOf("//") === 0);
  if (lineText.trim().indexOf("//") === 0)
    return 1;
  return 0;
}

function areCommented (lineText) {
  var array = lineText.split("\n");
  for (var i = 0; i < array.length; i++) {
    if(isCommented(array[i]))
      return 1;
  }
}

function commentLine(editor, lineText) {
  console.log("commenting line");
  var commentedText = "// " + lineText;
  var linePosition = editor.getCursorBufferPosition().column;

  if (linePosition === 0) {  //left
    editor.deleteToEndOfLine();
  } else { //right
    editor.deleteToBeginningOfLine();
    if (linePosition < lineText.length) { //middle
      editor.deleteToEndOfLine();
    }
  }
  //add
  editor.insertText(commentedText);
  //go for next line
  editor.insertText("\n");
  editor.deleteLine();
}


function uncommentLine(editor, toUncommentText) {
  console.log("uncommenting line");
  //add // at the begin of the line
  var uncommentedText;
  if (toUncommentText.substr(0,3) === "// ")
    uncommentedText = "" + toUncommentText.trim().substr(3);
  else
    uncommentedText = "" + toUncommentText.trim().substr(2);

  var linePosition = editor.getCursorBufferPosition().column;

  if (linePosition === 0) {  //left
    editor.deleteToEndOfLine();
  } else { //right
    editor.deleteToBeginningOfLine();
    if (linePosition < toUncommentText.length) { //middle
      editor.deleteToEndOfLine();
    }
  }
  //add
  editor.insertText(uncommentedText);
  editor.insertText("\n");
  editor.deleteLine();

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
