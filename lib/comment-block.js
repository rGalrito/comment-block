module.exports = {
  activate: function() {
    atom.workspaceView.command(
      'comment-block:convert', this.convert);
    },
  convert: function() {
    //object
    var editor = atom.workspace.activePaneItem;
    // raw content
    var text = editor.getSelectedText();
    // array with lines of content
    var lines = text.split("\n");
    if  (editor != null) {
      var lineNumber = editor.getCursorBufferPosition().row;
      var lineText = editor.lineTextForBufferRow(lineNumber);
    }
    //    var range = editor.getSelectedBufferRange();
    //    var range = editor.getTextInBufferRange(editor.getSelectedBufferRange());
    //    editor.setTextInBufferRange(range, text);
    console.log("editor" + editor);
    console.log("text" + text);
    console.log("lines" + lines);
    console.log("lines.length" + lines.length);
    console.log("lineNumber" + lineNumber);
//     console.log(lineText);

    if (lines.length === 1 && lineText.trim() !== "")  //one line
      if (isCommented(lineText))  //line commented?
        uncommentLine(editor, lineText);
      else
        commentLine(editor, lineText);
    else if (lines.length > 1)  //more than 1 line
      if (areCommented(lines) === 1)
        uncommentLines(editor, lines);
      else
        commentLines(editor, lines);
    else
      console.log("Something is wrong");
  }
};

function isCommented (lineText) {
  if (lineText.trim().indexOf("//") === 0)
    return 1;
  return 0;
}


/**
 * commentLine
 * 	this function will update (delete + add) the content of a line
 *
 * @param object editor       - atom.workspace.activePaneItem
 *                             	object that's going to be used to update
 * @param string lineText     -  the content in a line
 * @param number linePosition - position of the cursor along the line
 */
function commentLine(editor, lineText, linePosition) {
  //parameters validation
  if (linePosition == undefined)
    var linePosition = editor.getCursorBufferPosition().column;

  console.log("commenting line");
  //create content
  var commentedText = "// " + lineText;

  //remove line content
  if (linePosition === 0) {  //left
    editor.deleteToEndOfLine();
  } else { //right
    editor.deleteToBeginningOfLine();
    if (linePosition < lineText.length) { //middle
      editor.deleteToEndOfLine();
    }
  }

  //add content to line
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


/* ------- Multiple lines ------- */

/**
 * function that will tell if any selected line is commented
 *
 * @param array lines - array with all the content of the lines selected
 */
function areCommented (lines) {
  for (var i = 0; i < lines.length; i++) {
    console.log(lines[i]);
    console.log(isCommented(lines[i]));
    if(isCommented(lines[i]))
        return 1;
  }
  return 0;
}


function commentLines(editor, lines) {
    for (var i = 0; i < lines.length; i++) {
//       console.log(i + " linha - " + lines[i] );
//       uncommentLine(editor, lines[i]);
    }
}
function uncommentLines(editor, lines) {
    for (var i = 0; i < lines.length; i++) {
       console.log(i + " linha - " + lines[i] );
//        commentLine(editor, lines[i]);
    }
}
