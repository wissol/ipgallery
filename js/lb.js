/*jshint esversion: 6 */
$(document).ready(function() {
  /* Constants */
  const YOUTUBE_SOURCE_FIRST_PART = 'https://www.youtube.com/embed/';  
  const RARROW = '<img id="rarrow" class="arrow" src="css/rarrow.svg">';
  const LARROW = '<img id="larrow" class="arrow" src="css/larrow.svg">';
  const FIG_BEGIN = "<figure class='lightbox'>";
  const FIG_END = "</figure>";
  const IMAGE_ELEMENT = "<img id='lbitem' class='image' src='xxx'>";
  const IFRAME_ELEMENT = "<iframe id='lbitem' class='video' width='xxx' height='yyy' src='zzz' frameborder='0'></iframe>";

  /* functions */ 

  function close_lightbox(){
    $(".lightbox").remove();
    $(".arrow").remove();
    $("body").removeClass('no_scroll_bar');
  }

  function get_video_dimensions(){
    var video_width = 1280;
    var video_height = 720;
    var aspect_ratio = video_height / video_width;
    var win_width = $(window).width();

    if (win_width < 800) {
    	video_width =  win_width;
    	video_height = video_width * aspect_ratio;
    } else {
	    if (win_width < 1680) {
	          video_width =  win_width * 0.8;
	          video_height = video_width * aspect_ratio;
	      } 
	}

    return [video_width, video_height];
  }

  function display_new_item(next){
  	var src = $('#lbitem').attr('src');
  	var is_video_displayed = $('#lbitem').hasClass('video');
  	var query = '';
  	var new_item = '';

  	if (is_video_displayed) {
  		src = src.replace(YOUTUBE_SOURCE_FIRST_PART,"img/thumbs/") + ".jpg";
  	} else {
  		src = src.slice(0, 3) + "/thumbs" + src.slice(3);
  		
  	}

  	query = "img[src|='" + src + "']";
  	console.log('query', query);

	if(next){
		new_item = $(query).next();
	} else {
		new_item = $(query).prev();
	}

	if (new_item.hasClass('youtube')){
		display_new_video(new_item);
	} else {		
		display_new_image(new_item);		
  	}
  }


  function display_new_image(new_item){
  	var is_video_displayed = $('#lbitem').hasClass('video');
  	var new_caption = '';
  	var new_src = '';
  	var finished_image_element;
  	

  	if (is_video_displayed){
  		/* replace iframe with image */
  		
  		new_src = new_item.attr('src').replace('thumbs/','');
  		new_caption = new_item.attr('alt');

  		$('figcaption').replaceWith("<figcaption>" + new_caption + "</figcaption>");
  		finished_image_element = IMAGE_ELEMENT.replace('xxx',new_src);
  		$('#lbitem').replaceWith(finished_image_element);

  	} else {
  		  		
  		new_src = new_item.attr('src').replace('thumbs/','');
  		new_caption = new_item.attr('alt');

  		$('figcaption').replaceWith("<figcaption>" + new_caption + "</figcaption>");
    	$('#lbitem').attr('src', new_src);
  	}
  } 


  function display_new_video(new_item){
  	var is_video_displayed = $('#lbitem').hasClass('video');
  	var new_caption = '';
  	var new_src = '';
  	var dimensions = []; 
  	var finished_iframe_element;

  	new_src = new_item.attr('src').replace('img/thumbs/','').slice(0,-4);
  	new_src = YOUTUBE_SOURCE_FIRST_PART + new_src;
  	new_caption = new_item.attr('alt'); 	
  	$('figcaption').replaceWith("<figcaption>" + new_caption + "</figcaption>");

  	if (is_video_displayed){
  		/* update iframe src and caption */ 
 		  		
  		$('#lbitem').attr('src', new_src);

  	} else {
  		/* replace img with iframe */  		  		
  		
  		dimensions = get_video_dimensions();  /* width, height */

  		finished_iframe_element = IFRAME_ELEMENT.replace('xxx', dimensions[0]).replace('yyy', dimensions[1]).replace('zzz', new_src);
  		
    	$('#lbitem').replaceWith(finished_iframe_element);
  	}

  }

  function display_figure_and_image(thumbnail){
  	var src = $(thumbnail).attr('src').replace('thumbs/','');
  	var caption = $(thumbnail).attr('alt');
  	var fig_caption = '<figcaption>xxx</figcaption>';
  	var finished_image_element = IMAGE_ELEMENT.replace('xxx', src);

  	fig_caption = fig_caption.replace('xxx',caption);

  	$( $("body") )
      .append( FIG_BEGIN + finished_image_element + fig_caption + FIG_END)
      .append( RARROW )
      .append( LARROW )
      .prependTo( $("body") );

    $($("body")).addClass('no_scroll_bar');
  }

  function display_figure_and_video(thumbnail){
  	var src = $(thumbnail).attr('src').replace('img/thumbs/',YOUTUBE_SOURCE_FIRST_PART).replace('.jpg','');
  	var caption = $(thumbnail).attr('alt');
  	var finished_iframe_element = IFRAME_ELEMENT;
  	var fig_caption = '<figcaption>xxx</figcaption>';
  	var dimensions = get_video_dimensions();  /* width, height */
  	
  	finished_iframe_element = finished_iframe_element.replace('xxx', dimensions[0]).replace('yyy', dimensions[1]).replace('zzz', src);
  	fig_caption = fig_caption.replace('xxx',caption);

  	$( $("body") )
      .append( FIG_BEGIN + finished_iframe_element + fig_caption + FIG_END)
      .append( RARROW )
      .append( LARROW )
      .prependTo( $("body") );

    $($("body")).addClass('no_scroll_bar');

  }

  /* Opens the lightbox, displays the img/video and caption */

  $("img").click(function() {
    event.preventDefault();
    var is_video = $(this).hasClass('youtube');

    if(is_video){
    	display_figure_and_video(this);
    } else {
    	display_figure_and_image(this);
    }    
    
  	});

  /* Displays next and prev items */

  $($("body")).on('click', '#rarrow', function() {
    display_new_item(true);
  });

  $($("body")).on('click', '#larrow', function() {
    display_new_item(false);
  });

  /* Closing the lightbox */

  $($("body")).on('click', '#lbitem', function() {
    close_lightbox();
  });

  $($("body")).on('click', 'figure', function() {
    close_lightbox();
  });

  /* Keyboard */

	$(document).keydown(function(e){
		if (e.keyCode == 39) { /* right arrow */
		   display_new_item(true);
		}
	});

	$(document).keydown(function(e){
		if (e.keyCode == 37) {  /* left arrow */
		   display_new_item(false);
		}
	});

	$(document).keydown(function(e){
		if (e.keyCode == 88 || e.keyCode == 27)  { /* escape or x key closes the lightbox */
		   close_lightbox();
		}
	});
});
