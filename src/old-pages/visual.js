import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles'
import Button from '@material-ui/core/Button';

const styles = theme => ({
    button: {
        backgroundColor: 'blue',
        color: 'white',
    },
    input: {
        display: 'none',
    },
});

class Visual extends Component {
    componentDidMount () {

        const d = document.createElement("script");
        d.src = "https://d3js.org/d3.v4.min.js";
        d.async = false;
        document.body.appendChild(d);

        const c = document.createElement("script");
        c.src = "https://d3js.org/d3-selection-multi.v1.min.js";
        c.async = false;
        document.body.appendChild(c);

        const interval = setInterval((() => {
            if (window.d3) {
                const s = document.createElement('script');
                s.type = 'text/javascript';
                s.async = true;
                s.innerHTML = "var NS = {}; // create namespace\n" +
                    "NS.edgesfilepath = \"/network.csv\"\n" +
                    "NS.nodeListfilepath = \"/nodes.csv\"\n" +
                    "NS.ncfilepath1 = \"/courts.json\"\n" +
                    "NS.ncfilepath2 = \"/varNaturalCourt.csv\"\n" +
                    "NS.ideologicalfilepath = \"/justices.csv\"\n" +
                    "NS.width = 800\n" +
                    "NS.height = 500\n" +
                    "NS.threshold = 25;\n" +
                    "NS.nc = 1301;\n" +
                    "NS.cl = \"CL\";\n" +
                    "\n" +
                    "  /*\n" +
                    "NS.natCourt = {\n" +
                    "    1401: [78, 79, 80, 81, 84, 86, 88, 89, 90],\n" +
                    "    1402: [78, 79, 80, 81, 86, 88, 89, 90]\n" +
                    "  }*/\n" +
                    "\n" +
                    "// Load data and call main\n" +
                    "function initialize() {\n" +
                    "  // load edges (links in d3 world) into NS.linksList\n" +
                    "  d3.csv(NS.edgesfilepath, function(edges) {\n" +
                    "    NS.linksList = edges;\n" +
                    "\n" +
                    "  // load nodes into NS.nodeList\n" +
                    "    d3.csv(NS.nodeListfilepath, function(nodes) {\n" +
                    "      NS.nodeList = nodes\n" +
                    "  // load natural court data, combining makeup with descriptions\n" +
                    "      d3.json(NS.ncfilepath1, function(courts) {\n" +
                    "        d3.csv(NS.ncfilepath2, function(courtDesc) {\n" +
                    "          // create courtDesc hashmap from csv; also parse start and end\n" +
                    "          // years from the year string\n" +
                    "          var hash = courtDesc.reduce(function(map, obj) {\n" +
                    "              var date = obj.Date.split(\" - \");\n" +
                    "              var start = date[0].split(\", \")[1];\n" +
                    "              var end   = date[1].split(\", \")[1];\n" +
                    "              map[obj.naturalCourt] = {\n" +
                    "                name: obj.name,\n" +
                    "                date: obj.Date,\n" +
                    "                yearStart: +start,\n" +
                    "                yearEnd: +end | 2017 // Change this if updating dataset to new year\n" +
                    "              };\n" +
                    "              return map;\n" +
                    "          }, {});\n" +
                    "          // combine the courts with descriptions\n" +
                    "          NS.natCourt = {};\n" +
                    "          for(c in courts) {\n" +
                    "            NS.natCourt[c] = {\n" +
                    "              justices: courts[c],\n" +
                    "              desc: hash[c]\n" +
                    "            }\n" +
                    "          }\n" +
                    "    // load judge ideological data\n" +
                    "          d3.csv(NS.ideologicalfilepath, function(idata) {\n" +
                    "            // transform ideological data into a hashmap with each justice\n" +
                    "            // as the key, and an array of their posterier mean in each term\n" +
                    "            // as the value\n" +
                    "            idata = idata.reduce(function(map, obj) {\n" +
                    "                if(map[obj.justice] == undefined) map[obj.justice] = [];\n" +
                    "                // it seems that a \"year\" in naturalCourt = \"term + 1\" in here\n" +
                    "                map[obj.justice].push( {term: +obj.term + 1, mean: +obj.post_mn} );\n" +
                    "                //map[obj.justice][obj.term] = +obj.post_mn;\n" +
                    "                return map;\n" +
                    "            }, {});\n" +
                    "            NS.ideology = {};\n" +
                    "            // sum the values for each justice for each natural court\n" +
                    "            for(j in idata) {\n" +
                    "              NS.ideology[j] = {};\n" +
                    "              for(c in NS.natCourt) {\n" +
                    "                var desc = NS.natCourt[c].desc;\n" +
                    "                var mean = d3.mean(idata[j], function(d) {\n" +
                    "                  if(d.term >= desc.yearStart && d.term <= desc.yearEnd)\n" +
                    "                    return d.mean;\n" +
                    "                  else\n" +
                    "                    return undefined;\n" +
                    "                })\n" +
                    "                if(mean != undefined) NS.ideology[j][c] = mean;\n" +
                    "              }\n" +
                    "            }\n" +
                    "            // set the global variable\n" +
                    "            main();\n" +
                    "          });\n" +
                    "        });\n" +
                    "      });\n" +
                    "    });\n" +
                    "  });\n" +
                    "}\n" +
                    "\n" +
                    "function makeSVG() {\n" +
                    "  //Create SVG element\n" +
                    "  var svg = d3.select(\".graph\")\n" +
                    "        .append(\"svg\")\n" +
                    "        .attr(\"class\", \"force-directed\")\n" +
                    "        .attr(\"width\", NS.width)\n" +
                    "        .attr(\"height\", NS.height)\n" +
                    "        // add border\n" +
                    "  svg.append('defs');\n" +
                    "  return svg;\n" +
                    "}\n" +
                    "\n" +
                    "function getJusticeLabel(name) {\n" +
                    "  return 1;\n" +
                    "}\n" +
                    "\n" +
                    "\n" +
                    "function main() {\n" +
                    "  // define scales\n" +
                    "  var ideology = function(d) {\n" +
                    "    return(NS.ideology[+d.id][NS.nc])\n" +
                    "  };\n" +
                    "\n" +
                    "  // liberal+ conservative colors =  d3.scaleOrdinal([\"#6495ed\", \"#fa8072\"]);\n" +
                    "  var edgeColor = function(d) {return ((d > 0) ? \"#000\" : \"#c64841\")}\n" +
                    "\n" +
                    "  //var edgeStroke = function(d) {return Math.sqrt(Math.abs(d))}\n" +
                    "  var edgeStroke = d3.scaleLinear()\n" +
                    "\n" +
                    "    .domain([0, 50]) // default values - changed when updating NC\n" +
                    "    .range([1, 8]);\n" +
                    "\n" +
                    "  var nodeColor = function(d) {\n" +
                    "    // get this justice's posterior mean for the current natural court\n" +
                    "    var val = ideology(d);\n" +
                    "    if      (val < -.5) return \"#6495ed\";\n" +
                    "    else if (val > .5) return \"#fa8072\";\n" +
                    "    else               return \"#bbb\";\n" +
                    "  };\n" +
                    "  var opacityScale = function(d) {\n" +
                    "      var influence = Math.abs(d);\n" +
                    "      if(influence > NS.threshold) return .7;\n" +
                    "      else                         return .01;\n" +
                    "  };\n" +
                    "\n" +
                    "  //var xCenter = function(d) {if(d % 2 == 0) return 0; else return NS.width}\n" +
                    "  var xCenter = function(d) {\n" +
                    "    var scale = d3.scaleLinear()\n" +
                    "      .domain([-3, 3])\n" +
                    "      .range([50, NS.width - 50]);\n" +
                    "    return scale(d);\n" +
                    "  }\n" +
                    "\n" +
                    "  // define how markers are created with the proper color and opacity\n" +
                    "  function marker(color, opacity) {\n" +
                    "    var name = \"arrowhead-\" + color.replace(\"#\", \"\") + \"-\" + opacity * 100;\n" +
                    "    if(NS.svg.select(\"defs\").select(\"#\" + name).empty()) {\n" +
                    "      NS.svg.select(\"defs\").append(\"marker\")\n" +
                    "      .attr(\"id\", name)\n" +
                    "      .attr(\"viewBox\", \"0 -5 10 10\")\n" +
                    "      .attr(\"refX\", 10) // This sets how far back it sits, kinda\n" +
                    "      .attr(\"refY\", 0)\n" +
                    "      .attr(\"markerWidth\", function(d) { return 3 })\n" +
                    "      .attr(\"markerHeight\", function(d) { return 3 })\n" +
                    "      .attr(\"xoverflow\",\"visible\")\n" +
                    "      .attr(\"orient\", \"auto\")\n" +
                    "      //.attr(\"markerUnits\", \"userSpaceOnUse\")\n" +
                    "      .append(\"svg:path\")\n" +
                    "      .attr(\"d\", \"M0,-5L10,0L0,5\")\n" +
                    "      .style(\"fill\", color)\n" +
                    "      .style(\"opacity\", opacity)\n" +
                    "    }\n" +
                    "    return \"url(#\" + name + \")\";  \n" +
                    "  }\n" +
                    "  // create link and node selections\n" +
                    "  NS.svg = makeSVG()\n" +
                    "  var node = NS.svg.append(\"g\")\n" +
                    "      .attr(\"class\", \"nodes\")\n" +
                    "    .selectAll(\".node\");\n" +
                    "  var link = NS.svg.append(\"g\")\n" +
                    "      .attr(\"class\", \"links\")\n" +
                    "    .selectAll(\".link\");\n" +
                    "\n" +
                    "  // create selections for labels\n" +
                    "  var edgeLabelGroup = NS.svg.append(\"g\").attr(\"class\", \"edgeLabelGroup\")\n" +
                    "  var edgepaths = edgeLabelGroup.selectAll(\".edgepath\")\n" +
                    "  var edgelabels = edgeLabelGroup.selectAll(\".edgelabel\")\n" +
                    "/*\n" +
                    "    .data(NS.links)\n" +
                    "    .enter()\n" +
                    "    */\n" +
                    "\n" +
                    "  // create the simulation\n" +
                    "  var simulation = d3.forceSimulation()\n" +
                    "    .force(\"link\", d3.forceLink()\n" +
                    "        .id(function(d) { return d.id; })\n" +
                    "        //.distance(300)\n" +
                    "        // set distances based on influence\n" +
                    "        .distance(function(d) {\n" +
                    "          return (300 - Math.abs(d.value))\n" +
                    "        })\n" +
                    "    )\n" +
                    "    // a charge force usually keeps nodes away from each other, but because\n" +
                    "    // there is a link between every node (even if it doesnt meet the\n" +
                    "    // threshold), it's not neccesary here.\n" +
                    "    //.force(\"charge\", d3.forceManyBody())\n" +
                    "    .force(\"center\", d3.forceCenter(NS.width / 2, NS.height / 2))\n" +
                    "    .force(\"x\", d3.forceX().x(function(d) {\n" +
                    "      return xCenter(ideology(d))\n" +
                    "    }))\n" +
                    "    .alphaTarget(1)\n" +
                    "    .on(\"tick\", ticked);\n" +
                    "  \n" +
                    "  // It is necessary to \"construct\" nodes an links from the initial data files\n" +
                    "  // and then push them on to arrays rather than just pushing the actual nodes\n" +
                    "  // or links. If we don't do this, d3 seems to edits the original data\n" +
                    "  // structure (i.e. makes source and target an object with many properties)\n" +
                    "  // which causes problems down the road. An added benefit of this construction\n" +
                    "  // is that we can add properties like \"partisanship\" which aren't in the\n" +
                    "  // original dataset.\n" +
                    "  function makeLink(x) {\n" +
                    "    return {source: x.source, target: x.target, type: x.type, value: x.value}\n" +
                    "  }\n" +
                    "  // However, it seems that this behavior is actually wanted for the nodes.\n" +
                    "  // Changing the actual data structure allows those nodes to stay in\n" +
                    "  // their place when updated\n" +
                    "  /*\n" +
                    "  function makeNode(x) {\n" +
                    "    return {id: x.id, label: x.label, party: \"liberal\"}\n" +
                    "  }*/\n" +
                    "  \n" +
                    "  // Set nodes and edges for the new cort\n" +
                    "  // Takes the natural court number and civil liberties\n" +
                    "  function updateNodesAndLinks (nc, cl) {\n" +
                    "    updateTitle(nc, cl)\n" +
                    "    // create new lists of links and nodes\n" +
                    "    var nodes = [], links = [];\n" +
                    "    // add nodes\n" +
                    "    for(var i = 0; i < NS.nodeList.length; i++) {\n" +
                    "      var n = NS.nodeList[i];\n" +
                    "      // reset position to center if not yet set\n" +
                    "      if(NS.natCourt[nc].justices.includes(+n.id)) {\n" +
                    "        if(n.x == undefined) {\n" +
                    "          // instead of blindly setting it like this, find a way to set it \n" +
                    "          // at the location of the node that just exited! may have to find\n" +
                    "          // a way to do this within the update function itself.\n" +
                    "          // Perhaps: keep track of the nodes that exit and pick one of those\n" +
                    "          // positions to use.\n" +
                    "          n.x = xCenter(ideology(n))\n" +
                    "          n.y = NS.height/2;\n" +
                    "        }\n" +
                    "        nodes.push(n);\n" +
                    "      }\n" +
                    "    }\n" +
                    "    // add links\n" +
                    "    for(var i = 0; i < NS.linksList.length; i++) {\n" +
                    "      var l = NS.linksList[i];\n" +
                    "      if(l.type == cl && l.naturalCourt == nc) { links.push(makeLink(l)) }\n" +
                    "    }\n" +
                    "    // set the threshold to the top 1/3 of influences (absolute values)\n" +
                    "    links.sort();\n" +
                    "    var absValues = [];\n" +
                    "    for (l in links) {\n" +
                    "      absValues.push(Math.abs(links[l].value));\n" +
                    "    }\n" +
                    "    // set the scale for edge widths\n" +
                    "    absValues.sort((a, b) => a - b);\n" +
                    "    NS.threshold = absValues[Math.floor(absValues.length/9) * 8];\n" +
                    "    // FUTURE: we could implement a way to change the threshold via a slider\n" +
                    "    // after the default is set to the top 1/3, so more influences can be ween\n" +
                    "    // at will\n" +
                    "    edgeStroke.domain([0, Math.ceil(absValues[absValues.length-1])]);\n" +
                    "    NS.thing = absValues;\n" +
                    "    console.log(\"Updating for \" + nc + \" (\" + cl + \") with threshold \" + NS.threshold)\n" +
                    "    // collect some brief data about nodes and edges\n" +
                    "    updateSim(nodes, links);\n" +
                    "  }\n" +
                    "\n" +
                    "  updateNodesAndLinks(NS.nc, NS.cl);\n" +
                    "\n" +
                    "  \n" +
                    "\n" +
                    "  // in a seperate function, determine which nodes and which edges should be present\n" +
                    "  // add or remove, accordingly\n" +
                    "  // then call updateSim with the new news and edges variables\n" +
                    "\n" +
                    "  function updateSim(nodes, links) {\n" +
                    "    // Apply the general update pattern to the nodes\n" +
                    "    // bind the data\n" +
                    "    node = node.data(nodes, function(d) { return d.id;})\n" +
                    "    // exit, remove the g g\n" +
                    "    node.exit().remove();\n" +
                    "    // enter, append g \n" +
                    "    nodeEnter = node.enter()\n" +
                    "      .append(\"g\")\n" +
                    "        .attr(\"class\", \"node\")\n" +
                    "    // enter, append circle and text\n" +
                    "    nodeEnter.append(\"circle\")\n" +
                    "        .attr(\"r\", 15)\n" +
                    "        .attr(\"fill\", function(d) { return nodeColor(d); })\n" +
                    "    nodeEnter.append(\"text\")\n" +
                    "      .text(function(d) {\n" +
                    "        return d.label;\n" +
                    "      })\n" +
                    "      .attr('opacity', 1)\n" +
                    "      .attr('x', 6)\n" +
                    "      .attr('y', 3)\n" +
                    "      .style(\"pointer-events\", \"none\");\n" +
                    "    nodeEnter.append(\"title\")\n" +
                    "      .text(function(d) { return d.id; })\n" +
                    "    node = nodeEnter.merge(node);\n" +
                    "    node.call(d3.drag()\n" +
                    "          .on(\"start\", dragstarted)\n" +
                    "          .on(\"drag\", dragged)\n" +
                    "          .on(\"end\", dragended));\n" +
                    "\n" +
                    "    // Apply the general update pattern to the links\n" +
                    "    // (1)\n" +
                    "    link = link.data(links, function(d) { /*console.log(d.source.id)*/; return d.source.id + \"-\" + d.target.id; });\n" +
                    "    // (2)\n" +
                    "    link.exit().remove();\n" +
                    "    // (3)\n" +
                    "    link = link.enter()\n" +
                    "      .append(\"line\")\n" +
                    "      .attr(\"stroke-width\", function(d) { return edgeStroke(Math.abs(d.value)); })\n" +
                    "      .attr(\"stroke-opacity\",  function(d) {return opacityScale(d.value)})\n" +
                    "      .attr(\"data-comparison\", function(d) {return d.value})\n" +
                    "      .each(function(d) {\n" +
                    "        var color = edgeColor(d.value);\n" +
                    "        var opacity = opacityScale(d.value);\n" +
                    "        d3.select(this).style(\"stroke\", color)\n" +
                    "                       .attr(\"marker-end\", marker(color, opacity));\n" +
                    "      })\n" +
                    "      .merge(link);\n" +
                    "    // Apply the general update pattern to link label paths and labels\n" +
                    "    // (1)\n" +
                    "    edgepaths = edgepaths.data(links, function(d) {return d.source.id + \"-\" + d.target.id; });\n" +
                    "    edgelabels = edgelabels.data(links, function(d) {return d.source.id + \"-\" + d.target.id; });\n" +
                    "    // (2)\n" +
                    "    edgepaths.exit().remove();\n" +
                    "    edgelabels.exit().remove();\n" +
                    "    // (3)\n" +
                    "    edgepaths = edgepaths.enter()\n" +
                    "      .append('path')\n" +
                    "      .attrs({\n" +
                    "          'class': 'edgepath',\n" +
                    "          'fill-opacity': 0,\n" +
                    "          'stroke-opacity': 0,\n" +
                    "          'id': function (d, i) {return 'edgepath' + i},\n" +
                    "          'visibility': function(d) { return (opacityScale(d.value) > .1 ? \"visible\" : \"hidden\")},\n" +
                    "      })\n" +
                    "      .style(\"pointer-events\", \"none\")\n" +
                    "      .merge(edgepaths)\n" +
                    "    edgelabels = edgelabels.enter()\n" +
                    "      .append('text')\n" +
                    "      .style(\"pointer-events\", \"none\")\n" +
                    "      .attrs({\n" +
                    "\n" +
                    "          'class': 'edgelabel',\n" +
                    "          'id': function (d, i) {return 'edgelabel' + i},\n" +
                    "          'font-size': 10,\n" +
                    "          'fill': '#666',\n" +
                    "          'opacity': function(d) { return opacityScale(d.value)},\n" +
                    "          'visibility': function(d) { return (opacityScale(d.value) > .1 ? \"visible\" : \"hidden\")},\n" +
                    "          'dy': function(d) { return -1 * edgeStroke(Math.abs(d.value)) }\n" +
                    "      })\n" +
                    "      .merge(edgelabels)\n" +
                    "  edgelabels.append('textPath')\n" +
                    "    .attr('xlink:href', function (d, i) {return '#edgepath' + i})\n" +
                    "    .style(\"text-anchor\", \"middle\")\n" +
                    "    .style(\"pointer-events\", \"none\")\n" +
                    "    .attr(\"startOffset\", \"50%\")\n" +
                    "    .attr(\"visibility\", function(d) { return (opacityScale(d.value) > .1 ? \"visible\" : \"hidden\")})\n" +
                    "    .text(function (d) {return d3.format(\".5g\")(d.value)})\n" +
                    "    .merge(edgelabels)\n" +
                    "    \n" +
                    "    // Update and restart the simulation\n" +
                    "    simulation.nodes(nodes);\n" +
                    "    simulation.force(\"link\").links(links);\n" +
                    "    simulation.alpha(1).restart();\n" +
                    "    NS.sim = simulation;\n" +
                    "  }\n" +
                    "\n" +
                    "  function ticked() {\n" +
                    "    // update link positions\n" +
                    "    link\n" +
                    "        .attr(\"x1\", function(d) { return d.source.x; })\n" +
                    "        .attr(\"y1\", function(d) { return d.source.y; })\n" +
                    "        .attr(\"x2\", function(d) { return d.target.x; })\n" +
                    "        .attr(\"y2\", function(d) { return d.target.y; });\n" +
                    "    // update node positions\n" +
                    "    node\n" +
                    "        .attr(\"transform\", function(d) {\n" +
                    "          if(d.x < 100 && d.y < 100) console.log(d.id);\n" +
                    "          return \"translate(\" + d.x + \",\" + d.y + \")\";\n" +
                    "        })\n" +
                    "    // re-draw edge paths\n" +
                    "    edgepaths.attr('d', function (d) {\n" +
                    "          return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;\n" +
                    "        });\n" +
                    "    // rotate labels to ensure legibility\n" +
                    "    edgelabels.attr('transform', function (d) {\n" +
                    "        if (d.target.x < d.source.x) {\n" +
                    "            var bbox = this.getBBox();\n" +
                    "\n" +
                    "            rx = bbox.x + bbox.width / 2;\n" +
                    "            ry = bbox.y + bbox.height / 2;\n" +
                    "            //return 'rotate(180 ' + rx + ' ' + ry + ')';\n" +
                    "            var rotate = 'rotate(180 ' + rx + ' ' + ry + ')'\n" +
                    "            var translate = 'translate(0 0)';\n" +
                    "        }\n" +
                    "        else {\n" +
                    "            var rotate = 'rotate(0)';\n" +
                    "            var translate = 'translate(0 0)';\n" +
                    "        }\n" +
                    "        return rotate + translate;\n" +
                    "    });\n" +
                    "  }\n" +
                    "  function updateTitle(nc, cl) {\n" +
                    "    var title = d3.select(\".title\")\n" +
                    "    var description = NS.natCourt[nc].desc\n" +
                    "    if(cl == \"CL\") cl = \"Civil Liberties\"; else cl = \"Non-Civil Liberties\";\n" +
                    "    title.select(\"#court-number\").text(nc)\n" +
                    "    title.select(\"#court-name\").text(description.name)\n" +
                    "    title.select(\"#court-date\").text(description.date)\n" +
                    "    title.select(\"#civil-liberties\").text(cl)\n" +
                    "  }\n" +
                    "  \n" +
                    "  function controls() {\n" +
                    "    // Create slider\n" +
                    "    var data = d3.keys(NS.natCourt);\n" +
                    "    var margin = {right: 150, left: 20, top: 10}\n" +
                    "    var svg = d3.select(\".slider\").append(\"svg\")\n" +
                    "      .attr(\"width\", NS.width - margin.right)\n" +
                    "      .attr(\"height\", 100);\n" +
                    "\n" +
                    "    // create a range of x values from the courts\n" +
                    "    var courtKeys = d3.keys(NS.natCourt)\n" +
                    "    var range = [];\n" +
                    "    for (key in d3.keys(NS.natCourt)) {\n" +
                    "      range[key] = key * ((NS.width - margin.right - margin.left)/courtKeys.length)\n" +
                    "    }\n" +
                    "    var x = d3.scaleOrdinal()\n" +
                    "        .domain(courtKeys)\n" +
                    "        .range(range)\n" +
                    "\n" +
                    "    var slider = svg.append(\"g\")\n" +
                    "        .attr(\"class\", \"slider\")\n" +
                    "        .attr(\"transform\", \"translate(\" + margin.left + \", \" + margin.top + \")\");\n" +
                    "    slider.append(\"line\")\n" +
                    "        .attr(\"class\", \"track\")\n" +
                    "        .attr(\"x1\", x.range()[0])\n" +
                    "        .attr(\"x2\", x.range()[x.range().length - 1])\n" +
                    "      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })\n" +
                    "        .attr(\"class\", \"track-inset\")\n" +
                    "      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })\n" +
                    "        .attr(\"class\", \"track-overlay\")\n" +
                    "        .call(d3.drag()\n" +
                    "            .on(\"start.interrupt\", function() { slider.interrupt(); })\n" +
                    "            .on(\"start drag\", function() {\n" +
                    "              sliderChanged(d3.event.x);\n" +
                    "            }));\n" +
                    "\n" +
                    "    slider.insert(\"g\", \".track-overlay\")\n" +
                    "        .attr(\"class\", \"ticks\")\n" +
                    "        .attr(\"transform\", \"translate(0,\" + 18 + \")\")\n" +
                    "      .selectAll(\"text\")\n" +
                    "      .data(courtKeys)\n" +
                    "      .enter().append(\"g\")\n" +
                    "        .attr(\"class\", \"tick-text\")\n" +
                    "        .attr(\"transform\", function(d) { return \"translate(\" + (x(d) - 5) +\", -5)\" })\n" +
                    "      .append(\"text\")\n" +
                    "        .attr(\"text-anchor\", \"start\")\n" +
                    "        .attr(\"transform\", \"rotate(90)\")\n" +
                    "        .attr(\"fill\", \"#333\")\n" +
                    "        // set the text to the longer name (i.e. Vinson 3 instead of 1301)\n" +
                    "        .text(function(d) { return NS.natCourt[d].desc.name; });\n" +
                    "\n" +
                    "    var handle = slider.insert(\"circle\", \".track-overlay\")\n" +
                    "        .attr(\"class\", \"handle\")\n" +
                    "        .attr(\"r\", 9);\n" +
                    "\n" +
                    "    function sliderChanged(pos) {\n" +
                    "      // round position to nearest value in discrete range\n" +
                    "      var i = d3.bisect(range, pos);\n" +
                    "      var rounded = range[i];\n" +
                    "      var nc = x.domain()[i]\n" +
                    "\n" +
                    "      // if different, change:\n" +
                    "      if(NS.nc != nc) {\n" +
                    "        // update global variables\n" +
                    "        NS.nc = nc;\n" +
                    "        // update handle postion\n" +
                    "        handle.attr(\"cx\", rounded);\n" +
                    "        // get corresponding court & update\n" +
                    "        updateNodesAndLinks(NS.nc, NS.cl);\n" +
                    "      }\n" +
                    "    }\n" +
                    "\n" +
                    "    // Create button\n" +
                    "    var button = d3.select(\".button\").append(\"input\")\n" +
                    "      .attr(\"type\", \"button\")\n" +
                    "      .attr(\"name\", \"toggle\")\n" +
                    "      .attr(\"value\", \"Toggle Civil Liberties\")\n" +
                    "      .attr(\"onclick\", \"NS.buttonPressed()\")\n" +
                    "\n" +
                    "    NS.buttonPressed = function () {\n" +
                    "      NS.cl = (NS.cl==\"CL\") ? \"nonCL\" : \"CL\";\n" +
                    "      updateNodesAndLinks(NS.nc, NS.cl);\n" +
                    "    }\n" +
                    "    // hacky way to get the button press function in the global scope, pt. 1\n" +
                    "    //return buttonPressed;\n" +
                    "\n" +
                    "  }\n" +
                    "\n" +
                    "  // hacky way to get the button press function in the global scope, pt. 2\n" +
                    "  //NS.buttonPressed = controls();\n" +
                    "  controls();\n" +
                    "\n" +
                    "  function dragstarted(d) {\n" +
                    "    if (!d3.event.active) simulation.alphaTarget(0.3).restart();\n" +
                    "    d.fx = d.x;\n" +
                    "    d.fy = d.y;\n" +
                    "  }\n" +
                    "\n" +
                    "  function dragged(d) {\n" +
                    "    d.fx = d3.event.x;\n" +
                    "    d.fy = d3.event.y;\n" +
                    "  }\n" +
                    "\n" +
                    "  function dragended(d) {\n" +
                    "    if (!d3.event.active) simulation.alphaTarget(0);\n" +
                    "    d.fx = null;\n" +
                    "    d.fy = null;\n" +
                    "  }\n" +
                    "}\n" +
                    "\n" +
                    "// hacky way to get the button press function in the global scope, pt. 1\n" +
                    "//function buttonPressed() {\n" +
                    "//  NS.buttonPressed.call()\n" +
                    "//}\n" +
                    "\n" +
                    "initialize()\n";
                document.body.appendChild(s);
                clearInterval(interval);
            }
        } ),100);



    }

    render() {
        const { classes } = this.props
        return(
            <div>
                <Button className={classes.button}>Login</Button>
                <Button color="primary" className={classes.button}>
                    Forgot Username
                </Button>
                <Button color="secondary" className={classes.button}>
                    Forgot Password
                </Button>
                <input
                    accept="image/*"
                    className={classes.input}
                    id="flat-button-file"
                    multiple
                    type="file"
                />
                <label htmlFor="flat-button-file">
                    <Button component="span" className={classes.button}>
                        Upload
                    </Button>
                </label>

                <div className="title">
                    <p>Natural Court</p>
                    <p id="court-number"></p><p>:</p>
                    <br></br>
                    <p id="court-name"></p>
                    <p>(</p><p id="court-date"></p><p>)</p>
                    <br></br>
                    <p id="civil-liberties"></p>
                    <p> cases </p>
                </div>
                <div className="graph">
                </div>
                <div className="controls">
                    <div className="slider"></div>
                    <div className="button"></div>
                </div>

            </div>
        )
    }

};




export default (withStyles)(styles)(Visual);

