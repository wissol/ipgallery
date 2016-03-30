$(document).ready(function() {
var $search_query = "";
var $images_detached;

	$('#search').focus(function(){		
		$search_query = "";
	});
		
	$('#search').keypress(function(event){
		var $my_query = "";
		$search_query += String.fromCharCode(event.which);
		$my_query = $('img:not([alt*=' + $search_query +'])')
		$images_detached = $($my_query, $my_query.parent()).detach();
	});

});