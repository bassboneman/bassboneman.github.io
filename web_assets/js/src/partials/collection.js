// special collection click label
$(document).scroll(function() {
  if ($('.c-sp-wrap').length > 0) {
    if ($(window).scrollTop() > $('.c-sp-wrap').offset().top) {
      $('.c-sp-click').removeClass('click-hidden');
    } else {
      $('.c-sp-click').addClass('click-hidden');
    }
  }
});

// equalize heights of charity divs
$(window).on('load resize', function() {
  if ($(window).width() > 991) {
    var charityHeight = 0;
    $('.module-charity').each(function(){
       if ($(this).height() > charityHeight) { charityHeight = $(this).height(); }
    });
    $('.module-charity').height(charityHeight);
  }
});

// collection carousel
// first slide to have a shorter interval
var timeout, interval;
$('.carousel-collection').hover(function() {
  var thisCarousel = $(this);
  timeout = setTimeout(function() {
    thisCarousel.carousel('next');
    continueCarousel(thisCarousel);
  }, 500);
}, function () {
  $(this).carousel(0);
  $(this).carousel('pause');
  clearTimeout(timeout);
  clearInterval(interval);
});
function continueCarousel(thisCarousel) {
  interval = setInterval(function () {
    thisCarousel.carousel('next');
  }, 2500);
}
