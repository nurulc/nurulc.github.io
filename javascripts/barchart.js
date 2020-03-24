function frameBarChart(data, id, {
  height, width, title, axisX, axisY, source,
  background, bar
}) {
  const sData = data;
  id = id || genID();

  height = height || 600;
  width = width || 1000;
  axisX = axisX || 'Keys';
  axisY = axisY || 'Values';
  source = source || '';
  bar = bar || '#80cbc4';     
  background = background || '#2F4A6D';
  const values = data.map(d => d.value);
  const maxV = au.arrMax(values);
  const minV = au.arrMin(values);
  connst html=(`
    <style>
    div#${id}barlayout {
      text-align: center;
    }

    div#${id} {
      width: ${width}px;
      height: ${height}px;
      margin: auto;
      background-color: ${background};
    }

    svg {
      width: 100%;
      height: 100%;
    }

    .${id}bar {
      fill: ${bar};
    }

    text {
      font-size: 12px;
      fill: #fff;
    }

    path {
      stroke: gray;
    }

    line {
      stroke: gray;
    }

    line#${id}limit {
      stroke: #FED966;
      stroke-width: 3;
      stroke-dasharray: 3 6;
    }

    .grid path {
      stroke-width: 0;
    }

    .grid .tick line {
      stroke: #9FAAAE;
      stroke-opacity: 0.3;
    }

    text.${id}divergence {
      font-size: 14px;
      fill: #2F4A6D;
    }

    text.${id}value {
      font-size: 14px;
    }

    text.title {
      font-size: 22px;
      font-weight: 600;
    }

    text.label {
      font-size: 14px;
      font-weight: 400;
    }

    text.source {
      font-size: 10px;
    }
    </style>
    <div id='${id}barlayout'>
        <!-- <h2>Bar chart example</h2> -->
        <div id="${id}">
          <svg id="${id}svg" width="${width}" height="${height}"/>
        </div>
    </div>
    `);
    makeID(id,html);
    doit(width,height);

    //===================================================
    function doit(_width,_height, margin=80){
        const svg = d3.select(`#${id}svg`);
        const svgContainer = d3.select(`#${id}`);
        const sample = sData;
        

        
        width = _width - 2 * margin;
        height = _height - 2 * margin;

        function pos(y, ybase, delta) {
          if(Math.abs(ybase - y) < 1.5*delta) return ybase+delta;
          return y+delta;
        }
        const chart = svg.append('g')
          .attr('transform', `translate(${margin}, ${margin})`);

        const xScale = d3.scaleBand()
          .range([0, width])
          .domain(sample.map((s) => s.key))
          .padding(0.4)

        const yScale = d3.scaleLinear()
          .range([height, 0])
          .domain([0, maxV * 1.15]);


        const makeYLines = () => d3.axisLeft()
          .scale(yScale)

        chart.append('g')
          .attr('transform', `translate(0, ${height})`)
          .call(d3.axisBottom(xScale));

        chart.append('g')
          .call(d3.axisLeft(yScale));

            console.log(sample,svgContainer);

        chart.append('g')
          .attr('class', 'grid')
          .call(makeYLines()
            .tickSize(-width, 0, 0)
            .tickFormat('')
          )

        const barGroups = chart.selectAll()
          .data(sample)
          .enter()
          .append('g')

        barGroups
          .append('rect')
          .attr('class', `${id}bar`)
          .attr('x', (g) => xScale(g.key))
          .attr('y', (g) => yScale(g.value))
          .attr('height', (g) => (height - yScale(g.value)))
          .attr('width', xScale.bandwidth())
          .on('mouseenter', function (actual, i) {
            d3.selectAll(`.${id}value`)
              .attr('opacity', 0)

            d3.select(this)
              .transition()
              .duration(300)
              .attr('opacity', 0.6)
              .attr('x', (a) => xScale(a.key) - 5)
              .attr('width', xScale.bandwidth() + 10)

            const y = yScale(actual.value)

            line = chart.append('line')
              .attr('id', `${id}limit`)
              .attr('x1', 0)
              .attr('y1', y)
              .attr('x2', width)
              .attr('y2', y)

            barGroups.append('text')
              .attr('class', `${id}divergence`)
              .attr('x', (a) => xScale(a.key) + xScale.bandwidth() / 2)
              .attr('y', (a) => yScale(a.value) + 30)
              .attr('fill', 'white')
              .attr('text-anchor', 'middle')
              .text((a, idx) => {
                const divergence = (a.value - actual.value).toFixed(1)

                let text = ''
                if (divergence > 0) text += '+'
                text += divergence;
                return idx !== i ? text : '';
              })

          })
          .on('mouseleave', function () {
            d3.selectAll(`.${id}value`)
              .attr('opacity', 1)

            d3.select(this)
              .transition()
              .duration(300)
              .attr('opacity', 1)
              .attr('x', (a) => xScale(a.key))
              .attr('width', xScale.bandwidth())

            chart.selectAll(`#${id}limit`).remove()
            chart.selectAll(`.${id}divergence`).remove()
          })

        barGroups 
          .append('text')
          .attr('class', `${id}value`)
          .attr('x', (a) => xScale(a.key) + xScale.bandwidth() / 2)
          .attr('y', (a) => yScale(a.value) + 30)
          .attr('text-anchor', 'middle')
          .text((a) => a.value)

        svg
          .append('text')
          .attr('class', 'label')
          .attr('x', -(height / 2) - margin)
          .attr('y', margin / 2.4)
          .attr('transform', 'rotate(-90)')
          .attr('text-anchor', 'middle')
          .text(axisY)

        svg.append('text')
          .attr('class', 'label')
          .attr('x', width / 2 + margin)
          .attr('y', height + margin * 1.7)
          .attr('text-anchor', 'middle')
          .text(axisX)

        svg.append('text')
          .attr('class', 'title')
          .attr('x', width / 2 + margin)
          .attr('y', 40)
          .attr('text-anchor', 'middle')
          .text(title)

        svg.append('text')
          .attr('class', 'source')
          .attr('x', width - margin / 2)
          .attr('y', height + margin * 1.7)
          .attr('text-anchor', 'start')
          .text(source);
    }

}

function makeID(id, html='') {
  let aDiv = document.getElementById(id);
  if(!aDiv) {
      aDiv = document.createElement("div");
      aDiv.id = id;  
      document.body.appendChild(aDiv);
      aDiv = document.getElementById(id);
  }
  aDiv.innerHTML = html;
}

function frameNumericColumns(aFrame) {
  const threshold = Math.trunc(aFrame.length * 0.9);
  const a = aFrame.data.map(row => row.map(v => ((isNum(v) || !v) ? 1 : 0)));
  const sums = a.reduce(vecAdd, undefined);
  console.log({ threshold, sums });

  return aFrame.columns.map((c, i) => ((sums[i] > threshold) ? c : undefined)).filter(Identity);
}


function isNum(v) {
  const nv = +v;
  if (isNaN(nv)) {
    return false;
  }
  return true;
}

function asNum(v) {
  const nv = +v;
  if (isNaN(nv)) {
    return v;
  }
  return nv;
}

function asObj(cols) {
  return arr => arr.reduce((obj, v, i) => (obj[cols[i]] = asNum(v), obj), {});
}

/*

// setup the data
// rows are the items
// columns attribute list to be displayed


//
var datas = `State,Under 5 Years,5 to 13 Years,14 to 17 Years,18 to 24 Years,25 to 44 Years,45 to 64 Years,65 Years and Over
CA,2704659,4499890,2159981,3853788,10604510,8819342,4114496
TX,2027307,3277946,1420518,2454721,7017731,5656528,2472223
NY,1208495,2141490,1058031,1999120,5355235,5120254,2607672
FL,1140516,1938695,925060,1607297,4782119,4746856,3187797
IL,894368,1558919,725973,1311479,3596343,3239173,1575308
PA,737462,1345341,679201,1203944,3157759,3414001,1910571`;
var fdata = datas.split('\n').map(s => s.split(',').map(asNum))
var colData = fdata[0];
fdata = fdata.slice(1);
var state = new Frame(fdata, colData);
frameNumericColumns(state);


*/

function frameChart(aFrame, id,  props) {
  let {
    key, values, height, width, title, axisX, axisY, source,
  } = (props || {});
  key = key || aFrame.columns[0];
  values = (values || aFrame.columns.slice()).filter(v => v !== key);
  const id = genID();

  height = height || 500;
  width = width || 960;
  axisX = axisX || 'Keys';
  axisY = axisY || 'Values';
  source = source || '';
  title = title || 'No Title';
  // const columns = JSON.stringify(values);
  // const dataS = JSON.stringify(aFrame.data.map(asObj(aFrame.columns)));
  // const keyS = JSON.stringify(key);
  const data = aFrame.data.map(asObj(aFrame.columns));
  const columns = values;
  const J = obj => obj;
  const html = (`
    <style>

    .axis .domain {
      stroke: red;
    }

    .axisx {
        font-size: 1em;
        fill: gray;
    }

    .legend {
        fill: black;
    }

    .large {
        font-size: 1em;
        color: red;
        fill: black;
    }

    .titlec {
        font-size: 2em;
        fill: maroon;
    }

    </style>
    <div class="large" style="background-color: #606060">
      <svg id="${id}svg" width="${width}" height="${height}">
          <defs>
            <filter x="0" y="0" width="1" height="1" id="solid">
              <feFlood flood-color="grey"/>
              <feComposite in="SourceGraphic"/>
            </filter>
          </defs>
      </svg>
    </div>

`);

makeID(id,html);
doit(data, key, columns, id+'svg');
function doit(data, key, columns,id) {

      var svg = d3.select("#"+id),
          margin = {top: 30, right: 30, bottom: 50, left: 50},
          width = +svg.attr("width") - margin.left - margin.right,
          height = +svg.attr("height") - margin.top - margin.bottom,
          g = svg.append("g").attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      var x0 = d3.scaleBand()
          .rangeRound([0, width])
          .paddingInner(0.1);

      var x1 = d3.scaleBand()
          .padding(0.05);

      var y = d3.scaleLinear()
          .rangeRound([height, 0]);

      var z = d3.scaleOrdinal()
          .range(["#98abc5", "#8a89a6", "#7b6888", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"]);



        var keys = columns.slice();

        x0.domain(data.map(d => d[key]));
        x1.domain(keys).rangeRound([0, x0.bandwidth()]);
        y.domain([0, d3.max(data, function(d) { return d3.max(keys, function(key) { return d[key]; }); })]).nice();

        g.append("g")
          .selectAll("g")
          .data(data)
          .enter().append("g")
            .attr("transform", function(d) { return "translate(" + x0(d[key]) + ",0)"; })
          .selectAll("rect")
          .data(d => keys.map(key => ({key: key, value: d[key]}) ))
          .enter().append("rect")
            .attr("x", function(d) { return x1(d.key); })
            .attr("y", function(d) { return y(d.value); })
            .attr("width", x1.bandwidth())
            .attr("height", function(d) { return height - y(d.value); })
            .attr("fill", function(d) { return z(d.key); });

        g.append("g")
            .attr("class", "axis")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x0));

        g.append("g")
            .attr("class", "axis")
            .call(d3.axisLeft(y).ticks(null, "s"))
          .append("text")
            .attr("class", "legend")
            //.attr("filter", "url(#solid)")
            .attr("x", 2)
            .attr("y", y(y.ticks().pop()) + 0.5)
            .attr("dy", "0.32em")
            .attr("fill", "#000")
            .attr("font-weight", "bold")
            .attr("text-anchor", "start")
            .text(${J(axisY)});

        var legend = g.append("g")
            .attr("font-family", "sans-serif")
            .attr("font-size", 10)
            .attr("text-anchor", "end")
            //.attr("class", "legend")
          .selectAll("g")
          .data(keys.slice().reverse())
          .enter().append("g")
            .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

        legend.append("rect")
            .attr("x", width - 19)
            .attr("width", 19)
            .attr("height", 19)
            .attr("fill", z);

        legend.append("text")
            .attr("stroke", "black")
            .attr("x", width - 24)
            .attr("y", 9.5)
            .attr("dy", "0.32em")
            .text(function(d) { return d; });
        
      svg.append('text')
        .attr('class', 'axisx')
        .attr('x', width / 2 + margin.left)
        .attr('y', height + margin.top + margin.bottom * 0.7)
        .attr('text-anchor', 'middle')
        .text(${J(axisX)});

      svg
        .append('text')
        .attr('class', 'axisx')
        .attr('x', -(height / 2) - margin.top)
        .attr('y', -4+margin.left / 2.4)
        .attr('transform', 'rotate(-90)')
        .attr('text-anchor', 'middle')
        .text(${J(axisY)})

      svg.append('text')
        .attr('class', 'titlec')
        .attr('x', width / 2 + margin.left)
        .attr('y', 40)
        .attr('text-anchor', 'middle')
        .text(${J(title)})

      svg.append('text')
        .attr('class', 'source')
        .attr('x', width - margin.right / 2)
        .attr('y', height + margin.top * 1.7)
        .attr('text-anchor', 'start')
        .text(${J(source)});
  }
}