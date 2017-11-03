$.getMultiScripts = function(arr, path) {
    var _arr = $.map(arr, function(scr) {
        return $.getScript( (path||"") + scr );
    });
    _arr.push($.Deferred(function( deferred ){
        $( deferred.resolve );
    }));
    return $.when.apply($, _arr);
}
var scripts = [];

$.getMultiScripts(scripts).done(function() {
     // all done
}).fail(function(error) {
     // one or more scripts failed to load
}).always(function() {
     // always called, both on success and error
});

document.getElementById("overLayout").style.width = "100%";
document.getElementById("overLayout").style.opacity = "0.8";
