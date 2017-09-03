$(function(){
	var elements = $('.parallax'), images = elements.children('img');
	var heights = {};
	images.on('load', function(event){
		heights[this.getAttribute('src')] = this.naturalHeight;
	});
	$(window).scroll(moveImages).resize(moveImages).resize(centerImages).resize();
	function moveImages(){
		var top = $(window).scrollTop(), bottom = top + window.innerHeight;
		images.css('top', function(i, value){
			var img = $(this), div = $(this.parentElement);
			var elTop = div.offset().top, elBottom = elTop + div.height();
			if(elTop > bottom || elBottom < top) return value;//Off-screen: last value
			var offset = 0.5 * (top - elTop);
			return offset + 'px';
		});
	}
	function centerImages(){
		images.css('left', function(i, val){
			console.log(i, images.eq(i).width());
			return (window.innerWidth - images.eq(i).width()) / 2;
		});
	}
});
