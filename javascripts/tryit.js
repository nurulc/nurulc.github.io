
function $e(name) {
  var e = document.getElementById(name);
  if (!e) return { innerText: "" };
  return e;
}
// ----------------------------------------
// Render
// ----------------------------------------

let __editors = [];

function _makeEditor(id) {
  let textarea = document.querySelector(`#${id}`);
  let lines = textarea.value.split('\n').length;
  let editor = CodeMirror.fromTextArea(textarea, {
    lineNumbers: true,
    mode: "javascript",
    theme: "cobalt",
    extraKeys: {
            "Ctrl-Enter": execCode,
            "Cmd-Enter": execCode
    },
    tabSize: 2
  });
  __editors.push(id);
  let height = '';
  if(lines < 5 ) height = "5rem";
  else if( lines > 20 ) height = "35rem";
  else height = (lines*1.5)+'rem';

  editor.setSize("inherit", height);

  let but = document.querySelector(`#${id}-run`);

  but.onclick = execCode;
  function execCode() { return tryIt(id,editor);}
}

function makeEditor() {
  var elts = document.querySelectorAll(".tryit");
  let list = Array.prototype.slice.call(elts);
  list.map( e => e.id).forEach(_makeEditor);
}

function display(d) {
  if(d && d._toHtml ) {
     return d._toHtml();
  }
  else if( typeof d === "string") {
    if( d && d.length > 20000) d = d.substr(0,20000)+"... MORE" 
    return "<pre>" + d + "</pre>";
  }
  else if( d ){
    return prettyPrint(d).outerHTML;
  }
  let v = JSON.stringify(d, null, "&nbsp;");
  if( v && v.length > 20000) v = v.substr(0,20000)+"... MORE" 
  return "<pre>" + (v || (d !== undefined?d.toString():undefined)) + "</pre>";
  
}

function objInfo(c) {
  const instanceMethods = Object.getOwnPropertyNames(c.prototype)
        .filter(prop => prop != "constructor");
//console.log(instanceOnly);
  const staticMethods = Object.getOwnPropertyNames(c)
    .filter(prop => typeof c[prop] === "function");
//console.log(staticOnly);
  return {instanceMethods, staticMethods};
}

function canExecute(tag) {
  let ix = __editors.indexOf(tag);
  if( ix <= 0) return true;
  showPopup(1,() => jump(__editors[0]));
  //jump(__editors[0]);
  return false;
}

function addRemoveCSSclass(next_button,classToAdd, classToRemove) {
  if(next_button) {
     let b = $e(next_button+'-run');
     if(b) {
       b.classList.remove(classToRemove);
       b.classList.add(classToAdd);
     }
  }
}

function removeTag(tag) {
  let ix = __editors.indexOf(tag);
  if( ix !== 0) return false;
  __editors = __editors.slice(1);
  addRemoveCSSclass(__editors[0], "green", "disabled");
  // let next_button = __editors[0];
  // if(next_button) {
  //    let b = $e(next_button+'-run');
  //    if(b) {
  //      b.classList.remove("disabled");
  //      b.classList.add("green");
  //    }
  // }
  return true;

}
class A {};


function totalOffsetTop (e)
{
    var offset = 0;
    do 
        offset += e.offsetTop;
    while (e = e.offsetParent);
    return offset;
}

function jump(h) {
    
    document.location.hash = "_"+h;
    setTimeout(() => window.scrollBy(0,-70),0)
}

function tryIt(divName,editor) {

  if(!canExecute(divName)) return;
  var _err = $e(divName + "-error");
  var _disp = $e(divName + "-display");
  _err.style.display = "none";
  _err.innerHTML = "";
  //_disp.style.display = "none";
  _disp.innerHTML = "";
  _disp.style.height = "20rem";
  
  setTimeout( () => {
      try {

        var val = (1,eval)(editor.getValue("\n"));
        let show = val => ($e(divName + "-display").innerHTML = display(val));
        if( val instanceof Promise)  val.then(show)
        else show(val);
        removeTag(divName);
        addRemoveCSSclass(divName, "blue", "green");
        console.log('goto' + ('end_'+divName) );
        setTimeout( () => jump(divName),0);

      } catch (e) {
        var err = $e(divName + "-error");
        err.innerText = e.toString();
        err.style.display = "block";
      }
      
    },200);
}

// =======================================================================

function showPopup(timeout, action){
  // var delay = alertify.get('notifier','delay');
  // alertify.set('notifier','delay', 10);
  // //alertify.success('Current delay : ' + alertify.get('notifier','delay') + ' seconds');
  // alertify.success('Please execute preceeing code snippet');
  // alertify.set('notifier','delay', delay);
  alertify.notify('Please execute preceeing code snippet','error',timeout, action );
  //alertify.notify('sample', 'success', 5, function(){  console.log('dismissed'); });
}

// let msgboxShowMessage = document.querySelector("#msgboxShowMessage");
// let msgboxHiddenClose = document.querySelector("#msgboxHiddenClose");

// Creation of Message Box class, and the sample usage
// let msgboxbox = new MessageBox("#msgbox-area", {
//   closeTime: 10000,
//   hideCloseButton: false
// });
// let msgboxboxPersistent = new MessageBox("#msgbox-area", {
//   closeTime: 0
// });
// let msgboxNoClose;

// function showPopupX() {
//   if(!msgboxNoClose) {
//    msgboxNoClose = new MessageBox("#msgbox-area", {
//       closeTime: 1000,
//       hideCloseButton: true
//     });
//   }
//   msgboxNoClose.show("It is important yo evecute the previous code samples before this one");

// }

// // document.querySelector("#msgboxPersistent").addEventListener("click", function() {
// //   msgboxboxPersistent.show("Hello! I am a persistent message box! I will hide myself if you close me.");
// // });

// // msgboxShowMessage.addEventListener("click", function() {
// //   msgboxbox.show("Hello! I am a non-persistent message box! I will hide myself automatically after 5 seconds, but you may also close me.", null);
// // });

// // msgboxHiddenClose.addEventListener("click", function() {
// //   msgboxNoClose.show("Hello! My close button is hidden, but I will close myself after 5 seconds.");
// // });

// // Show the message at the beginning
// // msgboxboxPersistent.show(
// //   "Hello! I am a message box! I will appear on the page load period. I also have a callback. You may check on 'Console' to see.",
// //   "CALLBACK", () => {
// //   console.log("I am the callback! Of course, you may add various javascript codes to make the callback function colourful.");
// // });
// // ============================================
// "use strict";

// function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left); } else { return left instanceof right; } }

// function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

// function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

// var MessageBox = /*#__PURE__*/function () {
//   function MessageBox(id, option) {
//     _classCallCheck(this, MessageBox);

//     this.id = id;
//     this.option = option;
//   }

//   _createClass(MessageBox, [{
//     key: "show",
//     value: function show(msg) {
//       var _this = this;

//       var label = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "CLOSE";
//       var callback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

//       if (this.id === null || typeof this.id === "undefined") {
//         // if the ID is not set or if the ID is undefined
//         throw "Please set the 'ID' of the message box container.";
//       }

//       if (msg === "" || typeof msg === "undefined" || msg === null) {
//         // If the 'msg' parameter is not set, throw an error
//         throw "The 'msg' parameter is empty.";
//       }

//       if (typeof label === "undefined" || label === null) {
//         // Of the label is undefined, or if it is null
//         label = "CLOSE";
//       }

//       var option = this.option;
//       var msgboxArea = document.querySelector(this.id);
//       var msgboxBox = document.createElement("DIV");
//       var msgboxContent = document.createElement("DIV");
//       var msgboxClose = document.createElement("A");

//       if (msgboxArea === null) {
//         // If there is no Message Box container found.
//         throw "The Message Box container is not found.";
//       } // Content area of the message box


//       msgboxContent.classList.add("msgbox-content");
//       msgboxContent.innerText = msg; // Close burtton of the message box

//       msgboxClose.classList.add("msgbox-close");
//       msgboxClose.setAttribute("href", "#");
//       msgboxClose.innerText = label; // Container of the Message Box element

//       msgboxBox.classList.add("msgbox-box");
//       msgboxBox.appendChild(msgboxContent);

//       if (option.hideCloseButton === false || typeof option.hideCloseButton === "undefined") {
//         // If the hideCloseButton flag is false, or if it is undefined
//         // Append the close button to the container
//         msgboxBox.appendChild(msgboxClose);
//       }

//       msgboxArea.appendChild(msgboxBox);
//       msgboxClose.addEventListener("click", function (evt) {
//         evt.preventDefault();

//         if (msgboxBox.classList.contains("msgbox-box-hide")) {
//           // If the message box already have 'msgbox-box-hide' class
//           // This is to avoid the appearance of exception if the close
//           // button is clicked multiple times or clicked while hiding.
//           return;
//         }

//         _this.hide(msgboxBox, callback);
//       });

//       if (option.closeTime > 0) {
//         this.msgboxTimeout = setTimeout(function () {
//           _this.hide(msgboxBox, callback);
//         }, option.closeTime);
//       }
//     }
//   }, {
//     key: "hide",
//     value: function hide(msgboxBox, callback) {
//       var _this2 = this;

//       if (msgboxBox !== null) {
//         // If the Message Box is not yet closed
//         msgboxBox.classList.add("msgbox-box-hide");
//       }

//       msgboxBox.addEventListener("transitionend", function () {
//         if (msgboxBox !== null) {
//           // If the Message Box is not yet closed
//           msgboxBox.parentNode.removeChild(msgboxBox);
//           clearTimeout(_this2.msgboxTimeout);

//           if (callback !== null) {
//             // If the callback parameter is not null
//             callback();
//           }
//         }
//       });
//     }
//   }]);

//   return MessageBox;
// }();

