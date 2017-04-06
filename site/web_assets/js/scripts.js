// header variables
var menuBag = $('.menu-bag > a');
var bag = $('#persistent-cart');
var timer;
var searchWrap = $('#search-wrap');
var headerWrap = $('#header-wrap');
var searchToggleWrap = $('.search-toggle-wrap');
var searchDataToggle = $('[data-toggle="search"]');
var cartToggle = $('[data-toggle="persistent-cart"]');
var cartClose = $('[data-toggle="close-cart"]');

// header functions
function stopTimer(){
  clearTimeout(timer);
  $(bag).addClass('open');
}
function resumeTimer(){
  $(bag).removeClass('open');
}
function startTimer(){
  $('.modal-pdp').modal('hide');
  $(bag).addClass('open');
  timer = setTimeout(function(){
    $(bag).removeClass('open');
  }, 5000);
}
function unbindHover() {
  $(bag).removeClass('open');
  return false;
}
function searchToggle() {
  $(searchWrap, headerWrap).toggleClass('search-open');
  $(searchToggleWrap).toggleClass('search-toggle-open');
  $(searchWrap).fadeToggle(200);
  if ($('.search-toggle').attr('aria-expanded') == 'false') {
    $(searchDataToggle).attr('aria-expanded', 'true');
  } else {
    $(searchDataToggle).attr('aria-expanded', 'false');
  }
  hideDropdowns();
  return false;
}
function hideSearch() {
  $(searchWrap, headerWrap).removeClass('search-open');
  $(searchToggleWrap).removeClass('search-toggle-open');
  $(searchWrap).fadeOut(200);
  $(searchDataToggle).attr('aria-expanded', 'false');
  return false;
}
function openCart() {
  startTimer();
  hideDropdowns();
}

function hideDropdowns() {
  $('.dropdown').removeClass('open');
  $('.dropdown a').attr('aria-expanded', 'false');
}

$(menuBag).on('mouseenter', function() {
  var width = $(window).width();
  if (width > 1024){
    var cartDelay=500, setTimeoutConst;
    etTimeoutConst = setTimeout($.proxy(function() {
      openCart();
    }, menuBag), cartDelay);
  }
});

$(cartToggle).on('click', openCart);
$(bag).on('mouseenter tap touchstart', stopTimer);
$(bag).on('mouseleave', resumeTimer);
$(cartClose).on('click', unbindHover);
$(headerWrap).on('click', '[data-toggle="search"]', searchToggle);

// remove cart if user clicks outside element
$(document).mouseup(function(e) {
  var container = $('#persistent-cart.open');
  if (!container.is(e.target) && container.has(e.target).length === 0) {
    container.removeClass('open');
  }
});

// hide mobile cart modal if larger than 767
$(window).on('resize', function() {
  if ($(window).width() > 767) {
    $('#persistent-mobile').modal('hide')
  }
});


var offCanvasDataToggle = $('[data-toggle="offcanvas"]');
function offCanvasToggle() {
  $('html, body').toggleClass('offcanvas-open');
  $('#menu').toggleClass('offcanvas-menu');
  $('.offcanvas-overlay').toggleClass('open');
  $('body').toggleClass('offcanvas-closed');
  $('#menu-utility .menu-toggle-inner').toggleClass('open'); // menu bars to "x"
  return false;
}
$(offCanvasDataToggle).on('click', offCanvasToggle);

// fix scrolling issue when multiple nested modals have been opened
$(document).on('hidden.bs.modal', '.modal', function () {
  $('.modal:visible').length && $(document.body).addClass('modal-open');
});

// trigger popovers
$(function () {
  $('[data-toggle="popover"]').popover();
});
$(function () {
  $('[data-toggle="tooltip"]').tooltip();
});

// autotab phone fields
$('.number').autotab('number');

// product image gallery modal
if ($(window).height() < 1000) {
  $(window).on('load resize', function(){
    var thumbHeight = $(window).height() * 0.25 -9;
    $('.zoom-main #product-img').css({'max-height':$(window).height()+'px'});
    $('.zoom-thumbs img').css({'max-height': thumbHeight +'px'});
  });
}

// swipe carousel on touch devices
$('.carousel').not('.noswipe').swiperight(function() {  
  $(this).carousel('prev');  
});  
$('.carousel').not('.noswipe').swipeleft(function() {  
  $(this).carousel('next');  
});

// open map tab pane with icon map pin click
$('#open-map-pane').click(function() {
  $('#store-locator-tabs a[href="#map-view"]').tab('show');
});

// prevent certain dropdowns from closing on click within dropdown
$('#utility .dropdown-menu, #menu .dropdown-menu .form-control, #menu .dropdown-menu button, .filter-list .dropdown-menu').click(function(e) {
  e.stopPropagation();
});

if ($(window).width() > 991) {
  // $('.menu-bag, #menu .dropdown').on('mouseenter', function() {
  $('#menu .dropdown').on('mouseenter', function() {
    // var bagDropdown = $('#persistent-cart');
    $('.dropdown').not(this).removeClass('open');
  });
}

// make header sticky once it reaches window top
$(function () {
  var top = $('#header').offset().top;
  $(window).scroll(function (event) {
    var y = $(this).scrollTop();
    if (y >= top) {
      $('body').addClass('sticky');
      $('#header-promo').slideUp(400);
      $('#header-promo-wrap').removeClass('promo-open');
    } else {
      $('body').removeClass('sticky');
    }
  });
});

function isTouchEnabled() {
  return ('ontouchstart' in window);
}

// toggle classes on window resize so dropdowns and menus work properly on all devices
function resize() {
  if ($(window).width() > 991) {
    $('html, body').removeClass('offcanvas-open');
    $('#menu').removeClass('offcanvas-menu');
    $('body').addClass('offcanvas-closed');
    $('.dropdown, .offcanvas-overlay').removeClass('open');
    $('.menu-toggle-inner').removeClass('open');
    $('.filter-list-wrap').addClass('filter-desktop').removeClass('open'); // toggles between click/hover on filter dropdowns
  }
  //FLXW-780: New nav close button. This hides the close button on non-touch devices.
  if (isTouchEnabled() && $(window).width() >= 1024) {
    $('#menu .btn-close-panel').attr('style','display:inline-block !important;');
  } else {
    $('#menu .btn-close-panel').attr('style','display:none !important;');
  }
}
$(window).resize(resize);
resize();

// prevent first clicks on iPads with the desktop menu view
var iPadPortrait = window.matchMedia('(min-width: 768px) and (max-width: 1024px)');
var iPadProPortrait = window.matchMedia('(min-width: 1024px) and (max-width: 1366px)');
if ((iPadPortrait.matches) || (iPadProPortrait.matches)) {
  $('#menu .dropdown a.top-nav-cat').one('click', function(e) {
    e.preventDefault();
  });
}
$('html').on('mouseenter', '.offcanvas-closed #menu .dropdown', function () {
  $(this).addClass('open');
  $('#menu .dropdown').not(this).toggleClass('menu-inactive');
  $('#search-wrap').hide(); // close search anytime a main menu panel is opened
  resumeTimer();
});
$('html').on('mouseleave', '.offcanvas-closed #menu .dropdown', function () {
  $(this).removeClass('open');
  $('#menu .dropdown').not(this).removeClass('menu-inactive');
  resumeTimer();
});
$(window).on('load resize', function() {
  if ($(window).width() > 991) {
    $('#menu .dropdown-menu, .filter-list-wrap .dropdown-menu').removeAttr('style'); // needed to get rid of the inline diplay: none needed on mobile #menu dropdown
    $('html').on('mouseenter', '.filter-list-wrap .dropdown', function () {
      $(this).addClass('open');
    });
    $('html').on('mouseleave', '.filter-list-wrap .dropdown', function () {
      $(this).removeClass('open');
    });
  }
});
// but set a delay on viewing
$(function() {
  var delay=500, setTimeoutConst;
  $('#menu, .filter-wrap').hover(function() {
    setTimeoutConst = setTimeout($.proxy(function() {
      $(this).addClass('hover');
    }, this), delay);
  }, function() {
    clearTimeout(setTimeoutConst);
    $(this).removeClass('hover');
  });
});

// close button in menu and filter panels (we're not removing the .hover class on the parent as this screws everything up on touch devices)
$('[data-close="menu-panel"]').click(function(e) {
  $(this).closest('.dropdown').removeClass('open');
  $('#menu .dropdown').not(this).removeClass('menu-inactive');
  e.preventDefault();
});

$('html').on('click', '.offcanvas-open .offcanvas-menu .dropdown', function(e) {
  var menuActive = $(this);
  var menuInactive = $('.dropdown').not(this);
  var submenuActive = $(this).find('.dropdown-menu');
  var submenuInactive = $('.dropdown').not(this).find('.dropdown-menu');
  $(menuActive).toggleClass('active'); // removed open from mobile toggle as it interferes with the slideToggle
  $(menuInactive).removeClass('active');
  $(submenuInactive).hide();
  $(submenuActive).toggle();
  var path = $(menuActive).attr('id');
  var anchor = $("#" + path);
  var position = anchor.position().top + $('#menu').scrollTop();
  $('#menu').animate({scrollTop: position});
  e.preventDefault();
});

$('.offcanvas-overlay').click(function() {
  $('html, body').toggleClass('offcanvas-open');
  $('#menu').toggleClass('offcanvas-menu');
  $(this).toggleClass('open');
  $('body').toggleClass('offcanvas-closed');
  $('#menu-utility .menu-toggle-inner').toggleClass('open'); // menu bars to "x"
});

// equalize header promo carousel height
function carouselNormalization() {
  var promoItems = $('#promo-carousel .item'), //grab all slides
  heights = [], //create empty array to store height values
  tallest; //create variable to make note of the tallest slide

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
      tallest = 0, heights.length = 0; //reset vars
      promoItems.each(function() {
        $(this).css('min-height','0'); //reset min-height
      }); 
      normalizeHeights(); //run it again 
    });
  }
}

$(function() {
  $('#page-wrap').on('click', '[data-toggle="header-promo"], #promo-carousel .carousel-indicators li', function(e) {
    $('#header-promo-wrap').toggleClass('promo-open');
    if ($('#header-promo').is(":visible")) {
      $('#header-promo').slideUp(400);
      $('#header-promo-inner').animate(
        {opacity: 0},
        {duration: 400}
      );
      $('#promo-carousel').carousel('cycle');
      $('[data-toggle="header-promo"]').attr('aria-expanded', 'false');
    } else {
      $('#header-promo').slideDown(400, function(){
        $('#header-promo-inner').animate(
          {opacity: 1},
          {duration: 400}
        );
      });
      $('#promo-carousel').carousel('pause');
      $('[data-toggle="header-promo"]').attr('aria-expanded', 'true');
      carouselNormalization();
    }   
    e.preventDefault();
  });
});

$('.footer-menu-toggle').click(function() {
  $(this).next('ul').toggle();
  $(this).toggleClass('open');
  $('.footer-menu-toggle').not(this).next('ul').hide();
  $('.footer-menu-toggle').not(this).removeClass('open');
});

$('.swatch').click(function() {
  $(this).addClass('selected');
  $(this).closest('.swatch-wrap').find('.swatch').not(this).removeClass('selected');
  var imgSwap = $(this).find('img').data('imgswap');
  $(this).closest('.product').find('.product-thumb-wrap img.img-swap').attr('src', imgSwap);
});

$(document).on('click', '[data-toggle="c-sp-toggle"]', function (e) {
  var thisParentModule = $(this).parents('.module-sh');
  $('.c-sp-link').closest('.module-sh').not(thisParentModule).removeClass('open');
  $(this).closest('.module-sh').toggleClass('open');
  e.preventDefault();
});
$(document).on('click', '.close-wrap [data-toggle="c-sp-toggle"]', function (e) {
  $(this).closest('.module-sh').removeClass('open');
  e.preventDefault();
});

$(window).on('load resize', function() {
  var arrowPos = $('.carousel-lg').width() * 0.5;
  var arrowPosAbout = $('.carousel-about img').height() * 0.5;
  var arrowPosProfile = $('.carousel-profile .profile-img img').height() * 0.5;
  var arrowPosPromo = $('#carousel-footer img').height() * 0.5 + 33;
  var arrowPosAlign = $('[data-carousel="align-arrows"] img').height() * 0.5;
  var arrowPosAlignMobile = $('[data-carousel="align-arrows-mobile"]').width() * 0.5;

  var arrows = $('[data-carousel="align-arrows"] [class*="icon-arrow"]');
  var arrowsMobile = $('[data-carousel="align-arrows-mobile"] [class*="icon-arrow"]');
  if ($(window).width() < 768) {
    $('.carousel-lg [class*="icon-arrow"]').css({'top': arrowPos + 'px'});
    $('.carousel-about [class*="icon-arrow"]').removeAttr('style'); // remove inline css
    $(arrowsMobile).css({'top': arrowPosAlignMobile + 'px'});
    // console.log(arrowPosAlignMobile);
  }
  if ($(window).width() > 767) {
    $('.carousel-lg [class*="icon-arrow"]').removeAttr('style'); // remove inline css
    $('.carousel-about [class*="icon-arrow"]').css({'top': arrowPosAbout + 'px'});
    $(arrowsMobile).removeAttr('style'); // remove inline css
  }
  if ($(window).width() > 1) {
    $('.carousel-profile [class*="icon-arrow"]').css({'top': arrowPosProfile + 'px'});
    $('#carousel-footer [class*="icon-arrow"]').css({'top': arrowPosPromo + 'px'});
  }
  $(arrows).css({'top': arrowPosAlign + 'px'});
});

// make filters appear on hover on desktop...
// $('html').on('mouseenter mouseleave click', '.filter-tools .filter-desktop .dropdown', function () {
//   $(this).toggleClass('open');
// });
// // ...and on click on mobile
// $('html').on('click', '.filter-tools.open .dropdown', function(e) {
//   e.preventDefault();
// });

// open filter tools on smaller devices
$('[data-toggle="filter-tools"]').on('click', function(e) {
  $('.filter-list-wrap').toggleClass('open').removeClass('filter-desktop'); // for toggle vs. hover
  $('html, body').toggleClass('filters-open');
  e.preventDefault();
});

function insert() {
  var name = $("input[name='insertvalue']").val();
  if (name!=''){
    var toinsert = true;
    $("ol.thelist > li").each(function() {
      var item = $(this).html();
      if (name.toUpperCase() < item.toUpperCase()) {
        if (toinsert){
          $(this).before(''+name+'');
          toinsert = false;
        }
      }
    });
    if(toinsert){
      $("ol.thelist").append(''+name+'');
    }
    $("input[name='insertvalue']").val('')
  }
}

function filterSelect(e) {
  var dropdownParent = $(this).closest('.dropdown');
  var filterName = $(this).data('name');
  var filterCat = $(this).data('type');
  if ($(this).data('name') == 'all') {
    $(dropdownParent).find('[data-toggle="filter-selector"]').each(function(e) {
      $(dropdownParent).find('[data-toggle="filter-selector"]').removeClass('selected');
      $(dropdownParent).removeClass('dropdown-selected');
      $('.filter-tags').find('[data-type=\''+filterCat+'\']').remove();
    });
    $(this).addClass('selected');
  } else {
    if ($('.filter-tags').find('.filter-tag[data-name="' + filterName + '"]').length == 0) {
      $('.filter-tags').append('<a href="#" class="filter-tag" data-type="' + filterCat + '" data-name="' + filterName + '">' + filterCat + ': ' + filterName + ' <svg class="icon-close"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-close"></use></svg></a>');
    } else {
      $('.filter-tag[data-name="' + filterName + '"]').remove();
    }
    $(dropdownParent).find('[data-toggle="filter-selector-all"]').removeClass('selected');
    $(this).toggleClass('selected');
    $(dropdownParent).addClass('dropdown-selected');
    $('.filter-clear').removeClass('hidden');
    if ($(dropdownParent).find('[data-toggle="filter-selector"].selected').length == 0) {
      $(dropdownParent).removeClass('dropdown-selected');
      $(dropdownParent).find('[data-toggle="filter-selector-all"]').addClass('selected');
    }
  }
  if ($('.filter-tag').length == 0) {
    $('.filter-clear').addClass('hidden');
  }
  e.preventDefault();
}
$('.selector-toggle').not('.disabled').click(filterSelect);

// clear all
$('.filter-outer').on('click', '[data-toggle="filter-clear-all"]', function(e) {
  $('.filter-list').find('[data-toggle="filter-selector"]').removeClass('selected');
  $('.filter-list li').removeClass('dropdown-selected');
  $('.filter-tag').remove();
  $('.filter-tags-wrap [data-toggle="filter-clear-all"]').addClass('hidden');
  $('[data-toggle="filter-selector-all"]').addClass('selected');
  e.preventDefault();
});

// remove filters when main selector is changed
$('.filter-outer').on('change', '#filter-cats', function(e) {
  $('.filter-clear').addClass('hidden');
  $('.filter-tag').remove();
  $('.filter-list').find('[data-toggle="filter-selector"]').removeClass('selected');
  $('.filter-list li').removeClass('dropdown-selected');
});

// remove individual filters
function filterRemove(e) {
  var tagNameRemove = $(this).data('name');
  var tagTypeRemove = $(this).data('type');
  $(this).remove();
  $('.filter-list').find('[data-name="' + tagNameRemove + '"]').removeClass('selected');
  if ($('.filter-tag').length == 0) {
    $('.filter-clear').addClass('hidden');
    $('.filter-list').find('[data-toggle="filter-selector-all"]').addClass('selected');
  }
  if ($('.filter-tag[data-type="' + tagTypeRemove + '"]').length == 0) {
    $('.filter-list').find('[data-type="' + tagTypeRemove + '"]').closest('li').removeClass('dropdown-selected');
    $('.filter-list').find('[data-name="all"][data-type="' + tagTypeRemove + '"]').addClass('selected');
  }
  e.preventDefault();
}
$('.filter-outer').on('click', '.filter-tag', filterRemove);

// toggle dropdown-menu using close icon
// no longer needed as the dropdown is initiated on hover
// $('[data-toggle="filter-toggles"]').dropdown();

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

// typeahead
var substringMatcher = function(strs) {
  return function findMatches(q, cb) {
    var matches, substringRegex;
    // an array that will be populated with substring matches
    matches = []; 
    // regex used to determine if a string contains the substring `q`
    substrRegex = new RegExp(q, 'i'); 
    // iterate through the pool of strings and for any string that
    // contains the substring `q`, add it to the `matches` array
    $.each(strs, function(i, str) {
      if (substrRegex.test(str)) {
        matches.push(str);
      }
    });

    cb(matches);
  };
};
var placeholders = ['Pants', 'Shirts', 'Dresses', 'Collection', 'Zenergy', 'Black Label', 'Jeans', 'Sweaters', 'Knits'];
$('#search .typeahead').typeahead({
  hint: true,
  highlight: true,
  minLength: 1
},
{
  name: 'placeholders',
  source: substringMatcher(placeholders)
});

// show scroll top element
if ($(window).width() > 1024) {
  $(document).scroll(function() {
    var y = $(this).scrollTop();
    if (y > 800) {
      $('.top-link').fadeIn();
    } else {
      $('.top-link').fadeOut();
    }
  });
}
$(function() {
  $('a[href*=#curated-], a[href=#page-wrap], a[href*=#section-], a[href*=#charity-]').click(function() {
    if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
      if (target.length) {
        $('html,body').animate({
          scrollTop: target.offset().top
        }, 1000);
        return false;
      }
    }
  });
});

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

// $('.modal-video').on('hidden.bs.modal', function () {
//   $('.modal-video iframe').attr('src', $('.modal-video iframe').attr('src'));
// });

// hotspots
// show/hide collections
$('[data-toggle="collection-grid"]').on('click', function(e) {
  $(this).toggleClass('expanded');
  $(this).closest('.collection-group').find('.collection').slideToggle();
  e.preventDefault();
});

// taken from the lab's js
$('.style-note').click(function () {
  var hotspotOffset = $(this).offset();
  var hotspotPosition = $(this).position();
  var hotspotWidth = $(this).width();
  var moduleOffset = $(this).parents('section.module').offset();
  var moduleWidth = $(this).parents('section.module').width();
  var tooltipWidth = 320; // $(this).next().width();
  var left = hotspotPosition.left + 50;
  var top = hotspotPosition.top;
  var bottom = 'auto';
  var margin = 'auto';
  var width = '310px';
  if ($(window).width() <= 688) {
    left = 'auto';
    top = 'auto';
    bottom = 0;
    margin = '0 5% 10px';
    width = '90%';
  } else {
    if ((hotspotOffset.left + hotspotWidth + tooltipWidth) > (moduleOffset.left + moduleWidth)) {
      if (hotspotOffset.left > tooltipWidth) {
        left = hotspotPosition.left - tooltipWidth;
      } else {
        // Shouldn't need this anymore now that we have that 688 check, but
        // leaving it in as a catchall
        left = 'auto';
        top = 'auto';
        bottom = 0;
        margin = '0 5% 10px';
        width = '90%';
      }
    }
  }
  $(this).nextAll('.style-note-tooltip').first().css({
    top: top, 
    bottom: bottom, 
    left: left,
    margin: margin,
    width: width
  });
  $('.style-note-tooltip.in').collapse('hide');
  $(this).nextAll('.style-note-tooltip').first().collapse('toggle');
})

$('.style-note-tooltip .dismiss').click(function () {
  $('.style-note-tooltip.in').collapse('hide');
});

$(window).resize(function() {
  $('.style-note-tooltip.in').collapse('hide');
});

// shop by look
$('.select-size').change(function() {
  if ($(this).find('select')[0].value !== '') {
    $(this).closest('.product-wrap').find('.item-selected-checkbox').removeClass('item-deselected initial-hide');
    $(this).closest('.product-wrap').find('.item-selected-checkbox input').prop('checked', true).attr('disabled', false);
    $('.shop-footer-wrap').removeClass('hide-footer');
  } else {
    $(this).closest('.product-wrap').find('.item-selected-checkbox').addClass('item-deselected');
    $(this).closest('.product-wrap').find('.item-selected-checkbox input').prop('checked', false).attr('disabled', true);
  }
});

$('.item-selected-checkbox input').change(function() {
  $(this).closest('.item-selected-checkbox').addClass('item-deselected');
  $(this).attr('disabled', true);
  $(this).closest('.product-wrap').find('.select-size select').val('');
  $(this).closest('.product-wrap').find('.select-size button .filter-option').html('Select Size');
  $(this).closest('.product-wrap').find('.select-size button').prop('title', 'Select Size');
});

// filter crumbs
var filterTagObject = [];
function buildTags() {
  $(filterTagObject).each(function(index, value) {
    $(value.actives).each(function(index, activesValue) {
      var newTag = buildTag(value.name, activesValue.filterName, activesValue.matchedElement);
      // Add filter tag to the page
      $('.filter-tags').append(newTag);
      // When a tag is added, clear all needs to become a thing
      $('.filter-clear').removeClass('hidden');    
    });
  });
}
buildTags();

// youtube modal: autoplay on open, stop on close
$(function() {
  $('.modal-video').on('shown.bs.modal', function(e) {
    var src = $(this).find('iframe').attr('data-iframe-src');
    $(this).find('iframe').attr('src', src);
  });
  $('.modal-video').on('hidden.bs.modal', function(e) {
    $(this).find('iframe').attr('src', '');
  });
});

// youtube modal: open on page load, requires click to play
$(function() {
  $('.video-overlay').on('click', function(e) {
    var src2 = $('#video-wrapper-pageload').find('iframe').attr('data-iframe-src');
    $('#video-wrapper-pageload').show();
    $('#video-wrapper-pageload').find('iframe').attr('src', src2);
    $(this).hide();
    e.preventDefault();
  });
  $('#modal-video-pageload').on('hidden.bs.modal', function(e) {
    $('#video-wrapper-pageload').hide();
    $('#video-wrapper-pageload').find('iframe').attr('src', '');
    $('.video-overlay').show(1000); // bring back the placeholder just in case the modal can be re-opened
  });
});

// new video module: clicking anchor wrapper will swap out the placeholder for the video player
$('.video-overlay').on('click', function(e) {
  $(this).closest('.modal-inner').find('.video-hidden').show();
  $(this).hide();
  e.preventDefault();
});

$(function() {
  $('#header-promo [data-toggle="modal"]').on('click',function(e){
    e.preventDefault();
  });
});

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

// sharrre widgets on PDP
$('#share').sharrre( {
  share: {
    facebook: true,
    twitter: true,
    pinterest: true
  },
  enableHover: false,
  template: '<span class="share-widget-facebook"><a class="social-facebook" href="#"><svg class="icon-facebook"><use xlink:href="#icon-facebook-simple"></use></svg><span class="sr-only">Share on Facebook</span></a></span><span class="share-widget-twitter"><a class="social-twitter" href="#"><svg class="icon-twitter"><use xlink:href="#icon-twitter-simple"></use></svg><span class="sr-only">Tweet</span></a></span><span class="share-widget-pinterest"><a class="social-pinterest" href="#"><svg class="icon-pinterest"><use xlink:href="#icon-pinterest-simple"></use></svg><span class="sr-only">Pin</span></a></span>',
  render: function ( api, options ) {
    $( api.element ).on( 'click', '.share-widget-twitter', function () {
      api.simulateClick();
      api.openPopup( 'twitter' );
    } );
    $( api.element ).on( 'click', '.share-widget-facebook', function () {
      api.simulateClick();
      api.openPopup( 'facebook' );
    } );
    $( api.element ).on( 'click', '.share-widget-pinterest', function () {
      api.simulateClick();
      api.openPopup( 'pinterest' );
    } );
    $( api.element ).on( 'click', '.share-widget-google-plus', function () {
      api.simulateClick();
      api.openPopup( 'googlePlus' );
    });
  }
});

// Add "QTY" to quantity select dropdowns
$(function() {
  $('.select-qty option').each(function() {
    $('this option').attr('title');
  });
});

$('[data-toggle="details-block"]').on('click', function(e) {
  $('.details-block').slideToggle(200);
  e.preventDefault();
});

// toggle between inches and centimeters (used on chicos. whbm uses a new, single-label toggle)
var toggleItem = $('.table-toggle');
var table = $('.table-size-chart');
$(toggleItem).on('click', function(e) {
  var targetDimension = $(this).data('size');
  $(this).attr('aria-expanded', 'true').closest('li').addClass('active');
  $(toggleItem).not(this).attr('aria-expanded', 'false').closest('li').removeClass('active');
  $(table).not(targetDimension).attr('aria-hidden', 'true').removeClass('active');
  $('.' + targetDimension).attr('aria-hidden', 'false').addClass('active');
  e.preventDefault();
});

// whbm unit toggle
var unitToggle = $('[data-toggle="measure-unit"]');
var unitTable = $('.table-size-chart');
$('.unit-toggle').on('click', unitToggle, function(e) {
  $(unitTable).toggleClass('active');
  $('.table-size-chart.active').attr('aria-hidden', 'false');
  $(unitTable).not('.active').attr('aria-hidden', 'true').removeClass('active');
  $(unitToggle).text(function(i, v) {
    return v === 'View in Centimeters' ? 'View in Inches' : 'View in Centimeters'
  });
  e.preventDefault();
});

// product description read more/less
// this is only used for prototyping and shouldn't be added to Prod
var toggleProdDescrip = $('[data-toggle="prod-description"]');
var toggleProdLabel = $('.description-more-less');
$(toggleProdDescrip).on('click', function(e) {
  $('.product-description-more-coreyweb-only').slideToggle('400');
  $(toggleProdLabel).html($(toggleProdLabel).text() == 'Read Less...' ? 'Read More...' : 'Read Less...');
  e.preventDefault();
});

// a generic toggle element
var toggleLink = $('[data-toggle="generic"]');
var toggleWrap = $('.toggle-wrap');
var toggleItem = $('.toggle-item');
$(toggleLink).on('click', function(e) {
  $(this).closest(toggleWrap).find(toggleItem).slideToggle(400);
  $(this).closest(toggleLink).toggleClass('open');
  $(this).closest(toggleLink).find('span').text(function(i, v) {
    return v === 'View' ? 'Close' : 'View'
  });
  e.preventDefault();
});

// toggle footer promo 
var promoFooter = $('#promo-footer');
var promoFooterToggle = $('[data-toggle="promo-footer"]');
var promoSkin = $('#promo-skin');
$(promoFooterToggle).on('click', function(e) {
  $(promoFooter).toggleClass('open');
  $(promoSkin).toggleClass('open');
  $(promoFooterToggle).find('span').text(function(i, v) {
    return v === "Close" ? "Today's Offers" : "Close"
  });
  e.preventDefault();
});

function startTimer(){
  $('.modal-pdp').modal('hide');
  $(bag).addClass('open');
  timer = setTimeout(function(){
    $(bag).removeClass('open');
  }, 5000);
}




// trigger size tabs with select element on mobile devices
$('#select-size-cat').on('change', function(e) {
  $('#tabs-size li a').eq($(this).val()).tab('show');
});
$('#tabs-swap-mobile').on('change', function(e) {
  $('#tabs-swap-desktop li a').eq($(this).val()).tab('show');
});

// // modal bug
// $(document).on('shown.bs.modal', function (e) {
//   $(e.target).before($(e.target).find('.modal-backdrop').clone().css('z-index', $(e.target).css('z-index')-1)); 
//   $(e.target).find('.modal-backdrop').removeClass('in').css('transition', 'none');
// });

// $(document).on('hide.bs.modal', function (e) {
//   $(e.target).prev('.modal-backdrop').remove();
// });


// PDP image/video swap
// This script is not the same script used on prod. It's merely here to to emulate what is happening over there.
var pdpImageWrap = $('.pdp-img-wrap');
var pdpVideoWrap = $('.pdp-video-wrap');
var pdpVideo = $('.pdp-video');

$(pdpVideo).on('ended',function() {
  $(pdpVideoWrap).removeClass('open');
  $(pdpImageWrap).removeClass('closed');
});

$('[data-toggle="pdp-video"]').click(function(e) {
  if ($(pdpVideo).get(0).ended) {
    $(pdpVideoWrap).addClass('open');
    $(pdpVideo).get(0).play();
    $(pdpImageWrap).addClass('closed');
  } else {
    if ($(pdpVideo).get(0).paused) {
      $(pdpVideoWrap).addClass('open');
      $(pdpVideo).get(0).currentTime = 0;
      $(pdpVideo).get(0).play();
      $(pdpImageWrap).addClass('closed');
    } else {
      $(pdpVideoWrap).removeClass('open');
      $(pdpVideo).get(0).pause();
      $(pdpImageWrap).removeClass('closed');
    }
  }
  e.preventDefault();
});


// bootstrap 3 modal bug. modal-backdrop doesn't get resized when content is dynamically changed in the modal. these resize scripts address that. 
$('.modal .nav-tabs').on('shown.bs.tab', function() {
  $(window).trigger('resize');
});
$('.modal [data-toggle="generic"]').click(function() {
  setTimeout(function() {
    $(window).trigger('resize');
  },401);
});

// refer a friend add/remove fields: only used by soma right now
$(function() {
  // var maxFields = 11;
  var fieldWrapper = $(".refer-friend-fields");
  var fieldButton = $(".add-field");
  var n = 2; // initial field count
  $(fieldButton).click(function(e) {
    e.preventDefault();
    // if(n < maxFields){ //max inputs allowed
      n++; //text box increment
    var newField = $('<div class="refer-friend-field"><hr><div class="row row-tight"><div class="col-xs-6 col-md-5"><div class="form-group"><label class="control-label" for="first-name-' + n + '">First Name</label><input type="text" class="form-control" id="first-name-' + n + '" placeholder=""></div></div><div class="col-xs-6 col-md-5"><div class="form-group "><label class="control-label " for="email-' + n + '">Email Address</label><input type="email" class="form-control" id="email-' + n + '" placeholder=""></div></div><div class="col-xs-12 col-md-2 text-right"><a href="#" class="btn btn-default btn-sm remove-field">Remove</a></div></div></div>');
        $(fieldWrapper).append(newField); // add field
    // } else {
    //   $(fieldButton).remove();
    // }
  });
  $(fieldWrapper).on("click",".remove-field", function(e) {
    e.preventDefault(); $(this).closest('.refer-friend-field').remove(); n--;
  })
});
// glossary
$('.glossary-wrap').on('click', '[data-toggle="glossary-term"]', function(e) {
  var glossaryTermToggle = $('[data-toggle="glossary-term"]');
  var glossaryDefActive = $(this).closest('h3').next('.glossary-definition');
  var glossaryTerm = $('.glossary-definition').not(glossaryDefActive);
  if ($(glossaryDefActive).closest('.glossary-term').hasClass('open')) {
    $(glossaryDefActive).attr('aria-expanded', 'false').slideUp(400).closest('.glossary-term').removeClass('open');
  } else {
    $(glossaryDefActive).attr('aria-expanded', 'true').slideDown(400).closest('.glossary-term').addClass('open');   
  }
  if ($(glossaryTerm).is(':visible')) {
    $(glossaryTerm).slideUp(400).closest('.glossary-term').removeClass('open').attr('aria-expanded', 'false');
  }
  e.preventDefault();
});

// soma footer promo carousel
// (function(){
//   $('#carousel123').carousel({ interval: 2000 });
//   $('#carouselABC').carousel({ interval: 3600 });
// }());

$(function(){
  $('#carousel-footer .item').each(function(){
    var itemToClone = $(this);
    for (var i=1;i<4;i++) {
      itemToClone = itemToClone.next();
      // wrap around if at end of item collection
      if (!itemToClone.length) {
        itemToClone = $(this).siblings(':first');
      }
      // grab item, clone, add marker class, add to collection
      itemToClone.children(':first-child').clone()
        .addClass("cloneditem-"+(i))
        .appendTo($(this)
      );
    }
  });
});



var footerCarousel = $("#carousel-footer");
footerCarousel.append("<ol class='carousel-indicators'></ol>");
var indicators = $("#carousel-footer .carousel-indicators"); 
footerCarousel.find(".carousel-inner").children(".item").each(function(index) {
    (index === 0) ? 
    indicators.append("<li data-target='#carousel-footer' data-slide-to='"+index+"' class='active'></li>") : 
    indicators.append("<li data-target='#carousel-footer' data-slide-to='"+index+"'></li>");
});     

// <!-- then call carousel -->
// $('.carousel').carousel();
