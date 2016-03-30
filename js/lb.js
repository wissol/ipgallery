$(document).ready(function() {

  function close_lightbox(){
  $(".lightbox").remove();
  $(".arrow").remove();
  $("body").removeClass('no_scroll_bar');
}

function get_next_image(){
  var $my_src = $('#lbimage').attr('src');
  $my_src = $my_src.slice(0, 3) + "/thumbs" + $my_src.slice(3);
  var $my_query = "img[src|='" + $my_src + "']";
  var $next_src = $($my_query).next().attr('src').replace('thumbs/','');
  var $new_caption = $($my_query).next().attr('alt');
  $('figcaption').replaceWith("<figcaption>" + $new_caption + "</figcaption>");
  $('#lbimage').attr('src', $next_src);
}

function get_previous_image(){
  var $my_src = $('#lbimage').attr('src');
  var $my_query = '';
  var $prev_src = '';
  var new_caption = '';

  if ($my_src !== undefined){

    $my_src = $my_src.slice(0, 3) + "/thumbs" + $my_src.slice(3);
    $my_query = "img[src|='" + $my_src + "']";
    

    } else {

    $my_src = $('#lbvideo').attr('src').replace('https://www.youtube.com/embed/','img/thumbs/');
    $my_src = $my_src + '.jpg';
    console.log($my_src);
    $my_query = "img[src|='" + $my_src + "']";

    }
    
    $prev_src = $($my_query).prev().attr('src').replace('thumbs/','');
    $is_video = $($my_query).prev().hasClass('youtube');

    if ($is_video) {
      $new_caption = $($my_query).prev().attr('alt');
      $('figcaption').replaceWith("<figcaption>" + $new_caption + "</figcaption>");
      $('#lbimage').hide;   
      $('#lbvideo').hide(); 

    } else {
  
      $new_caption = $($my_query).prev().attr('alt');
      $('figcaption').replaceWith("<figcaption>" + $new_caption + "</figcaption>");
      $('#lbimage').attr('src', $prev_src);   
      $('#lbvideo').hide(); 
    }

}

function get_video_wrapper() {

  var $fig_begin_video = "<figure class='lightbox'><iframe id='lbvideo' width='xxx' height='yyy' frameborder='0' src=";
  var $aspect_ratio = 720 / 1280;
  var $win_width = $(window).width();
  var $video_width = 1280;
  var $video_height = 720;
  
  if ($win_width < 1680) {

        $video_width = $win_width * 0.8;
        $video_height = $video_width * $aspect_ratio;

      } 

  return $fig_begin_video.replace('xxx',$video_width).replace('yyy',$video_height);

}


  $("img").click(function() {
    event.preventDefault();
    var $fig_begin = "<figure class='lightbox'><img id='lbimage' src=";
    var $src = $(this).attr('src').replace('thumbs/','');
    var $inner_caption = $(this).attr('alt');
    var $caption = '><figcaption>' + $inner_caption + '</figcaption>';
    var $fig_end = "</figure>";
    var $rarrow = '<img id="rarrow" class="arrow" src="css/rarrow.svg">'
    var $larrow = '<img id="larrow" class="arrow" src="css/larrow.svg">'
    var $youtube_source_first_part = 'https://www.youtube.com/embed/'    

    if ($(this).attr('class') == 'youtube') {
      $src = $src.replace('img/','').replace('.jpg','');
      $src = $youtube_source_first_part + $src;
      console.log($src);
      console.log($caption);
      $fig_begin = get_video_wrapper();
    } else {

    }
    $( $("body") )
      .append( $fig_begin + $src + $caption + $fig_end)
      .append( $rarrow )
      .append( $larrow )
      .prependTo( $("body") );
    $($("body")).addClass('no_scroll_bar');
    
  });

  $($("body")).on('click', '#lbimage', function() {
    close_lightbox();
    console.log('lbimage');
  });

  $($("body")).on('click', 'figure', function() {
    close_lightbox();
    console.log('lbimage');
  });

  $($("body")).on('click', '#rarrow', function() {
    get_next_image();
  });

  $($("body")).on('click', '#larrow', function() {
    get_previous_image();
  });

 
});

