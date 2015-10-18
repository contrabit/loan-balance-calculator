define(function() {
	return function() {
		var onCalculate = function() {};

		var vals = {c: 100000, p: 6.5, n: 240};
		
		var template = Handlebars.compile($('#calc-frame').html());
		var $panel = $(template(vals));
		
		var elems = {};
		
		$panel.find('[data-elemgetter]').each(function() {
			var which = this.getAttribute('data-elemgetter');
			elems[which] = this;
			this.removeAttribute('data-elemgetter');
		});
		
		$(elems.button_calc).click(function() {
			var c = parseFloat(elems.textbox_c.value);
			var p = parseFloat(elems.textbox_p.value)/100;
			var n = parseFloat(elems.textbox_n.value);
			onCalculate(c, p, n);
			$(this).removeClass('pressed');
		});
		
		$(elems.button_calc).mousedown(function() {
			$(this).addClass('pressed');
		});
		
		return {
			node: $panel[0],
			setAnnuity: function(annuity) {
				elems.value_a.innerHTML = annuity;
			},
			setOnCalculate: function(handler) {	// handler takes: c, p, n
				onCalculate = handler;
			}
		};
	};
});
