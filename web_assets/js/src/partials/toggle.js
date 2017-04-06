// a generic toggle element
var toggleLink = $('[data-toggle="generic"]');
var toggleWrap = $('.toggle-wrap');
var toggleItem = $('.toggle-item');
$(toggleLink).on('click', function(e) {
  $(this).closest(toggleWrap).find(toggleItem).slideToggle(400);
  $(this).closest(toggleLink).toggleClass('open');
  $(this).closest(toggleLink).find('span').text(function(i, v) {
    return v === 'View' ? 'Close' : 'View'
  });
  e.preventDefault();
});