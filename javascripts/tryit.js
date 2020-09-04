function $(name) {
  var e = document.getElementById(name);
  if (!e) return { innerText: "" };
  return e;
}
// ----------------------------------------
// Render
// ----------------------------------------
const mountNode = document.getElementById("react-app-mount");
//console.log(!!mountNode, App)
//ReactDOM.render(<App />, mountNode);
var editor = CodeMirror.fromTextArea(document.querySelector("#tryit1"), {
  lineNumbers: true,
  mode: "javascript",
  theme: "dracula",
  tabSize: 2
});
editor.setSize("600", "10rem");
console.log("editorx", Object.keys(editor));
console.log("finish");
// function globalEval(expression) {
//     return Function(expression)();
//   }
globalEval = eval;
function display(d) {
  return JSON.stringify(d, null, "&nbsp;");
}
function tryIt(divName) {
  try {
    // var val = eval($(divName).innerText);
    //console.log('editor', editor)
    var val = globalEval(editor.getValue("\n"));
    $(divName + "-display").innerHTML = "<pre>" + display(val) + "</pre>";
  } catch (e) {
    var err = $(divName + "-error");
    err.innerText = e.message;
    err.style.display = "block";
  }
}

// tryIt('tryit1')
