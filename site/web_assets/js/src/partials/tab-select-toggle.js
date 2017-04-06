// trigger tabs with select element on mobile devices
$('#select-size-cat').on('change', function(e) {
  $('#tabs-size li a').eq($(this).val()).tab('show');
});
$('#tabs-swap-mobile').on('change', function(e) {
  $('#tabs-swap-desktop li a').eq($(this).val()).tab('show');
});
