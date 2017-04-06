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