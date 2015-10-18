define(function() {
	return function() {
		var $panel = $('<div class="graph-frame block-gradient"></div>');
		
		//var parseDate = d3.time.format("%d-%b-%y").parse;
		var margin = {top: 30, right: 50, bottom: 40, left: 90};
		var width = 974 - margin.left - margin.right;	// TODO: do not hardcode values!
		var height = 360 - margin.top - margin.bottom;
		
		var svg = d3.select($panel[0]).append('svg');
		svg.attr('width', width + margin.left + margin.right);
		svg.attr('height', height + margin.top + margin.bottom);
		
		var curveWidth = 2.5;
		var zoomScale = null;

		var graph = null;
		var curve = null;
		
		var x = d3.scale.linear().range([0, width]);
		var y = d3.scale.linear().range([height, 0]);
		
		var line = d3.svg.line();
		line.x(function(d) { return x(d[0]); });
		line.y(function(d) { return y(d[1]); });
		
		var xAxis = d3.svg.axis().scale(x).orient('bottom');
		var yAxis = d3.svg.axis().scale(y).orient('left');
		
		xAxis.tickFormat(function(day) {
			if(day%30==0) return day/30;
			return (day/30).toFixed(2);
		});

		svg.on('click', function(event) {
			var m = d3.mouse(this);
			//console.debug(x.invert(m[0] - margin.left));
			//console.debug(y.invert(m[1] - margin.top));
		});
				
		var clipRect = svg.append('defs').append('clipPath').attr('id', 'clip').append('rect');
		clipRect.attr('x', 0)
		        .attr('y', 0)
				.attr('width', 0)
				.attr('height', height);				

		var zoom = d3.behavior.zoom().on('zoom', redraw);
		svg.call(zoom).on('dblclick.zoom', null);
		initGraph();
		
		function redraw() {
			if(curve) {
				d3.select('g.x.axis').call(xAxis);
				d3.select('g.y.axis').call(yAxis);
				
				var trans = d3.event.translate;
				var scale = d3.event.scale;
				console.debug('('+trans+')');
				var new_trans = [trans[0]-margin.left, trans[1] - margin.top];
				curve.attr('transform', 'translate('+trans+')' + ' scale('+scale+')');
				//curve.attr('transform','scale('+scale+')');
				curve.attr('stroke-width', curveWidth/scale);
				
				//var m = d3.mouse(this);
				//console.debug(x.invert(m[0] - margin.left));
				//console.debug(y.invert(m[1] - margin.top));
			}
		}
		
		var _data = [];
		
		function plot(data) {
			_data = data;
			x.domain(d3.extent(data, function(d) { return d[0]; })).nice();
			y.domain(d3.extent(data, function(d) { return d[1]; })).nice();
			
			graph.attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')');
			
			graph.append('g')
			     .call(xAxis)
			     .attr('class', 'x axis')
			     .attr('transform', 'translate(0,' + height + ')');
			
			graph.append('g')
				 .call(yAxis)
			     .attr('class', 'y axis');
			
			curve = graph.append('g').attr('clip-path', 'url(#clip)').append('path');
			curve.datum(data);
			curve.attr('class', 'curve');
			curve.attr('d', line);
			curve.attr('stroke-width', curveWidth);
			
			clipRect.attr('width', 0)
			        .transition()
					.duration(1000)
					.attr('width', width)
			
			zoomScale = 1;
			zoom.scale(zoomScale).translate([0, 0]);
			zoom.x(x).y(y);
		}
		
		function initGraph() {
			if(graph) graph.remove();
			graph = svg.append('g');
			/*
			graph.append('rect')
				.attr('x', 0)
				.attr('y', 0)
				.attr('width', width)
				.attr('height', height)
				.attr('style', 'fill-opacity: 0;')
				.call(zoom).on('dblclick.zoom', null);
			*/
		}
		
		return {
			node: $panel[0],
			plot: plot,
			clear: initGraph
		};
	};
});
