define(function() {
	return function(newParams) {
		var params = {
			text: ''
		};
		$.extend(params, newParams);
		
		//var id = nextId();
		
		var $panel = $('<span class="label">' + params.text + '</span>');
		
		return {
			node: $panel[0],
			text: function(text) {
				$panel.html(text);
			}
		};
	};
});
