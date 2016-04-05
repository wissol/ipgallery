$(document).ready(function() {
var $search_query = "";
var $images_detached;
var my_key= "";

	$('#search').focus(function(){		
		$search_query = "";
	});
		
	$('#search').keydown(function(event){
		var $my_query = "";
		console.log(event.which);
		
		if(event.which == 8){
			if ($search_query != ""){
				$search_query = $search_query.slice(0,-1);
				console.log("$search_query", $search_query);
			}
		} else {
			my_key = String.fromCharCode(event.which).toLowerCase();
			console.log('myk',my_key);
			$search_query += my_key;
		}
		console.log($search_query);
		$my_query = $('img:not([alt*=' + $search_query +'],[title*=' + $search_query +'])');
		$($my_query, $my_query.parent()).fadeOut(800, function(){
			$images_detached = $($my_query, $my_query.parent()).detach();
		});
		
	});

});
