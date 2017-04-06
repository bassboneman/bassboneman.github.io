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


if ($(window).width() > 991) {
  $('#menu .dropdown').on('mouseenter', function() {
    $('.dropdown').not(this).removeClass('open');
  });
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
  var delay=200, setTimeoutConst;
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
