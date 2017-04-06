// Soma PDP description tooltips
$(function () {
  // Activate tooltips
  $('.soma-tooltip-trigger').tooltip();
  // Activate dismiss icon inside tooltips
  $('.product-description').on('click', '.dismiss', function() {
    $(this).parent().parent().tooltip('hide');
  });
  // Close other tooltips
  // http://stackoverflow.com/questions/17274130/
  $('.soma-tooltip-trigger').on('show.bs.tooltip', function() {
      $('.tooltip').not(this).hide();
  });
});


// refer a friend add/remove fields: only used by soma right now
$(function() {
  // var maxFields = 11;
  var fieldWrapper = $(".refer-friend-fields");
  var fieldButton = $(".add-field");
  var n = 2; // initial field count
  $(fieldButton).click(function(e) {
    e.preventDefault();
    n++; //text box increment
    var newField = $('<div class="refer-friend-field"><hr><div class="row row-tight"><div class="col-xs-6 col-md-5"><div class="form-group"><label class="control-label" for="first-name-' + n + '">First Name</label><input type="text" class="form-control" id="first-name-' + n + '" placeholder=""></div></div><div class="col-xs-6 col-md-5"><div class="form-group "><label class="control-label " for="email-' + n + '">Email Address</label><input type="email" class="form-control" id="email-' + n + '" placeholder=""></div></div><div class="col-xs-12 col-md-2 text-right"><a href="#" class="btn btn-default btn-sm remove-field">Remove</a></div></div></div>');
      $(fieldWrapper).append(newField); // add field
  });
  $(fieldWrapper).on("click",".remove-field", function(e) {
    e.preventDefault(); $(this).closest('.refer-friend-field').remove(); n--;
  })
});


// Josh, this isn't bulletproof. Click on mobile, go to desktop, 
// mouse over and out, come back to mobile, and it's out of sync.
// Figured it was close enough for prototyping though
$('.dropdown.menu-search .search-toggle').click(function() {
  if ($('#search-wrap').hasClass('search-open')) {
    $(this).addClass('thelab-soma-search-active');
  } else {
    $(this).removeClass('thelab-soma-search-active');
  }
});


// Wanted to demonstrate the signed in and signed out states on mobile. Figure
// this was the simplest way to get it out there.
$('#thelab-soma-mobile-sign-out').click(function() {
  $('.thelab-soma-mobile-logged-in').css('display', 'none');
  $('.thelab-soma-mobile-logged-out').css('display', 'block');
});
$('#thelab-soma-mobile-sign-in').click(function() {
  $('.thelab-soma-mobile-logged-in').css('display', 'block');
  $('.thelab-soma-mobile-logged-out').css('display', 'none');
});


// Soma wants tooltips in PDP product descriptions
// UPDATE: there's a tooltip in Bra Fit Guide; I modified this to work
// in both spots
$(function () {
  // Activate tooltips
  $('.soma-tooltip-trigger').tooltip();
  // Activate dismiss icon inside tooltips
  $('.soma-tooltip-trigger').parent().on('click', '.dismiss', function() {
    $(this).parent().parent().tooltip('hide');
  });
  // Close other tooltips
  // http://stackoverflow.com/questions/17274130/
  $('.soma-tooltip-trigger').on('show.bs.tooltip', function() {
      $('.tooltip').not(this).hide();
  });
});



// Bra Fit Guide: "Show More" link
$('.perfect-fit-copy .show-more').click(function(e) {
  e.preventDefault();
  $('.perfect-fit-copy').toggleClass('pf-show-less');
  $(this).hide();
});
$('.checklist-item').click(function() {
  $('.perfect-fit-copy').removeClass('pf-show-less');
  $('.show-more').hide();
});
  

// Bra Fit Guide: scroll to show accordion content
// If the bottom of the accordion is off the screen, scroll to let it in view.
$('.perfect-fit-copy').on('shown.bs.collapse', function() {
  var contentScrollTop = $('.perfect-fit-copy.in').offset().top + $('.perfect-fit-copy.in').height();
  var windowScrollTop = $(window).scrollTop() + $(window).height();

  if (contentScrollTop > windowScrollTop) {
    $('html,body').animate({
      scrollTop: $('.perfect-fit-copy.in').offset().top - $('#header-wrap').height() - 50
    }, 1000);
  }
})


// Bra Fit Guide: Video section overlay
// Needed a state that was in between the video playlist being loaded and a video
// actually being clicked. This makes everything go.
// $('.play-icon-overlay').click(function(e) {
//   $('.ready-and-unclicked').removeClass('ready-and-unclicked');
//   // The overlay is on the first video by default, so just activate the first tab
//   $('.bfg-playlist-item:first').addClass('active');
// });
// $('.video-collection a').click(function(e) {
//   $('.ready-and-unclicked').removeClass('ready-and-unclicked');
// });


// Bra Fit Guide: Video playlist height
// Need the video playlist to overflow at the same height as the video window,
// which will vary on resize.
$(window).on('load', sizePlaylist());
$(window).resize(function() { sizePlaylist(); });

function sizePlaylist() {
  if ($('.bfg-video-playlist').length > 0) {
    if ($(window).width() > 991) {
      var controlPosition = $('.bfg-video-window').find('.bfg-video-hook').first().height() + 'px';
    } else {
      var controlPosition = 'auto';
    }
    $('.bfg-video-playlist').css({'height': controlPosition});
  }
}


// Bra Fit Guide: Video playlist auto scroll
// On mobile, the playlist doesn't scroll, so if you click a video, have the 
// browser scroll to the video itself.
$('.bfg-playlist-item').click(function() {
  if ($(window).width() < 992) {
    $('html,body').animate({
      scrollTop: $('#bfg-video-yt-hook').offset().top - 50
    }, 1000);
  }
});


// // Bra Fit Guide: Video playlist active class
// $('.video-collection a').click(function() {
//   $('.video-collection a').removeClass('active');
//   $(this).addClass('active');
// })

// // Bra Fit Guide: Video play button script
// // Josh shared http://jsfiddle.net/BeUFb/
// // doesn't work anymore 
// // var tag = document.createElement('script');
// // tag.src = "//www.youtube.com/iframe_api";
// // var firstScriptTag = document.getElementsByTagName('script')[0];
// // firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

// var bfgVideo;

// onYouTubeIframeAPIReady = function () {
//   idToUse = $('.bfg-playlist-item:first').attr('data-yt-id');
//   bfgVideo = new YT.Player('bfg-video-yt-hook', {
//     height: '100%',
//     width: '100%',
//     videoId: idToUse,
//     playerVars: {
//       'autoplay': 0,
//       'rel': 0,
//       'showinfo': 0
//     },
//     events: {
//       'onStateChange': onPlayerStateChange
//     }
//   });
//   sizePlaylist();
// }

// onPlayerStateChange = function (event) {
//   if (event.data == YT.PlayerState.ENDED) {
//     $('.start-video').fadeIn('normal');
//   }
// }

// // $(document).on('click', '.play-icon-overlay', function () {
// //   $('.bfg-video-block').removeClass('ready-and-unclicked');
// //   bfgVideo.playVideo();
// // });

// $('.bfg-playlist-item').click(function(e) {
//   e.preventDefault();
//   var idToUse = $(this).attr('data-yt-id');
//   bfgVideo.cueVideoById(idToUse);
//   $('.bfg-video-block').addClass('ready-and-unclicked');
// });




// $('.filter-outer').on('click', '[data-toggle="filter-clear-all"]', function(e) {

// josh's YT swap
$('.bfg-video-block').on('click', '.bfg-playlist-item:not(".active")', function(e) {

  // $("a.download:not('.disablelink')").click(function (e) {

// $('.bfg-playlist-item').not('.bfg-playlist-item.active').click(function(e) {
  $(this).addClass('active');
  $(this).closest('.bfg-video-block').find('.bfg-playlist-item').not(this).removeClass('active');
  var videoSwap = $(this).data('yt-id');
  $(this).closest('.bfg-video-block').find('#bfg-video-yt-hook').attr('src', '//www.youtube.com/embed/' + videoSwap + '?autoplay=0&rel=0&showinfo=0');
  e.preventDefault();
});




// Bra Fit Guide: Bra Fit Calculator
// This was the minimal effort that I needed to put in to get Bootstrap Select
// working with bra fit calculator JS from the old design. I would recommend 
// giving it a serious vetting.
var measurements = [
  [26.5,31,"32A","32-A"],
  [26.5,32,"32B","32-B"],
  [26.5,33,"32C","32-C"],
  [26.5,34,"32D","32-D"],
  [26.5,35,"32DD","32-DD"],
  [26.5,36,"32DDD","32-DDD"],
  [26.5,37,"32G","32-G"],
  [26.5,31.5,"32A","32-A"],
  [26.5,32.5,"32B","32-B"],
  [26.5,33.5,"32C","32-C"],
  [26.5,34.5,"32D","32-D"],
  [26.5,35.5,"32DD","32-DD"],
  [26.5,36.5,"32DDD","32-DDD"],
  [26.5,37.5,"32G","32-G"],
  [27,31.5,"32A","32-A"],
  [27,32.5,"32B","32-B"],
  [27,33.5,"32C","32-C"],
  [27,34.5,"32D","32-D"],
  [27,35.5,"32DD","32-DD"],
  [27,36.5,"32DDD","32-DDD"],
  [27,37.5,"32G","32-G"],
  [27,32,"32A","32-A"],
  [27,33,"32B","32-B"],
  [27,34,"32C","32-C"],
  [27,35,"32D","32-D"],
  [27,36,"32DD","32-DD"],
  [27,37,"32DDD","32-DDD"],
  [27,38,"32G","32-G"],
  [27.5,32,"32A","32-A"],
  [27.5,33,"32B","32-B"],
  [27.5,34,"32C","32-C"],
  [27.5,35,"32D","32-D"],
  [27.5,36,"32DD","32-DD"],
  [27.5,37,"32DDD","32-DDD"],
  [27.5,38,"32G","32-G"],
  [27.5,32.5,"32A","32-A"],
  [27.5,33.5,"32B","32-B"],
  [27.5,34.5,"32C","32-C"],
  [27.5,35.5,"32D","32-D"],
  [27.5,36.5,"32DD","32-DD"],
  [27.5,37.5,"32DDD","32-DDD"],
  [27.5,38.5,"32G","32-G"],
  [28,32.5,"32A","32-A"],
  [28,33.5,"32B","32-B"],
  [28,34.5,"32C","32-C"],
  [28,35.5,"32D","32-D"],
  [28,36.5,"32DD","32-DD"],
  [28,37.5,"32DDD","32-DDD"],
  [28,38.5,"32G","32-G"],
  [28,33,"32A","32-A"],
  [28,34,"32B","32-B"],
  [28,35,"32C","32-C"],
  [28,36,"32D","32-D"],
  [28,37,"32DD","32-DD"],
  [28,38,"32DDD","32-DDD"],
  [28,39,"32G","32-G"],
  [28.5,33,"34A","34-A"],
  [28.5,34,"34B","34-B"],
  [28.5,35,"34C","34-C"],
  [28.5,36,"34D","34-D"],
  [28.5,37,"34DD","34-DD"],
  [28.5,38,"34DDD","34-DDD"],
  [28.5,39,"34G","34-G"],
  [28.5,33.5,"34A","34-A"],
  [28.5,34.5,"34B","34-B"],
  [28.5,35.5,"34C","34-C"],
  [28.5,36.5,"34D","34-D"],
  [28.5,37.5,"34DD","34-DD"],
  [28.5,38.5,"34DDD","34-DDD"],
  [28.5,39.5,"34G","34-G"],
  [29,33.5,"34A","34-A"],
  [29,34.5,"34B","34-B"],
  [29,35.5,"34C","34-C"],
  [29,36.5,"34D","34-D"],
  [29,37.5,"34DD","34-DD"],
  [29,38.5,"34DDD","34-DDD"],
  [29,39.5,"34G","34-G"],
  [29,34,"34A","34-A"],
  [29,35,"34B","34-B"],
  [29,36,"34C","34-C"],
  [29,37,"34D","34-D"],
  [29,38,"34DD","34-DD"],
  [29,39,"34DDD","34-DDD"],
  [29,40,"34G","34-G"],
  [29.5,34,"34A","34-A"],
  [29.5,35,"34B","34-B"],
  [29.5,36,"34C","34-C"],
  [29.5,37,"34D","34-D"],
  [29.5,38,"34DD","34-DD"],
  [29.5,39,"34DDD","34-DDD"],
  [29.5,40,"34G","34-G"],
  [29.5,34.5,"34A","34-A"],
  [29.5,35.5,"34B","34-B"],
  [29.5,36.5,"34C","34-C"],
  [29.5,37.5,"34D","34-D"],
  [29.5,38.5,"34DD","34-DD"],
  [29.5,39.5,"34DDD","34-DDD"],
  [29.5,40.5,"34G","34-G"],
  [30,34.5,"34A","34-A"],
  [30,35.5,"34B","34-B"],
  [30,36.5,"34C","34-C"],
  [30,37.5,"34D","34-D"],
  [30,38.5,"34DD","34-DD"],
  [30,39.5,"34DDD","34-DDD"],
  [30,40.5,"34G","34-G"],
  [30,35,"34A","34-A"],
  [30,36,"34B","34-B"],
  [30,37,"34C","34-C"],
  [30,38,"34D","34-D"],
  [30,39,"34DD","34-DD"],
  [30,40,"34DDD","34-DDD"],
  [30,41,"34G","34-G"],
  [30.5,35,"36A","36-A"],
  [30.5,36,"36B","36-B"],
  [30.5,37,"36C","36-C"],
  [30.5,38,"36D","36-D"],
  [30.5,39,"36DD","36-DD"],
  [30.5,40,"36DDD","36-DDD"],
  [30.5,41,"36G","36-G"],
  [30.5,35.5,"36A","36-A"],
  [30.5,36.5,"36B","36-B"],
  [30.5,37.5,"36C","36-C"],
  [30.5,38.5,"36D","36-D"],
  [30.5,39.5,"36DD","36-DD"],
  [30.5,40.5,"36DDD","36-DDD"],
  [30.5,41.5,"36G","36-G"],
  [31,35.5,"36A","36-A"],
  [31,36.5,"36B","36-B"],
  [31,37.5,"36C","36-C"],
  [31,38.5,"36D","36-D"],
  [31,39.5,"36DD","36-DD"],
  [31,40.5,"36DDD","36-DDD"],
  [31,41.5,"36G","36-G"],
  [31,36,"36A","36-A"],
  [31,37,"36B","36-B"],
  [31,38,"36C","36-C"],
  [31,39,"36D","36-D"],
  [31,40,"36DD","36-DD"],
  [31,41,"36DDD","36-DDD"],
  [31,42,"36G","36-G"],
  [31.5,36,"36A","36-A"],
  [31.5,37,"36B","36-B"],
  [31.5,38,"36C","36-C"],
  [31.5,39,"36D","36-D"],
  [31.5,40,"36DD","36-DD"],
  [31.5,41,"36DDD","36-DDD"],
  [31.5,42,"36G","36-G"],
  [31.5,36.5,"36A","36-A"],
  [31.5,37.5,"36B","36-B"],
  [31.5,38.5,"36C","36-C"],
  [31.5,39.5,"36D","36-D"],
  [31.5,40.5,"36DD","36-DD"],
  [31.5,41.5,"36DDD","36-DDD"],
  [31.5,42.5,"36G","36-G"],
  [32,36.5,"36A","36-A"],
  [32,37.5,"36B","36-B"],
  [32,38.5,"36C","36-C"],
  [32,39.5,"36D","36-D"],
  [32,40.5,"36DD","36-DD"],
  [32,41.5,"36DDD","36-DDD"],
  [32,42.5,"36G","36-G"],
  [32,37,"36A","36-A"],
  [32,38,"36B","36-B"],
  [32,39,"36C","36-C"],
  [32,40,"36D","36-D"],
  [32,41,"36DD","36-DD"],
  [32,42,"36DDD","36-DDD"],
  [32,43,"36G","36-G"],
  [32.5,37,"38A","38-A"],
  [32.5,38,"38B","38-B"],
  [32.5,39,"38C","38-C"],
  [32.5,40,"38D","38-D"],
  [32.5,41,"38DD","38-DD"],
  [32.5,42,"38DDD","38-DDD"],
  [32.5,43,"38G","38-G"],
  [32.5,37.5,"38A","38-A"],
  [32.5,38.5,"38B","38-B"],
  [32.5,39.5,"38C","38-C"],
  [32.5,40.5,"38D","38-D"],
  [32.5,41.5,"38DD","38-DD"],
  [32.5,42.5,"38DDD","38-DDD"],
  [32.5,43.5,"38G","38-G"],
  [33,37.5,"38A","38-A"],
  [33,38.5,"38B","38-B"],
  [33,39.5,"38C","38-C"],
  [33,40.5,"38D","38-D"],
  [33,41.5,"38DD","38-DD"],
  [33,42.5,"38DDD","38-DDD"],
  [33,43.5,"38G","38-G"],
  [33,38,"38A","38-A"],
  [33,39,"38B","38-B"],
  [33,40,"38C","38-C"],
  [33,41,"38D","38-D"],
  [33,42,"38DD","38-DD"],
  [33,43,"38DDD","38-DDD"],
  [33,44,"38G","38-G"],
  [33.5,38,"38A","38-A"],
  [33.5,39,"38B","38-B"],
  [33.5,40,"38C","38-C"],
  [33.5,41,"38D","38-D"],
  [33.5,42,"38DD","38-DD"],
  [33.5,43,"38DDD","38-DDD"],
  [33.5,44,"38G","38-G"],
  [33.5,38.5,"38A","38-A"],
  [33.5,39.5,"38B","38-B"],
  [33.5,40.5,"38C","38-C"],
  [33.5,41.5,"38D","38-D"],
  [33.5,42.5,"38DD","38-DD"],
  [33.5,43.5,"38DDD","38-DDD"],
  [33.5,44.5,"38G","38-G"],
  [34,38.5,"38A","38-A"],
  [34,39.5,"38B","38-B"],
  [34,40.5,"38C","38-C"],
  [34,41.5,"38D","38-D"],
  [34,42.5,"38DD","38-DD"],
  [34,43.5,"38DDD","38-DDD"],
  [34,44.5,"38G","38-G"],
  [34,39,"38A","38-A"],
  [34,40,"38B","38-B"],
  [34,41,"38C","38-C"],
  [34,42,"38D","38-D"],
  [34,43,"38DD","38-DD"],
  [34,44,"38DDD","38-DDD"],
  [34,45,"38G","38-G"],
  [34.5,38,"38A","38-A"],
  [34.5,39,"38B","38-B"],
  [34.5,40,"38C","38-C"],
  [34.5,41,"38D","38-D"],
  [34.5,42,"38DD","38-DD"],
  [34.5,43,"38DDD","38-DDD"],
  [34.5,44,"38G","38-G"],
  [34.5,38.5,"38A","38-A"],
  [34.5,39.5,"38B","38-B"],
  [34.5,40.5,"38C","38-C"],
  [34.5,41.5,"38D","38-D"],
  [34.5,42.5,"38DD","38-DD"],
  [34.5,43.5,"38DDD","38-DDD"],
  [34.5,44.5,"38G","38-G"],
  [35,38.5,"38A","38-A"],
  [35,39.5,"38B","38-B"],
  [35,40.5,"38C","38-C"],
  [35,41.5,"38D","38-D"],
  [35,42.5,"38DD","38-DD"],
  [35,43.5,"38DDD","38-DDD"],
  [35,44.5,"38G","38-G"],
  [35,39,"38A","38-A"],
  [35,40,"38B","38-B"],
  [35,41,"38C","38-C"],
  [35,42,"38D","38-D"],
  [35,43,"38DD","38-DD"],
  [35,44,"38DDD","38-DDD"],
  [35,45,"38G","38-G"],
  [35.5,39,"40A","40-A"],
  [35.5,40,"40B","40-B"],
  [35.5,41,"40C","40-C"],
  [35.5,42,"40D","40-D"],
  [35.5,43,"40DD","40-DD"],
  [35.5,44,"40DDD","40-DDD"],
  [35.5,45,"40G","40-G"],
  [35.5,39.5,"40A","40-A"],
  [35.5,40.5,"40B","40-B"],
  [35.5,41.5,"40C","40-C"],
  [35.5,42.5,"40D","40-D"],
  [35.5,43.5,"40DD","40-DD"],
  [35.5,44.5,"40DDD","40-DDD"],
  [35.5,45.5,"40G","40-G"],
  [36,39.5,"40A","40-A"],
  [36,40.5,"40B","40-B"],
  [36,41.5,"40C","40-C"],
  [36,42.5,"40D","40-D"],
  [36,43.5,"40DD","40-DD"],
  [36,44.5,"40DDD","40-DDD"],
  [36,45.5,"40G","40-G"],
  [36,40,"40A","40-A"],
  [36,41,"40B","40-B"],
  [36,42,"40C","40-C"],
  [36,43,"40D","40-D"],
  [36,44,"40DD","40-DD"],
  [36,45,"40DDD","40-DDD"],
  [36,46,"40G","40-G"],
  [36.5,40,"40A","40-A"],
  [36.5,41,"40B","40-B"],
  [36.5,42,"40C","40-C"],
  [36.5,43,"40D","40-D"],
  [36.5,44,"40DD","40-DD"],
  [36.5,45,"40DDD","40-DDD"],
  [36.5,46,"40G","40-G"],
  [36.5,40.5,"40A","40-A"],
  [36.5,41.5,"40B","40-B"],
  [36.5,42.5,"40C","40-C"],
  [36.5,43.5,"40D","40-D"],
  [36.5,44.5,"40DD","40-DD"],
  [36.5,45.5,"40DDD","40-DDD"],
  [36.5,46.5,"40G","40-G"],
  [37,40.5,"40A","40-A"],
  [37,41.5,"40B","40-B"],
  [37,42.5,"40C","40-C"],
  [37,43.5,"40D","40-D"],
  [37,44.5,"40DD","40-DD"],
  [37,45.5,"40DDD","40-DDD"],
  [37,46.5,"40G","40-G"],
  [37,41,"40A","40-A"],
  [37,42,"40B","40-B"],
  [37,43,"40C","40-C"],
  [37,44,"40D","40-D"],
  [37,45,"40DD","40-DD"],
  [37,46,"40DDD","40-DDD"],
  [37,47,"40G","40-G"],
  [37.5,40,"40A","40-A"],
  [37.5,41,"40B","40-B"],
  [37.5,42,"40C","40-C"],
  [37.5,43,"40D","40-D"],
  [37.5,44,"40DD","40-DD"],
  [37.5,45,"40DDD","40-DDD"],
  [37.5,46,"40G","40-G"],
  [37.5,40.5,"40A","40-A"],
  [37.5,41.5,"40B","40-B"],
  [37.5,42.5,"40C","40-C"],
  [37.5,43.5,"40D","40-D"],
  [37.5,44.5,"40DD","40-DD"],
  [37.5,45.5,"40DDD","40-DDD"],
  [37.5,46.5,"40G","40-G"],
  [38,40.5,"40A","40-A"],
  [38,41.5,"40B","40-B"],
  [38,42.5,"40C","40-C"],
  [38,43.5,"40D","40-D"],
  [38,44.5,"40DD","40-DD"],
  [38,45.5,"40DDD","40-DDD"],
  [38,46.5,"40G","40-G"],
  [38,41,"40A","40-A"],
  [38,42,"40B","40-B"],
  [38,43,"40C","40-C"],
  [38,44,"40D","40-D"],
  [38,45,"40DD","40-DD"],
  [38,46,"40DDD","40-DDD"],
  [38,47,"40G","40-G"],
  [38.5,41,"42A","42-A"],
  [38.5,42,"42B","42-B"],
  [38.5,43,"42C","42-C"],
  [38.5,44,"42D","42-D"],
  [38.5,45,"42DD","42-DD"],
  [38.5,46,"42DDD","42-DDD"],
  [38.5,47,"42G","42-G"],
  [38.5,41.5,"42A","42-A"],
  [38.5,42.5,"42B","42-B"],
  [38.5,43.5,"42C","42-C"],
  [38.5,44.5,"42D","42-D"],
  [38.5,45.5,"42DD","42-DD"],
  [38.5,46.5,"42DDD","42-DDD"],
  [38.5,47.5,"42G","42-G"],
  [39,41.5,"42A","42-A"],
  [39,42.5,"42B","42-B"],
  [39,43.5,"42C","42-C"],
  [39,44.5,"42D","42-D"],
  [39,45.5,"42DD","42-DD"],
  [39,46.5,"42DDD","42-DDD"],
  [39,47.5,"42G","42-G"],
  [39,42,"42A","42-A"],
  [39,43,"42B","42-B"],
  [39,44,"42C","42-C"],
  [39,45,"42D","42-D"],
  [39,46,"42DD","42-DD"],
  [39,47,"42DDD","42-DDD"],
  [39,48,"42G","42-G"],
  [39.5,42,"42A","42-A"],
  [39.5,43,"42B","42-B"],
  [39.5,44,"42C","42-C"],
  [39.5,45,"42D","42-D"],
  [39.5,46,"42DD","42-DD"],
  [39.5,47,"42DDD","42-DDD"],
  [39.5,48,"42G","42-G"],
  [39.5,42.5,"42A","42-A"],
  [39.5,43.5,"42B","42-B"],
  [39.5,44.5,"42C","42-C"],
  [39.5,45.5,"42D","42-D"],
  [39.5,46.5,"42DD","42-DD"],
  [39.5,47.5,"42DDD","42-DDD"],
  [39.5,48.5,"42G","42-G"],
  [40,42.5,"42A","42-A"],
  [40,43.5,"42B","42-B"],
  [40,44.5,"42C","42-C"],
  [40,45.5,"42D","42-D"],
  [40,46.5,"42DD","42-DD"],
  [40,47.5,"42DDD","42-DDD"],
  [40,48.5,"42G","42-G"],
  [40,43,"42A","42-A"],
  [40,44,"42B","42-B"],
  [40,45,"42C","42-C"],
  [40,46,"42D","42-D"],
  [40,47,"42DD","42-DD"],
  [40,48,"42DDD","42-DDD"],
  [40,49,"42G","42-G"],
  [40.5,42,"42A","42-A"],
  [40.5,43,"42B","42-B"],
  [40.5,44,"42C","42-C"],
  [40.5,45,"42D","42-D"],
  [40.5,46,"42DD","42-DD"],
  [40.5,47,"42DDD","42-DDD"],
  [40.5,48,"42G","42-G"],
  [40.5,42.5,"42A","42-A"],
  [40.5,43.5,"42B","42-B"],
  [40.5,44.5,"42C","42-C"],
  [40.5,45.5,"42D","42-D"],
  [40.5,46.5,"42DD","42-DD"],
  [40.5,47.5,"42DDD","42-DDD"],
  [40.5,48.5,"42G","42-G"],
  [41,42.5,"42A","42-A"],
  [41,43.5,"42B","42-B"],
  [41,44.5,"42C","42-C"],
  [41,45.5,"42D","42-D"],
  [41,46.5,"42DD","42-DD"],
  [41,47.5,"42DDD","42-DDD"],
  [41,48.5,"42G","42-G"],
  [41,43,"42A","42-A"],
  [41,44,"42B","42-B"],
  [41,45,"42C","42-C"],
  [41,46,"42D","42-D"],
  [41,47,"42DD","42-DD"],
  [41,48,"42DDD","42-DDD"],
  [41,49,"42G","42-G"],
  [41.5,43,"44A","44-A"],
  [41.5,44,"44B","44-B"],
  [41.5,45,"44C","44-C"],
  [41.5,46,"44D","44-D"],
  [41.5,47,"44DD","44-DD"],
  [41.5,48,"44DDD","44-DDD"],
  [41.5,49,"44G","44-G"],
  [41.5,43.5,"44A","44-A"],
  [41.5,44.5,"44B","44-B"],
  [41.5,45.5,"44C","44-C"],
  [41.5,46.5,"44D","44-D"],
  [41.5,47.5,"44DD","44-DD"],
  [41.5,48.5,"44DDD","44-DDD"],
  [41.5,49.5,"44G","44-G"],
  [42,43.5,"44A","44-A"],
  [42,44.5,"44B","44-B"],
  [42,45.5,"44C","44-C"],
  [42,46.5,"44D","44-D"],
  [42,47.5,"44DD","44-DD"],
  [42,48.5,"44DDD","44-DDD"],
  [42,49.5,"44G","44-G"],
  [42,44,"44A","44-A"],
  [42,45,"44B","44-B"],
  [42,46,"44C","44-C"],
  [42,47,"44D","44-D"],
  [42,48,"44DD","44-DD"],
  [42,49,"44DDD","44-DDD"],
  [42,50,"44G","44-G"],
  [42.5,44,"44A","44-A"],
  [42.5,45,"44B","44-B"],
  [42.5,46,"44C","44-C"],
  [42.5,47,"44D","44-D"],
  [42.5,48,"44DD","44-DD"],
  [42.5,49,"44DDD","44-DDD"],
  [42.5,50,"44G","44-G"],
  [42.5,44.5,"44A","44-A"],
  [42.5,45.5,"44B","44-B"],
  [42.5,46.5,"44C","44-C"],
  [42.5,47.5,"44D","44-D"],
  [42.5,48.5,"44DD","44-DD"],
  [42.5,49.5,"44DDD","44-DDD"],
  [42.5,50.5,"44G","44-G"],
  [43,44.5,"44A","44-A"],
  [43,45.5,"44B","44-B"],
  [43,46.5,"44C","44-C"],
  [43,47.5,"44D","44-D"],
  [43,48.5,"44DD","44-DD"],
  [43,49.5,"44DDD","44-DDD"],
  [43,50.5,"44G","44-G"],
  [43,45,"44A","44-A"],
  [43,46,"44B","44-B"],
  [43,47,"44C","44-C"],
  [43,48,"44D","44-D"],
  [43,49,"44DD","44-DD"],
  [43,50,"44DDD","44-DDD"],
  [43,51,"44G","44-G"],
  [43.5,44,"44A","44-A"],
  [43.5,45,"44B","44-B"],
  [43.5,46,"44C","44-C"],
  [43.5,47,"44D","44-D"],
  [43.5,48,"44DD","44-DD"],
  [43.5,49,"44DDD","44-DDD"],
  [43.5,50,"44G","44-G"],
  [43.5,44.5,"44A","44-A"],
  [43.5,45.5,"44B","44-B"],
  [43.5,46.5,"44C","44-C"],
  [43.5,47.5,"44D","44-D"],
  [43.5,48.5,"44DD","44-DD"],
  [43.5,49.5,"44DDD","44-DDD"],
  [43.5,50.5,"44G","44-G"],
  [44,44.5,"44A","44-A"],
  [44,45.5,"44B","44-B"],
  [44,46.5,"44C","44-C"],
  [44,47.5,"44D","44-D"],
  [44,48.5,"44DD","44-DD"],
  [44,49.5,"44DDD","44-DDD"],
  [44,50.5,"44G","44-G"],
  [44,45,"44A","44-A"],
  [44,46,"44B","44-B"],
  [44,47,"44C","44-C"],
  [44,48,"44D","44-D"],
  [44,49,"44DD","44-DD"],
  [44,50,"44DDD","44-DDD"],
  [44,51,"44G","44-G"]
];

$(document).ready(function() {

function generateBandOptions() {
    var bandSizeOption = "";
    var bandSizes = [];

    bandSizeOptions = "<option value=\"\">BAND SIZE</option>";
    for(var itr = 0;itr < measurements.length; itr++) {
      if(indexOf(bandSizes,measurements[itr][0]) == -1) {
         bandSizes.push(measurements[itr][0]);
      }
    }

    for(var itr = 0; itr < bandSizes.length; itr++) {
      // Putting option inside a div because I need a parent to print the innerHTML
      bandSizeOption = $("<div></div>").html($("<option></option>").attr("value",bandSizes[itr]).html(bandSizes[itr]+"&quot;"));
      bandSizeOptions += bandSizeOption.get(0).innerHTML;
    }

    $("#band").html(bandSizeOptions);

    $("#band").selectpicker();
    $('#band').on('change', function (e) {
      generateCupOptions();
      $('#cup').prop('disabled', false);
      $("#cup").selectpicker('refresh');
    });
}

$('#cup').on('change', function (e) {
  calculateBraSize();
});

function generateCupOptions(){
  var cupSizeOption;
  var cupSizes = [];

  cupSizeOptions = "<option value=\"\">CUP SIZE</option>";

  for(var itr=0; itr < measurements.length; itr++) {
      if(indexOf(cupSizes,measurements[itr][1]) == -1 && $("#band option:selected").val() == measurements[itr][0].toString()) {
          cupSizes.push(measurements[itr][1]);

      }
  }

  for(var itr = 0; itr < cupSizes.length; itr++) {
      cupSizeOption = $("<div></div>").html($("<option></option>").attr("value",cupSizes[itr]).html(cupSizes[itr]+"&quot;"));
      cupSizeOptions += cupSizeOption.get(0).innerHTML;
  }

  $("#cup").html(cupSizeOptions);

  $("#cup").selectpicker();
}

function calculateBraSize(){
    var disp;
    var sizes;
    var bandId;
    var cupId;

    for(var itr = 0; itr < measurements.length; itr++) {
      if(measurements[itr][0] == $("#band").val() && measurements[itr][1] == $("#cup").val()) {
        $(".size").html(measurements[itr][2]);
        sizes = measurements[itr][3].split("-");
        bandId = sizes[0];
        cupId = sizes[1];
      }
    }
    if($("#band").val() != "" && $("#cup").val()) {
      $(".shop-your-size").attr("href","/store/category/bras/cat40089?Ntk=Cup_Sizes|Band_Sizes&Ntt="+cupId+"|"+bandId+"&Nty=1&D=A&icid=LP-BFD-ShopYourSize-"+bandId+cupId);
      $(".show-size").show();
    } else {
      $(".show-size").hide();
    }
}

function indexOf(arr, obj){
    var start = arguments[2] == null ? 0 : arguments[2];
    for(var i=start; i<arr.length; i++){
        if(arr[i]==obj){
            return i;
        }
    }
    return -1;
}

generateBandOptions();
generateCupOptions();

});







// // Soma Glossary
// $('.glossary-def').collapse('hide');
// $('.glossary-term').click(function() {
//   // Remove classes; we'll re-add if they should still be visible
//   $('.glossary-term').not($(this)).next().collapse('hide');
//   $('.glossary-def-visible').removeClass('glossary-def-visible');
//   $('.glossary-panel-alpha').removeClass('active');

//   // Add a class to the clicked definition and to the parent letter block ('1-9', etc.)
//   if ($(this).attr('aria-expanded') == 'false') {
//     $(this).parent().addClass('glossary-def-visible');
//     $(this).parents('.glossary-panel-alpha').addClass('active');
//   }
// });
// $('.glossary-terms').collapse('hide');
// $('.glossary-heading-alpha').click(function() {
//   $('.glossary-heading-alpha').not($(this)).attr('aria-expanded','false');
//   $('.glossary-heading-alpha').not($(this)).next().collapse('hide');
// });




// For e-mail signup page - show modal on page load
$(document).ready(function() {
  if ($('#email-modal').length > 0) {
    $('#email-modal').modal('show');
  }
});



// Give Bras: Collapse logic
// Since this isn't structured like a typical accordion but needs to act like one
$('.survivor-full-story').collapse('hide');

$('.full-story-link').click(function(e) {
  e.preventDefault();
  var dest = $(this).attr('href');
  $('.survivor-full-story').not(dest).collapse('hide');
  $(dest).collapse('show');
});

$('.survivor-full-story .close, .survivor-full-story .close-text').click(function(e) {
  $(this).parents('.survivor-full-story').collapse('hide');
});


// Give Bras: Toggle Give/Thank You sections
$('.gb-cta-ish a').click(function(e){
  e.preventDefault();
  $('.soma-gb-text-under-sh').hide();
  $('.soma-gb-thank-you-text').show();
  $('.donating-a-bra').hide();
  $('.soma-gb-text').hide();
});