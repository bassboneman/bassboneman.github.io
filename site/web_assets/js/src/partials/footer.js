$('.footer-menu-toggle').click(function() {
  $(this).next('ul').toggle();
  $(this).toggleClass('open');
  $('.footer-menu-toggle').not(this).next('ul').hide();
  $('.footer-menu-toggle').not(this).removeClass('open');
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