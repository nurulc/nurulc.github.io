# nurulc.github.io

[Go to the site](https://nurulc.github.io/)


Remember to disable pre and post install scripts in **NPM**

`bash
npm config  set ignore-scripts true
`


TryIt

Small utility to create code to perform tryit functionality

```html
<div id="tryit1-container" >
  <div class="tryit-cotrol">
    <button onclick="tryIt('tryit1')">Tryit</button>
  </div>
  
    <textarea id="tryit1" class="tryit-code">
      var x = {value: 1/2.0, name: 'This is my Name'};
      x
    </textarea>
 
  <div id='tryit1-error' class="tryit-error"></div>
  <div id="tryit1-display" class="tryit-display"></div>
</div>
```

<pre>tryit
var x = {value: 1/2.0, name: 'This is my Name'};
x
</pre>
# hello
<pre>tryit
y = 5



z = 1
</pre>
