var fs = require('fs');
var showdown = require('showdown');


function identity(x) { return x; }
function mdToHtml(x) {
    var converter = new showdown.Converter();
    return html = converter.makeHtml(x);;
}

function asHTML(x) {
   return x.replace(/&/g, '~AMP~').replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/~AMP~/g,"&amp;")
}


function tryit(x,i) {
    return ("<a id=\"_tryit"+(i)+"\">&nbsp</a>\n"+
            "<div class=\"html ui top attached segment tryit-container \" >\n"+
            
            "<div class=\"ui sizer vertical segment\" style=\"font-size: 1rem; padding-top: 2rem;\">\n"+
            "<div class=\"ui sizer vertical segment bottom\">"+
            "\t<textarea class=\"tryit ui \" id=\"tryit"+i+"\">\n"+
            asHTML(x)+"\n"+
            "\t</textarea></div>\n"+
            "<a id=\"_end_tryit"+(i)+"\">\n"+"&nbsp;</a>\n"+
            "\t<div id=\"tryit"+i+"-error\" class=\"tryit-error\"></div>\n"+
            "\t<div id=\"tryit"+i+"-display\" class=\"tryit-display rendered_html\"></div>\n"+
            "</div>"+
            `<div class="ui top attached label">
                <button id="tryit${i}-run" class="ui  ${i>1?'disabled':'green'} right labeled icon button texec"><i class="caret square right icon"></i>
                  Run
                </button>
             </div>
             </div>`+
            "</div>");
}

function gen() {
    let i = 1;
    return ([type, x],ix) => {
        //console.log(type)
        switch(type.trim().split(/\s+/)[0]) {
            case '!head':
                return "<head>\n"+x+"</head>\n<body>";
            case "!md"   : return mdToHtml(x);
            case "!tryit": return "\n"+tryit(x,i++); 
            case "!end" : return "<script>makeEditor();</script>\n</body></html>";
            case "!--": return "";
            default: return x;
        }
    };
}


function sections(lines) {
    let lastLine = '';
    var [list, type, agg] = lines.reduce( ([list, type, agg], line) =>{
        if(line.match(/^(![a-z]+|!--)$/)) {
           if(agg) list.push([type, agg]);
           lastLine="";
           return [list, line, ''];
        }
        if(line === '' && lastLine === '') {
            line = '';
        } else {
            lastLine = line.trim();
            line = (agg?'\n':'')+line;
        }
        return [list, type, agg+line];
    }, [[], '!html', '']);
    if(type === '!end' || agg) list.push([type, agg]);
    return list;
} 

function writeOut(str) {
    fs.writeFileSync('data-frame-examples.html', str, 'utf8');

}

var lines = fs.readFileSync('data-frame-examples.ex','utf8').replace(/\r/g, '').split('\n');
var html = sections(lines).map(gen()).join('\n');
writeOut(`
<!doctype html>
<html>
${html}
`)