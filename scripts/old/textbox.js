define(['misc'], function(Misc) {
	return function(newParams) {
		var params = {
			label: '',
			val: ''
		};
		$.extend(params, newParams);
		
		var id = Misc.nextId();
		
		var $panel = $('<div class="textbox"></div>');
		var $label = $('<label for="' + id + '">' + params.label + '</label>');
		var $input = $('<input id="' + id + '" class="textbox" value="' + 
					   params.val + '" type="text" />');
		
		$panel.append($label, $input);
		
		return {
			node: $panel[0],
			val: function() {
				return $input.val();
			}
		};
	};
});
