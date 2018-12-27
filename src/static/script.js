var NS = {}; // create namespace
NS.edgesfilepath = "http://web.bowdoin.edu/~acphilli/CSCI3210/csci3210_final/data/network.csv"
NS.nodeListfilepath = "http://web.bowdoin.edu/~acphilli/CSCI3210/csci3210_final/data/nodes.csv"
NS.ncfilepath1 = "http://web.bowdoin.edu/~acphilli/CSCI3210/csci3210_final/data/courts.json"
NS.ncfilepath2 = "http://web.bowdoin.edu/~acphilli/CSCI3210/csci3210_final/data/varNaturalCourt.csv"
NS.ideologicalfilepath = "http://web.bowdoin.edu/~acphilli/CSCI3210/csci3210_final/data/justices.csv"
NS.width = 800
NS.height = 500
NS.threshold = 25;
NS.nc = 1301;
NS.cl = "CL";

  /*
NS.natCourt = {
    1401: [78, 79, 80, 81, 84, 86, 88, 89, 90],
    1402: [78, 79, 80, 81, 86, 88, 89, 90]
  }*/

// Load data and call main
function initialize() {
  // load edges (links in d3 world) into NS.linksList
  d3.csv(NS.edgesfilepath, function(edges) {
    NS.linksList = edges;

  // load nodes into NS.nodeList
    d3.csv(NS.nodeListfilepath, function(nodes) {
      NS.nodeList = nodes
  // load natural court data, combining makeup with descriptions
      d3.json(NS.ncfilepath1, function(courts) {
        d3.csv(NS.ncfilepath2, function(courtDesc) {
          // create courtDesc hashmap from csv; also parse start and end
          // years from the year string
          var hash = courtDesc.reduce(function(map, obj) {
              var date = obj.Date.split(" - ");
              var start = date[0].split(", ")[1];
              var end   = date[1].split(", ")[1];
              map[obj.naturalCourt] = {
                name: obj.name,
                date: obj.Date,
                yearStart: +start,
                yearEnd: +end | 2017 // Change this if updating dataset to new year
              };
              return map;
          }, {});
          // combine the courts with descriptions
          NS.natCourt = {};
          for(c in courts) {
            NS.natCourt[c] = {
              justices: courts[c],
              desc: hash[c]
            }
          }
    // load judge ideological data
          d3.csv(NS.ideologicalfilepath, function(idata) {
            // transform ideological data into a hashmap with each justice
            // as the key, and an array of their posterier mean in each term
            // as the value
            idata = idata.reduce(function(map, obj) {
                if(map[obj.justice] == undefined) map[obj.justice] = [];
                // it seems that a "year" in naturalCourt = "term + 1" in here
                map[obj.justice].push( {term: +obj.term + 1, mean: +obj.post_mn} );
                //map[obj.justice][obj.term] = +obj.post_mn;
                return map;
            }, {});
            NS.ideology = {};
            // sum the values for each justice for each natural court
            for(j in idata) {
              NS.ideology[j] = {};
              for(c in NS.natCourt) {
                var desc = NS.natCourt[c].desc;
                var mean = d3.mean(idata[j], function(d) {
                  if(d.term >= desc.yearStart && d.term <= desc.yearEnd)
                    return d.mean;
                  else
                    return undefined;
                })
                if(mean != undefined) NS.ideology[j][c] = mean;
              }
            }
            // set the global variable
            main();
          });
        });
      });
    });
  });
}

function makeSVG() {
  //Create SVG element
  var svg = d3.select(".graph")
        .append("svg")
        .attr("class", "force-directed")
        .attr("width", NS.width)
        .attr("height", NS.height)
        // add border
  svg.append('defs');
  return svg;
}

function getJusticeLabel(name) {
  return 1;
}


function main() {
  // define scales
  var ideology = function(d) {
    return(NS.ideology[+d.id][NS.nc])
  };

  // liberal+ conservative colors =  d3.scaleOrdinal(["#6495ed", "#fa8072"]);
  var edgeColor = function(d) {return ((d > 0) ? "#000" : "#c64841")}

  //var edgeStroke = function(d) {return Math.sqrt(Math.abs(d))}
  var edgeStroke = d3.scaleLinear()

    .domain([0, 50]) // default values - changed when updating NC
    .range([1, 8]);

  var nodeColor = function(d) {
    // get this justice's posterior mean for the current natural court
    var val = ideology(d);
    if      (val < -.5) return "#6495ed";
    else if (val > .5) return "#fa8072";
    else               return "#bbb";
  };
  var opacityScale = function(d) {
      var influence = Math.abs(d);
      if(influence > NS.threshold) return .7;
      else                         return .01;
  };

  //var xCenter = function(d) {if(d % 2 == 0) return 0; else return NS.width}
  var xCenter = function(d) {
    var scale = d3.scaleLinear()
      .domain([-3, 3])
      .range([50, NS.width - 50]);
    return scale(d);
  }

  // define how markers are created with the proper color and opacity
  function marker(color, opacity) {
    var name = "arrowhead-" + color.replace("#", "") + "-" + opacity * 100;
    if(NS.svg.select("defs").select("#" + name).empty()) {
      NS.svg.select("defs").append("marker")
      .attr("id", name)
      .attr("viewBox", "0 -5 10 10")
      .attr("refX", 10) // This sets how far back it sits, kinda
      .attr("refY", 0)
      .attr("markerWidth", function(d) { return 3 })
      .attr("markerHeight", function(d) { return 3 })
      .attr("xoverflow","visible")
      .attr("orient", "auto")
      //.attr("markerUnits", "userSpaceOnUse")
      .append("svg:path")
      .attr("d", "M0,-5L10,0L0,5")
      .style("fill", color)
      .style("opacity", opacity)
    }
    return "url(#" + name + ")";  
  }
  // create link and node selections
  NS.svg = makeSVG()
  var node = NS.svg.append("g")
      .attr("class", "nodes")
    .selectAll(".node");
  var link = NS.svg.append("g")
      .attr("class", "links")
    .selectAll(".link");

  // create selections for labels
  var edgeLabelGroup = NS.svg.append("g").attr("class", "edgeLabelGroup")
  var edgepaths = edgeLabelGroup.selectAll(".edgepath")
  var edgelabels = edgeLabelGroup.selectAll(".edgelabel")
/*
    .data(NS.links)
    .enter()
    */

  // create the simulation
  var simulation = d3.forceSimulation()
    .force("link", d3.forceLink()
        .id(function(d) { return d.id; })
        //.distance(300)
        // set distances based on influence
        .distance(function(d) {
          return (300 - Math.abs(d.value))
        })
    )
    // a charge force usually keeps nodes away from each other, but because
    // there is a link between every node (even if it doesnt meet the
    // threshold), it's not neccesary here.
    //.force("charge", d3.forceManyBody())
    .force("center", d3.forceCenter(NS.width / 2, NS.height / 2))
    .force("x", d3.forceX().x(function(d) {
      return xCenter(ideology(d))
    }))
    .alphaTarget(1)
    .on("tick", ticked);
  
  // It is necessary to "construct" nodes an links from the initial data files
  // and then push them on to arrays rather than just pushing the actual nodes
  // or links. If we don't do this, d3 seems to edits the original data
  // structure (i.e. makes source and target an object with many properties)
  // which causes problems down the road. An added benefit of this construction
  // is that we can add properties like "partisanship" which aren't in the
  // original dataset.
  function makeLink(x) {
    return {source: x.source, target: x.target, type: x.type, value: x.value}
  }
  // However, it seems that this behavior is actually wanted for the nodes.
  // Changing the actual data structure allows those nodes to stay in
  // their place when updated
  /*
  function makeNode(x) {
    return {id: x.id, label: x.label, party: "liberal"}
  }*/
  
  // Set nodes and edges for the new cort
  // Takes the natural court number and civil liberties
  function updateNodesAndLinks (nc, cl) {
    updateTitle(nc, cl)
    // create new lists of links and nodes
    var nodes = [], links = [];
    // add nodes
    for(var i = 0; i < NS.nodeList.length; i++) {
      var n = NS.nodeList[i];
      // reset position to center if not yet set
      if(NS.natCourt[nc].justices.includes(+n.id)) {
        if(n.x == undefined) {
          // instead of blindly setting it like this, find a way to set it 
          // at the location of the node that just exited! may have to find
          // a way to do this within the update function itself.
          // Perhaps: keep track of the nodes that exit and pick one of those
          // positions to use.
          n.x = xCenter(ideology(n))
          n.y = NS.height/2;
        }
        nodes.push(n);
      }
    }
    // add links
    for(var i = 0; i < NS.linksList.length; i++) {
      var l = NS.linksList[i];
      if(l.type == cl && l.naturalCourt == nc) { links.push(makeLink(l)) }
    }
    // set the threshold to the top 1/3 of influences (absolute values)
    links.sort();
    var absValues = [];
    for (l in links) {
      absValues.push(Math.abs(links[l].value));
    }
    // set the scale for edge widths
    absValues.sort((a, b) => a - b);
    NS.threshold = absValues[Math.floor(absValues.length/9) * 8];
    // FUTURE: we could implement a way to change the threshold via a slider
    // after the default is set to the top 1/3, so more influences can be ween
    // at will
    edgeStroke.domain([0, Math.ceil(absValues[absValues.length-1])]);
    NS.thing = absValues;
    console.log("Updating for " + nc + " (" + cl + ") with threshold " + NS.threshold)
    // collect some brief data about nodes and edges
    updateSim(nodes, links);
  }

  updateNodesAndLinks(NS.nc, NS.cl);

  

  // in a seperate function, determine which nodes and which edges should be present
  // add or remove, accordingly
  // then call updateSim with the new news and edges variables

  function updateSim(nodes, links) {
    // Apply the general update pattern to the nodes
    // bind the data
    node = node.data(nodes, function(d) { return d.id;})
    // exit, remove the g g
    node.exit().remove();
    // enter, append g 
    nodeEnter = node.enter()
      .append("g")
        .attr("class", "node")
    // enter, append circle and text
    nodeEnter.append("circle")
        .attr("r", 15)
        .attr("fill", function(d) { return nodeColor(d); })
    nodeEnter.append("text")
      .text(function(d) {
        return d.label;
      })
      .attr('opacity', 1)
      .attr('x', 6)
      .attr('y', 3)
      .style("pointer-events", "none");
    nodeEnter.append("title")
      .text(function(d) { return d.id; })
    node = nodeEnter.merge(node);
    node.call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

    // Apply the general update pattern to the links
    // (1)
    link = link.data(links, function(d) { /*console.log(d.source.id)*/; return d.source.id + "-" + d.target.id; });
    // (2)
    link.exit().remove();
    // (3)
    link = link.enter()
      .append("line")
      .attr("stroke-width", function(d) { return edgeStroke(Math.abs(d.value)); })
      .attr("stroke-opacity",  function(d) {return opacityScale(d.value)})
      .attr("data-comparison", function(d) {return d.value})
      .each(function(d) {
        var color = edgeColor(d.value);
        var opacity = opacityScale(d.value);
        d3.select(this).style("stroke", color)
                       .attr("marker-end", marker(color, opacity));
      })
      .merge(link);
    // Apply the general update pattern to link label paths and labels
    // (1)
    edgepaths = edgepaths.data(links, function(d) {return d.source.id + "-" + d.target.id; });
    edgelabels = edgelabels.data(links, function(d) {return d.source.id + "-" + d.target.id; });
    // (2)
    edgepaths.exit().remove();
    edgelabels.exit().remove();
    // (3)
    edgepaths = edgepaths.enter()
      .append('path')
      .attrs({
          'class': 'edgepath',
          'fill-opacity': 0,
          'stroke-opacity': 0,
          'id': function (d, i) {return 'edgepath' + i},
          'visibility': function(d) { return (opacityScale(d.value) > .1 ? "visible" : "hidden")},
      })
      .style("pointer-events", "none")
      .merge(edgepaths)
    edgelabels = edgelabels.enter()
      .append('text')
      .style("pointer-events", "none")
      .attrs({

          'class': 'edgelabel',
          'id': function (d, i) {return 'edgelabel' + i},
          'font-size': 10,
          'fill': '#666',
          'opacity': function(d) { return opacityScale(d.value)},
          'visibility': function(d) { return (opacityScale(d.value) > .1 ? "visible" : "hidden")},
          'dy': function(d) { return -1 * edgeStroke(Math.abs(d.value)) }
      })
      .merge(edgelabels)
  edgelabels.append('textPath')
    .attr('xlink:href', function (d, i) {return '#edgepath' + i})
    .style("text-anchor", "middle")
    .style("pointer-events", "none")
    .attr("startOffset", "50%")
    .attr("visibility", function(d) { return (opacityScale(d.value) > .1 ? "visible" : "hidden")})
    .text(function (d) {return d3.format(".5g")(d.value)})
    .merge(edgelabels)
    
    // Update and restart the simulation
    simulation.nodes(nodes);
    simulation.force("link").links(links);
    simulation.alpha(1).restart();
    NS.sim = simulation;
  }

  function ticked() {
    // update link positions
    link
        .attr("x1", function(d) { return d.source.x; })
        .attr("y1", function(d) { return d.source.y; })
        .attr("x2", function(d) { return d.target.x; })
        .attr("y2", function(d) { return d.target.y; });
    // update node positions
    node
        .attr("transform", function(d) {
          if(d.x < 100 && d.y < 100) console.log(d.id);
          return "translate(" + d.x + "," + d.y + ")";
        })
    // re-draw edge paths
    edgepaths.attr('d', function (d) {
          return 'M ' + d.source.x + ' ' + d.source.y + ' L ' + d.target.x + ' ' + d.target.y;
        });
    // rotate labels to ensure legibility
    edgelabels.attr('transform', function (d) {
        if (d.target.x < d.source.x) {
            var bbox = this.getBBox();

            rx = bbox.x + bbox.width / 2;
            ry = bbox.y + bbox.height / 2;
            //return 'rotate(180 ' + rx + ' ' + ry + ')';
            var rotate = 'rotate(180 ' + rx + ' ' + ry + ')'
            var translate = 'translate(0 0)';
        }
        else {
            var rotate = 'rotate(0)';
            var translate = 'translate(0 0)';
        }
        return rotate + translate;
    });
  }
  function updateTitle(nc, cl) {
    var title = d3.select(".title")
    var description = NS.natCourt[nc].desc
    if(cl == "CL") cl = "Civil Liberties"; else cl = "Non-Civil Liberties";
    title.select("#court-number").text(nc)
    title.select("#court-name").text(description.name)
    title.select("#court-date").text(description.date)
    title.select("#civil-liberties").text(cl)
  }
  
  function controls() {
    // Create slider
    var data = d3.keys(NS.natCourt);
    var margin = {right: 150, left: 20, top: 10}
    var svg = d3.select(".slider").append("svg")
      .attr("width", NS.width - margin.right)
      .attr("height", 100);

    // create a range of x values from the courts
    var courtKeys = d3.keys(NS.natCourt)
    var range = [];
    for (key in d3.keys(NS.natCourt)) {
      range[key] = key * ((NS.width - margin.right - margin.left)/courtKeys.length)
    }
    var x = d3.scaleOrdinal()
        .domain(courtKeys)
        .range(range)

    var slider = svg.append("g")
        .attr("class", "slider")
        .attr("transform", "translate(" + margin.left + ", " + margin.top + ")");
    slider.append("line")
        .attr("class", "track")
        .attr("x1", x.range()[0])
        .attr("x2", x.range()[x.range().length - 1])
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-inset")
      .select(function() { return this.parentNode.appendChild(this.cloneNode(true)); })
        .attr("class", "track-overlay")
        .call(d3.drag()
            .on("start.interrupt", function() { slider.interrupt(); })
            .on("start drag", function() {
              sliderChanged(d3.event.x);
            }));

    slider.insert("g", ".track-overlay")
        .attr("class", "ticks")
        .attr("transform", "translate(0," + 18 + ")")
      .selectAll("text")
      .data(courtKeys)
      .enter().append("g")
        .attr("class", "tick-text")
        .attr("transform", function(d) { return "translate(" + (x(d) - 5) +", -5)" })
      .append("text")
        .attr("text-anchor", "start")
        .attr("transform", "rotate(90)")
        .attr("fill", "#333")
        // set the text to the longer name (i.e. Vinson 3 instead of 1301)
        .text(function(d) { return NS.natCourt[d].desc.name; });

    var handle = slider.insert("circle", ".track-overlay")
        .attr("class", "handle")
        .attr("r", 9);

    function sliderChanged(pos) {
      // round position to nearest value in discrete range
      var i = d3.bisect(range, pos);
      var rounded = range[i];
      var nc = x.domain()[i]

      // if different, change:
      if(NS.nc != nc) {
        // update global variables
        NS.nc = nc;
        // update handle postion
        handle.attr("cx", rounded);
        // get corresponding court & update
        updateNodesAndLinks(NS.nc, NS.cl);
      }
    }

    // Create button
    var button = d3.select(".button").append("input")
      .attr("type", "button")
      .attr("name", "toggle")
      .attr("value", "Toggle Civil Liberties")
      .attr("onclick", "NS.buttonPressed()")

    NS.buttonPressed = function () {
      NS.cl = (NS.cl=="CL") ? "nonCL" : "CL";
      updateNodesAndLinks(NS.nc, NS.cl);
    }
    // hacky way to get the button press function in the global scope, pt. 1
    //return buttonPressed;

  }

  // hacky way to get the button press function in the global scope, pt. 2
  //NS.buttonPressed = controls();
  controls();

  function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    d.fx = d.x;
    d.fy = d.y;
  }

  function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }

  function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
  }
}

// hacky way to get the button press function in the global scope, pt. 1
//function buttonPressed() {
//  NS.buttonPressed.call()
//}

initialize()
