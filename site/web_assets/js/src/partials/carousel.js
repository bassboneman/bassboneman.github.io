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