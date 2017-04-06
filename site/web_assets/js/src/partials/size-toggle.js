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