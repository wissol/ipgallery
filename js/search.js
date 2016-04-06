$(document).ready(function() {
var search_query = "";
var my_key= "";
var shiftpressed = false;

	$('#search').focus(function(){		
		search_query = "";
	});
		
	$('#search').keydown(function(event){
		var my_query = "";
		var my_query2 = "";
		console.log(event.which);
		
		if(event.which == 8){
			if (search_query != ""){
				search_query = search_query.slice(0,-1);
				console.log("search_query", search_query);
			}
			shiftpressed = false;
		} else if(event.which == 16) { /* Shift */
			console.log("shiftpressed");
			shiftpressed = true;
		} else {
			my_key = String.fromCharCode(event.which)
			if(!shiftpressed) {
				my_key = my_key.toLowerCase();
			}
			shiftpressed = false;
			console.log('myk',my_key);
			search_query += my_key;
		}
		console.log(search_query);
		if (search_query != ""){
			my_query = $('img:not([alt*=' + search_query +'],[title*=' + search_query +'])');
			console.log(my_query);
			$(my_query).fadeTo(800,0.01);
			my_query2 = $('[alt*=' + search_query +'],[title*=' + search_query +']');
			console.log(my_query2);
			$(my_query2).fadeTo(800,100);
	
		} else {
			$('img').fadeTo(800,100);
		}
	});

});
