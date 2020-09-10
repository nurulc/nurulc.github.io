!head
<title>Data Frame Examples</title>
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.57.0/codemirror.min.css"/>
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.57.0/theme/cobalt.min.css"/>

<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.57.0/codemirror.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.57.0/mode/javascript/javascript.min.js"></script>


<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/reset.min.css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/site.min.css">

<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/container.min.css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/grid.min.css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/header.min.css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/image.min.css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/menu.min.css">

<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/divider.min.css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/dropdown.min.css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/segment.min.css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/button.min.css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/list.min.css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/icon.min.css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/sidebar.min.css">
<link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/components/transition.min.css">
<script src="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/alertify.min.js"></script>

<!-- highlighter.js -->
<link rel="stylesheet"
      href="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.2.0/build/styles/default.min.css">
<script src="//cdn.jsdelivr.net/gh/highlightjs/cdn-release@10.2.0/build/highlight.min.js"></script>

<!-- CSS -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/alertify.min.css"/>
<!-- Semantic UI theme -->
<link rel="stylesheet" href="//cdn.jsdelivr.net/npm/alertifyjs@1.13.1/build/css/themes/semantic.min.css"/>
<script src="javascripts/prettyprint.js"></script>
<script src="https://unpkg.com/str-data-frame@0.2.17/dist/bundle.js"></script>
<script src="javascripts/tryit.js"></script>
<link rel="stylesheet" type="text/css" href="tryit.css">

<style>
body { 
    padding: 3rem;
    padding-right: 8rem;
    overflow-x: hidden;
    min-width: 320px;
    background: #fff;
    font-family: Lato,'Helvetica Neue',Arial,Helvetica,sans-serif;
    font-size: 14px;
    line-height: 1.4285em;
    color: rgba(0,0,0,.87);
}
textarea {
	width: 80%;
}
</style>
<script>

function D(d) {
	if(d === undefined ) return "<undef>";
	//if(isClass(d)) return d.prototype.constructor.toString();
	if(typeof d === 'function') return "<func body>"; 
	if(d instanceof Date) return d.toString;
	if(typeof d === 'object') return JSON.stringify(d)
	return d.toString();
}

function getType(d) {
	if(d === undefined) return 'undefined'
	if(Array.isArray(d)) return 'Array';
	if(isClass(d)) return "class";
	return typeof d;

}

function isClass(d) { return false;
  // try {
  // 	if( typeof d !== "function" ) return false; 
  // 	var x = new d;

  // 	let name = x.constructor ? x.constructor.name : '';
  // 	return (name !== '' && name !==  'Array' && name !== 'Function');
  //  } catch(e) {
  //  	  return false;
  //  }
}


  // const isCtorClass = obj.constructor
  //     && obj.constructor.toString().substring(0, 5) === 'class'
  // if(obj.prototype === undefined) {
  //   return isCtorClass
  // }
  // const isPrototypeCtorClass = obj.prototype.constructor 
  //   && obj.prototype.constructor.toString
  //   && obj.prototype.constructor.toString().substring(0, 5) === 'class'
  // return isCtorClass || isPrototypeCtorClass

</script>
!html

!md
#Data Frame
## Summary

This is a database like data manipulation library that provides the ability to perform simple database type operations on tabular data. The principle component of the library is a Frame. This is a data structure that represent a tabular data consisting of rows and columns. Each column has a name, and just like a database the column names must be unique. The tool has been tested with 1 million rows with good performance. The total amount of data is limited by the memory of your browser or node instance. All elements (cells) are stored as strings or numbers. That conversion is done by the _**frameFromBuffer**_ function.  Please note thst the frame is aware that some numbers may be stored as strings, and most of the utilities will treat numbers in string format as if they were numbers. Strictly speaking you can store any any javascript primitive is a cell, but that has not been fully tested and so buyer be aware.

The operations include the ability to do the following:

* Convert CSV, TSV data to a frame
* Create a subset of the data using the filter or select method similar to the sql select, including
    * Add new columns, optionally with new data
    * Reorder couumns
    * Rename columns
    * Systematically change data is columns
* Join a frame with another frame similar to SQL innerJoin, leftJoin and outer join
* Sort data of several columns ascending or descending on individual columns
* Group by operation base of a set of columns, with grouping operation on some of the other columns:
     * gb.count _count the number of non-empty values is a group_
     * gb.max - _maximun value of a column in a group_
     * gb.min - _the minimum value of a column in a group_ 
     * gb.min - _the minimum value of a column in a group_ 
     * gb.mean - _the average value of a column in a group (ignoring empty values)_
     * gb.stdDev - _the standard deviation value of a column in a group (ignoring empty values)_
     * some others 


## Introduction

The inspiration for data frame came from two sources, SQL and the powerful python pandas utility. Frame does not attempt to provide all the functionality of pandas or that of SQL. The examples provided here will
give a taste of some of the things it can do.

> code assumes
> 

#Getting started

we have to bring in the str-data-frame npm module. We have several choices, using javascript es6+ module symtax,
using webpack or similar bundler, or just as a script. For rhe purposed of this tutorial I am using the good old script method. I creates in the global namesapce _DataFrame_ variable.

### DataFrame package 

Lets do a quick look a what is defined in the package

* Get the names (keys) in the module using ```Object.keys(DataFrame)``` 
* map the list of names to name/value pair *[name, value]*
* map the [name, value] to [name, *type of value*, **display string of the value**] note 
* result is in _**data**_ 

Note:

**Display function** _D(value)_
```javascript
function D(d) {
	if(d === undefined ) return "<undef>";
	if(isClass(d)) return d.prototype.constructor.toString();
	if(typeof d === 'function') return "<func body>"; 
	if(d instanceof Date) return d.toString;
	if(typeof d === 'object') return JSON.stringify(d)
	return d.toString();
}
```

!tryit
var data = Object.keys(DataFrame)
   .map(
   		name => [name, DataFrame[name] ]
   ).map( 
       ([name,value]) => [name , getType(value), D(value)]
   )

// Display the result 
data
!md

### Convert the data into a Frame

!tryit
var {Frame} = DataFrame;

var df = new Frame(data, ['Name', 'Type', 'Value'])
df
!md
## Count of rows by Type

As you can see every property in DataFrame object has a type and a value.

!tryit
var {gb,transpose} = DataFrame; // group by operations

var res = df.groupBy(['Type', gb.count('Name', 'Count#')])
//display res
res

!md
## Transpose

!tryit
transpose(res)

!md
### Filtering
!tryit
 df.filter(r => r.Type==='string')

!tryit

objInfo(Frame)

!md
## Get some data 2

We will use world covid-19 daily statistics

!tryit
	
	var csvData;
	
	var WORLD_DATA_SRC ='https://raw.githubusercontent.com/owid/covid-19-data/master/public/data/owid-covid-data.csv';
	var p = fetch(WORLD_DATA_SRC)
  		.then(response => response.text())
  		.then(data => Promise.resolve(csvData = data));

    p.then(str => str.split('\n').slice(0,10))

!md
##Create a frame from the data

!tryit
  var {frameFromBuffer, csvLine, arrProd} = DataFrame;
  var covidFrame = frameFromBuffer(csvData,'',csvLine);

  // Display the first 11 results
  covidFrame.slice(0,11)

!md
## Show the size of the frame and the column names

* Length of the frame  _(covidFrame.length)_
* All column Names _(covidFrame.columns)_
* List the columns that are mostly numeric _(covidFrame.numericColumns)_

!tryit
var {arrRemove} = DataFrame;


var cf = covidFrame;
var {columns, numericColumns} = cf;
var nonNumericColumns = arrRemove(columns,numericColumns)

var summary = ({ rows: covidFrame.length, 
   "Non Numeric Columns":nonNumericColumns, 
   "Numeric Columns": covidFrame.numericColumns
});

// display
summary
!md

### Show the data summary as a Frame

!tryit
var data =[ ["rows",'', ''+covidFrame.length],
        ...nonNumericColumns.map(col => ['Numeric', col, ''+cf.groupBy([gb.count(col)]).data[0][0]]),
       ...covidFrame.numericColumns.map(col => ['Alpha', col, ''+cf.groupBy([gb.count(col)]).data[0][0]])];

new Frame(data, ['Type',"Name", "Count"])
     .sort(['Count','Name'])

!md
##Get rid of unnecessary columns

In sql we can do this using _select_ columns _from_ table, further the select operation can rename the columns, add new columns, and transform data is columns

We use a similar operation for a data frames using the project

```js
     frame.project([ list of columns])
```
* We can change a column name with the following code, change _location_ to **_country_**
```js
   [..., "location=country",...]
```
!rem `
We also can reorder the columns by chosing the order of the columns, the example below shows
how to create a new frem from a subset of the original columns and renaming a column

**Note** We can also add new columns by adding a new column name


!tryit
var SELECTED_COLUMNS = [
  ['iso_code', (iso, ro) => iso || ro.location], // note you have to use the original names to the renamed ones
  'location=country', // rename location to country
  ['continent', (c,ro) => c || ro.location], // if not continent data use the country name sa the continent
  'date',
  'total_cases',
  'new_cases',
  'total_deaths',
  'new_deaths',
  'new_tests',
  'total_tests',
  'positive_rate',
  'population',
  ['INDEX', (value, row, ix) => ix+1]  // new column use the row number as the index
];

var frame = covidFrame.select(
      SELECTED_COLUMNS,
      ro => ro.total_cases > 0 // only keep the rows for a country start from the date of the first case 
);

// show first 20
frame.slice(0,20)
  
  
!md
##Get data for Brazil

Here we will use a simpler version of select that keeps all the columns as is and filters out some of the rows. This is the same as the following sql

> select * from covidFrame where country = 'Brazil' 



!tryit
frame.filter(r => r.country === 'Brazil')

!md
### Summary of cases by country

!tryit
var {sum, count, max, mean} = gb; // aggrigator functions for groupBy

var summary = frame.groupBy(
  ['country','continent', 
    max('total_deaths','deaths'), // show the maximum value of 'total_deaths' and call it deaths 
    count('INDEX', 'count'),      // count the number of entries (daily info) for each country
    max('total_cases','cases'),   // show the maximum value of 'total_cases' and call it 'cases' 
    'population'
  ])
  .sort(['continent', '-cases']);  // sort continent and cases, the cases in descending order

//display
summary

!md
## Lets try to improve the display of numbers

!tryit
function addCommas(nStr) {
    nStr += '';
    var x = nStr.split('.');
    var x1 = x[0];
    var x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
            x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}

function toStr(str) {
  let num = (+str);
  if(Math.abs(Math.round(num)-num) < 1e-6) num = Math.round(num);
  return addCommas(num.toString());

}
Frame.HTMLFormat.number = toStr;


// Display
summary

!md

#Summarize the information by continent

This section will reformat the data by trans to create summary by continent


!tryit
//summary.groupBy(['continent', 'country'])
var continent_summary = 
    summary.groupBy(['continent', sum('deaths'),  count('country', 'countries'), mean('deaths', 'avg_by_country'), sum('cases'), sum('population')]);

// Display it

!md
### Transpose 

Transpose will rotate the table, the column name comes from the row in the country column. Pay special attention
the 'country' column is call the transpose pivot and it is important all the values in this column are unique. If the values are not unique the result of the transpose will look very weird and may violate the requirement that all the column names rae unique.

!tryit
transpose(continent_summary, 'country')


## Sample 1% (0.01) of the data and show the first 20
!tryit
var sample = frame.filter(()=> Math.random() < 0.01 ) // take random 1% of data
    .slice(0,20)                          // take the first 20 
    .sort(['continent', 'country'])      // sort by continent and country
sample
!md
## Create some utility function to round a numeric string

* Since all data is stored as strings or number, empty values are represented ny the empty string
* The round function will conver it to a numeric round the value convert back to a string


!tryit
// Since all data is stored as strings
// The round function will convert empty strings to '0', will round the value



function round(v) {
    var r = +v;
    if(isNaN(r)) return '0';
    return Math.round(r);
}

// Test the function
var testS = ({
  "Round a non-numeric": round('abc'),
  "Round an integer": round("124"),
  "Round a negetive integer": round("-125"),
  "Round an real": round("124.3"),
  "Round a negetive real": round("-125.6")
});

//Display testS
testS

!md
##Make sure no numeric column has empty values

To do this we use the frame.update method, this method take an **_update object_** as a parameter

* We need to find columns that are mostly numeric '90%' or empty, _frame.numericColumns_ will get
us the list of those column names

!tryit
var {arrProd} = DataFrame;
var p1 = arrProd(['a','b','c'], 'x'); // [ ['a', 'x'], ['b', 'x'], ['c', 'x'], ]
var p2 = arrProd('x', ['a','b','c']); // [ ['x', 'a'], ['x', 'b'], ['x', c'], ]
var p3 = arrProd(['a','b'], ['X', 'Y'])// [ ['a', 'X'],['a', 'Y'], ['b', 'X'], ['b', 'Y'], ]
JSON.stringify([p1, p2, p3])

!tryit
function forceZero(v) { return round(v || '0')}

var NUMERIC_COLS = frame.numericColumns;
var col_update_list = arrProd(NUMERIC_COLS,forceZero);
var TO_ZERO = Object.fromEntries(col_update_list);

!tryit
// Update the frame so that all empty value in numeric columns is set to zero 
frame = frame.update(TO_ZERO)
frame
!md
###Creat a summary of covid data
!tryit


var round_some_columns =  { 
    total_cases: round, 
    max_new_cases_in_a_day: round,
    avg_new_cases_in_a_day: round
};

frame.groupBy(['continent','country', // columns to group on
               gb.count('date', 'rows'), // count the number of values in the date column after grouping
               gb.max('total_cases'), // get the max value in the total_cases column for the group 
               gb.max('new_cases', 'max_new_cases_in_a_day'), // get the max value in the total_cases 
                                                             // column for the group and give it the name 'max_new_cases_in_a_day 
               gb.mean('new_cases', 'avg_new_cases_in_a_day') // get the average value for new cases
              ])
    .update( {...round_some_columns, avg_new_cases_in_a_day: (v,ro) => round(ro.total_cases/ro.rows)} )
    .sort(['-rows', '-continent','-total_cases']) // rows, continent and total_cases is sorted in descending order: 
!html
<div id="msgbox-area" class="msgbox-area"></div>
<script
  src="https://code.jquery.com/jquery-3.1.1.min.js"
  integrity="sha256-hVVnYaiADRTO2PzUGmuLJr8BLUSjGIZsDYGmIJLv2b8="
  crossorigin="anonymous"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.4.1/semantic.min.js"></script>

!end
