define(['misc'], function(Misc) {
	return function(c, p, n, payment_days) {
		var r = 1 + p/12;
		var rn = Math.pow(r, n);
		var a = Misc.round(c * rn * (1-r)/(1-rn), 2);
		
		var x = [];
		var y = [];
		var data = [];		// TODO: x and y not needed if data exists?
		//var minx, maxx, miny, maxy;
		
		if(payment_days == null) {
			payment_days = [];
			for(var i=0; i<n+1; ++i) {
				payment_days.push(30*i);
			}
		}

		(function generatePoints() {
			pd = p/360;
			x = [0];
			y = [c];
			days = payment_days;

			for(var i=1; i<days.length; ++i) {
				// Balance on the day Before Payment Day
				bbpd = Misc.round(y[y.length-1] * (1 + (days[i] - days[i-1] - 1) * pd), 2);
				// balance on the payment day
				b = Misc.round(y[y.length-1] * r, 2);
				x.push(days[i]-1, days[i], days[i]);
				y.push(bbpd, b, b-a);
				
				//data.push([days[i]-1, bbpd], [days[i], b], [days[i], b-a]);
			}
			y[y.length-1] = 0;
			//data[data.length-1][1] = 0;
			
			for(var i=0; i<x.length; ++i) {
				data.push([x[i], y[i]]);
			}
			
			//minx = min(x);
			//maxx = max(x);
			//miny = min(y);
			//maxy = max(y);
		})();
		
		return {
			annuity: function() {return a},
			getX: function() {return x},
			getY: function() {return y},
			getData: function() {return data}
		};
	};
});
