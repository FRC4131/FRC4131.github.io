//http://jsfiddle.net/5dRxh/ with edits
//Allow document.ready() to be fired multiple times
(function($, undefined){
    var isFired = false;
    $(function(){
        isFired = true;
        $(document).ready();
    });
    jQuery.fn.ready = function(fn){
        if(fn === undefined){
            $(document).trigger('page_ready');
            return;
        }
        if(isFired) window.setTimeout(fn, 0);//If already loaded, just call it
        $(document).on('page_ready', fn);
    };
})(jQuery);
