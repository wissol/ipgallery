$(document).ready(function() {
var $search_query = "";
var $images_detached;

	$('#search').focus(function(){		
		$search_query = "";
	});
		
	$('#search').keypress(function(event){
		var $my_query = "";
		$search_query += String.fromCharCode(event.which);
		console.log($search_query);
		$my_query = $('img:not([alt*=' + $search_query +'],[title*=' + $search_query +'])');
		$($my_query, $my_query.parent()).fadeOut(800, function(){
			$images_detached = $($my_query, $my_query.parent()).detach();
		});
		
	});

});
