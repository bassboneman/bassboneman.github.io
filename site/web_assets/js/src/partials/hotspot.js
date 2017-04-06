// hotspots
// show/hide collections
$('[data-toggle="collection-grid"]').on('click', function(e) {
  $(this).toggleClass('expanded');
  $(this).closest('.collection-group').find('.collection').slideToggle();
  e.preventDefault();
});
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