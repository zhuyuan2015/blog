// $(function () {
// 	$('#nav .nav_ul li').hover(function () {
// 		var get_offsetLeft = $(this).first().offsetLeft;
// 		$('#nav .move_bg').animated({
// 			attr: 'left',
// 			target: 40+get_offsetLeft
// 		});
// 	},function () {
// 		$('#nav .move_bg').animated({
// 			attr: 'left',
// 			target: 40
// 		});
// 	});
// });
function setPosition(start,end) {
	$('#nav .nav_ul li').hover(function () {
		var get_offsetLeft = $(this).first().offsetLeft;
		$('#nav .move_bg').animated({
			attr: 'left',
			target: start+get_offsetLeft
		});
	},function () {
		$('#nav .move_bg').animated({
			attr: 'left',
			target: end
		});
	});
}
