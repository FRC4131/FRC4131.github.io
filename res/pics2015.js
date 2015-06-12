var ALPHA_HIGH = 1.0, ALPHA_MEDIUM = 0.7, ALPHA_LOW = 0.4;
var captions = ["Caught Alex by surprise!", "Sydney was heads-down with business cards all day.", "A prototype for the new driver station.", "Austin was CAD'ing it up.", "The Jacobsons work on field elements.", "Jill and Emily were essential to maintaining morale through build season.", "Ian and Doug review ideas for the robot.", "Build Season Quotes"];
var srcIcon = ["img0.jpg", "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg", "img7.jpg", "img8.jpg"];
var srcMain = ["img0.jpg", "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg", "img7.jpg", "https://www.youtube.com/embed/vigERTgk39w?autoplay=0"];
var href = ["img0.jpg", "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg", "img6.jpg", "../quotes", "https://youtube.com/watch?v=vigERTgk39w"];
var NUM_IMAGES = srcIcon.length;
$(document).ready(function(){
	var table = $("#link-table");
	for(var i=0;i<NUM_IMAGES;){
		var start=i;
		var row = $("<tr></tr>");
		for(;(i-start)<10 && i<NUM_IMAGES;i++){
			var img = $("<img src='" + srcIcon[i] + "' data-index='" + i + "'/>");
			img.click(function(){
				fadeOut($(".selected"));
				fadeIn($(this));
			});
			img.mouseenter(function(){
				if(!$(this).hasClass("selected"))
					$(this).fadeTo("slow", ALPHA_MEDIUM);
			});
			img.mouseleave(function(){
				if($(this).hasClass("selected"))
					$(this).fadeTo("slow", ALPHA_HIGH);
				else
					$(this).fadeTo("slow", ALPHA_LOW);
			});
			var cell = $("<td></td>");
			cell.append(img);
			row.append(cell);
		}
		table.append(row);
	}
	var imgs = $("#link-table img"), first = imgs.first();
	fadeOut(imgs.not(first));
	fadeIn(first);
});
function fadeIn(img){
	img.toggleClass("selected", true);
	img.fadeTo("slow", ALPHA_HIGH);
	$("#main-wrapper").fadeTo("fast", 0, function(){
		var ind = parseInt($(".selected").attr("data-index"));
		var src = srcMain[ind];
		if($("#main").tagName() == "img"){
			console.log("img");
			if(startsWith(src, "http")){
				$("#main").replaceTag("iframe");
				console.log("-->iframe");
			}
		}else{
			console.log("iframe");
			if(!startsWith(src, "http")){
				$("#main").replaceTag("img");
				console.log("-->img");
			}
		}
		$("#main").attr("src", src);
		$("#main-link").attr("href", href[ind]);
		$("#caption").text(captions[ind]);
		$("#main-wrapper").fadeTo("fast", 1);
	});
}
function fadeOut(img){
	img.toggleClass("selected", false);
	img.fadeTo("slow", ALPHA_LOW);
}
