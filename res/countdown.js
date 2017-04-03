(function(name, m, d, y, h, mn, s, message){
	var date = new Date(y, m-1, d, h, mn, s);//Months are the only 0-index field here. WHYYY!?
	$(function(){
		window.setInterval(function(){
			var milliseconds = date.getTime() - Date.now();
			var seconds = Math.floor(milliseconds / 1000);
			milliseconds %= 1000;
			var minutes = Math.floor(seconds / 60);
			seconds %= 60;
			var hours = Math.floor(minutes / 60);
			minutes %= 60;
			var days = Math.floor(hours / 24);
			hours %= 24;
			
			var newText = text(days, hours, minutes, seconds) + ' to ' + name, oldText = $('#countdown').text();
			// if(newText != oldText)
			$('#countdown').text(newText);
		}, 1000);
	});
	
	function text(days, hours, minutes, seconds){
		if(days > 0) return days + ' days';
		else if(hours > 0) return hours + ' hours';
		else if(minutes > 0) return minutes + ' minutes';
		else if(seconds > 0) return seconds + ' seconds';
		else return message;
	}
})('PNW District Championships!', 4, 5, 2017, 0, 0, 0, 'See you at');
