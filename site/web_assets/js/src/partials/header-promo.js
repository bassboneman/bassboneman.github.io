$(function() {
  $('#header-promo [data-toggle="modal"]').on('click',function(e){
    e.preventDefault();
  });
});

// equalize header promo carousel height
function carouselNormalization() {
  var promoItems = $('#promo-carousel .item'), // grab all slides
  heights = [], // create empty array to store height values
  tallest; // create variable to make note of the tallest slide

  if (promoItems.length) {
    function normalizeHeights() {
      promoItems.each(function() { //add heights to array
        heights.push($(this).height()); 
      });
      tallest = Math.max.apply(null, heights); //cache largest value
      promoItems.each(function() {
        $(this).css('min-height',tallest + 'px');
      });
    };
    normalizeHeights();
    $(window).on('resize orientationchange', function () {
      tallest = 0, heights.length = 0; // reset vars
      promoItems.each(function() {
        $(this).css('min-height','0'); // reset min-height
      }); 
      normalizeHeights(); // run it again 
    });
  }
}

var promoWrap = $('#header-promo-wrap');
var promo = $('#header-promo');
var promoInner = $('#header-promo-inner');
var promoCarousel = $('#promo-carousel');
var promoToggle = $('#promo-carousel');

// show promo on page load for 5 seconds. requires .autopromo body class
var autoPromoWrap = $('.autopromo #header-promo-wrap');
var autoPromo = $('.autopromo #header-promo');
var autoPromoInner = $('.autopromo #header-promo-inner');
var autoPromoCarousel = $('.autopromo #promo-carousel');
var autoPromoToggle = $('.autopromo #promo-carousel');
var promoTimer;


function revealPromo() {
  $(promoWrap).addClass('promo-open');
  $(promo).slideDown(400, function(){
    $(promoInner).animate(
      {opacity: 1},
      {duration: 400}
    );
  });
  $(promoCarousel).carousel('pause');
  $(promoToggle).attr('aria-expanded', 'true');
  carouselNormalization();
  console.log('promo is open');
}
function revealAutoPromo() {
  $(autoPromoWrap).addClass('promo-open');
  $(autoPromo).slideDown(400, function(){
    $(autoPromoInner).animate(
      {opacity: 1},
      {duration: 400}
    );
  });
  $(autoPromoCarousel).carousel('pause');
  $(autoPromoToggle).attr('aria-expanded', 'true');
  carouselNormalization();
  console.log('auto promo is open');
}
function hidePromo() {
  $(promoWrap).removeClass('promo-open');
  $(promo).slideUp(400, function(){
    $(promoInner).animate(
      {opacity: 0},
      {duration: 400}
    );
  });
  $(promoCarousel).carousel('cycle');
  $(promoToggle).attr('aria-expanded', 'false');
  carouselNormalization();
  console.log('promo is closed');
}


// show promo on click
$(function() {
  $('#page-wrap').on('click', '[data-toggle="header-promo"], #promo-carousel .carousel-indicators li', function(e) {
    $('#header-promo-wrap').toggleClass('promo-open');
    if ($('#header-promo').is(":visible")) {
      hidePromo();
    } else {
      revealPromo();
    }   
    e.preventDefault();
  });
});

function stopPromoTimer() {
  clearTimeout(promoTimer);
}
function resumePromoTimer() {
  promoHideTimer = setTimeout(function(){
    hidePromo();
  }, 2000);
}
function startPromoTimer() {
  // open promo carousel
  revealAutoPromo();
  // now close after 5 seconds
  promoTimer = setTimeout(function(){
    hidePromo();
  }, 5000);
}

// prevent close on hover or tap
$(autoPromoWrap).on('mouseenter tap touchstart', stopPromoTimer);
// close on mouseleave
$(autoPromoWrap).on('mouseleave', resumePromoTimer);

$(window).load(function() {
  startPromoTimer();
}); 