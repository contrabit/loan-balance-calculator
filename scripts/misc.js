define({
	round: function(x, n) {
		var t = Math.pow(10, n);
		return Math.round(x*t)/t;
	},
	nextId: function() {
		var id = 0;
		return function() {
			return 'koajef'+(id++);
		};
	}()
});
