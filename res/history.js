$(function(){
	$(window).off('popstate').on('popstate', function(event){
		var state = event.originalEvent.state;
		submit(state ? state.url : location.pathname);
	});
	$('a').off('click').on('click', function(event){
		if(this.getAttribute('href').startsWith('/')){
			console.groupCollapsed();
			addLoader($(this));
			submit(this.getAttribute('href'), false);
			return false;
		}else return true;//For external links, don't bother with state
	});
});

function submit(url, replace){
	console.log('Page', $(document.body).attr('data-url'), 'submitting URL', url);
	if(replace ===  true) history.replaceState({url: url}, null, url);
	if(replace === false) history.pushState({url: url}, null, url);
	var xhr = new XMLHttpRequest();
	xhr.onload = load;
	xhr.open('GET', url);
	xhr.responseType = 'document';
	xhr.startTime = performance.now();
	xhr.send();
}
function load(){
	if(this.status == 404){
		submit('/404.html', true);
	}else{
		var newDoc = this.responseXML;
		var endTime = performance.now(), delta = endTime - this.startTime, remaining = Math.max(750 - delta, 0);//Prevent seizure-level flickering by forcing .75s delay
		setTimeout(function(){
			var oldURL = document.body.getAttribute('data-url'), newURL = newDoc.body.getAttribute('data-url');
			var content = $('#content');
			document.documentElement.replaceChild(newDoc.head, document.head);
			document.body.replaceChild(newDoc.getElementById('content'), document.getElementById('content'));
			document.body.setAttribute('data-url', newDoc.body.getAttribute('data-url'));
			$(document).ready();//Re-initialize the page
			console.log('Page', oldURL, 'loaded URL', newURL);
			scroll(0, 0);
		}, remaining);
	}
	console.groupEnd();
}
