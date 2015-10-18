/*
c ... total amount
p ... annual interest rate
n ... loan term [months]
a ... annuity (monthly payment)
*/

define(['curve', 'calc_frame', 'graph_frame', 'misc'],
function(Curve, CalcFrame, GraphFrame, Misc) {
	var $panel = $('.main-div');
	
	var calcFrame = CalcFrame();
	calcFrame.setOnCalculate(calculateAndShow);
	
	var graphFrame = GraphFrame();
	
	function calculateAndShow(c, p, n) {
		graphFrame.clear();
		var crv = Curve(c, p, n);
		calcFrame.setAnnuity(crv.annuity());
		graphFrame.plot(crv.getData());
	}
	
	$panel.append(calcFrame.node, graphFrame.node);
});
