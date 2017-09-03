$(function(){
	$('.section.loader').removeClass('loader');
	$('.loader').remove();
});
function addLoader(link){
	console.log(link);
	var section = link.parents('.section');
	if(section.length){
		var windowTop = $(window).scrollTop(), windowHeight = window.innerHeight, headerHeight = $('#header').height(), elTop = section.offset().top;
		windowTop += headerHeight;
		section.addClass('loader').css('min-height', Math.floor(section.height()) + 'px');
		window.setTimeout(function(){
			section.css('top', (windowTop - elTop) + 'px').css('min-height', windowHeight + 'px');
		}, 100);
	}else{
		var loader = $('<div>').addClass('loader').appendTo(document.body);
		window.setTimeout(function(){
			loader.css('opacity', 0.8);
		}, 100);
	}
}
