// product image gallery modal
if ($(window).height() < 1000) {
  $(window).on('load resize', function(){
    var thumbHeight = $(window).height() * 0.25 -9;
    $('.zoom-main #product-img').css({'max-height':$(window).height()+'px'});
    $('.zoom-thumbs img').css({'max-height': thumbHeight +'px'});

  });
  // $('modal-gallery').find('.product-img-wrap').zoom({touch:true}); //touch: true enables zoom on mobile
}

