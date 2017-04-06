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

// product description read more/less
// this is only used for prototyping and shouldn't be added to Prod
var toggleProdDescrip = $('[data-toggle="prod-description"]');
var toggleProdLabel = $('.description-more-less');
$(toggleProdDescrip).on('click', function(e) {
  $('.product-description-more-coreyweb-only').slideToggle('400');
  $(toggleProdLabel).html($(toggleProdLabel).text() == 'Read Less...' ? 'Read More...' : 'Read Less...');
  e.preventDefault();
});

// Add "QTY" to quantity select dropdowns
$(function() {
  $('.select-qty option').each(function() {
    $('this option').attr('title');
  });
});