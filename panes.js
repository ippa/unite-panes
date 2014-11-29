'use strict';

var Panes = function(options) {
  if(!options) options={};
  // if(typeof require === 'function') var interact = require("interact");
  
  var resistance = options.resistance || 15;
  var that = this;

  var container = document.querySelector(options.container);
  var panes = container.querySelectorAll(".pane");
  var wrapper = container.parentNode;
  
  var anchors = [];
  
  // Set pane width to window-width
  [].forEach.call(panes, function(pane, index) { 
    pane.style.width = window.innerWidth + "px"; 
    anchors.push( {x: -(index * window.innerWidth), y: 0} )
  });

  var max_x = window.innerWidth * (panes.length - 1);
  container.style.width = (window.innerWidth * panes.length) + "px";

  interact(container)
  .draggable({
    onmove: function(event) {
      var target = event.target;
      var new_x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx;
      target.style.transform = 'translate(' + new_x + 'px)';
      target.style.webkitTransform = 'translate(' + new_x + 'px)';
      target.setAttribute('data-x', new_x); 
    }
  })
  .inertia({resistance: resistance, zeroResumeDelta: true, allowResume: true })
  .snap({
    mode: "anchor",
    elementOrigin: { x: 0, y: 0 },
    anchors: anchors,
    endOnly: true,
    range: Infinity
  });

}

if(typeof module !== "undefined" && ('exports' in module)) { module.exports = Panes }
