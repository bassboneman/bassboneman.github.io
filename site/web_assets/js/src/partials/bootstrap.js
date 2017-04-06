// modals
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

// swipe carousel on touch devices
$('.carousel').not('.noswipe').swiperight(function() {  
  $(this).carousel('prev');  
});  
$('.carousel').not('.noswipe').swipeleft(function() {  
  $(this).carousel('next');  
});

// prevent certain dropdowns from closing on click within dropdown
$('#utility .dropdown-menu, #menu .dropdown-menu .form-control, #menu .dropdown-menu button, .filter-list .dropdown-menu').click(function(e) {
  e.stopPropagation();
});

function isTouchEnabled() {
  return ('ontouchstart' in window);
}

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

// signup modal
$('[data-toggle="details-block"]').on('click', function(e) {
  $('.details-block').slideToggle(200);
  e.preventDefault();
});


// bootstrap 3 modal bug. modal-backdrop doesn't get resized when content is dynamically changed in the modal. these resize scripts address that. 
$('.modal .nav-tabs').on('shown.bs.tab', function() {
  $(window).trigger('resize');
});
$('.modal [data-toggle="generic"], .checkout-toggle').click(function() {
  setTimeout(function() {
    $(window).trigger('resize');
  },401);
});
$('.modal-checkout .modal-body').change(function(){
  $(window).trigger('resize');
  console.log('modal resized');
});

// // fix iOS fixed position/keyboard bug
// // https://www.abeautifulsite.net/bootstrap-3-modals-and-the-ios-virtual-keyboard
// // iOS check...ugly but necessary
// if( navigator.userAgent.match(/iPhone|iPad|iPod/i) ) {
//   $('.modal-checkout').on('show.bs.modal', function() {
//     // Position modal absolute and bump it down to the scrollPosition
//     $(this).css({
//       position: 'absolute',
//       marginTop: $(window).scrollTop() + 'px',
//       bottom: 'auto'
//     });
//     // Position backdrop absolute and make it span the entire page
//     //
//     // Also dirty, but we need to tap into the backdrop after Boostrap 
//     // positions it but before transitions finish.
//     //
//     setTimeout( function() {
//       $('.modal-checkout .modal-backdrop').css({
//         position: 'absolute', 
//         top: 0, 
//         left: 0,
//         width: '100%',
//         height: Math.max(
//           document.body.scrollHeight, document.documentElement.scrollHeight,
//           document.body.offsetHeight, document.documentElement.offsetHeight,
//           document.body.clientHeight, document.documentElement.clientHeight
//         ) + 'px'
//       });
//     }, 0);
//   });
// }






// popups
$('[data-toggle="popup-store"]').on('click', function(e) {
  var storeBrand = $(this).data('brand');
  window.open('/' + storeBrand + '/pages/pdp/locate-in-store.html', "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=0, left=50%, width=800, height=635");
  e.preventDefault();
});
$('[data-toggle="popup-invitations"]').on('click', function(e) {
  var invitationBrand = $(this).data('brand');
  window.open('/' + invitationBrand + '/pages/account/wish-list-invitations.html', "_blank", "toolbar=yes, scrollbars=yes, resizable=yes, top=0, left=50%, width=800, height=635");
  e.preventDefault();
});

$('#font-select').on('change', function() {
  var font = $(this).val();
  $('#font-switcher').attr({ href: "/lib_assets/css/fonts/" + font + ".css"});
});
