// youtube modal: autoplay on open, stop on close
$(function() {
  $('.modal-video').on('shown.bs.modal', function(e) {
    var src = $(this).find('iframe').attr('data-iframe-src');
    $(this).find('iframe').attr('src', src);
  });
  $('.modal-video').on('hidden.bs.modal', function(e) {
    $(this).find('iframe').attr('src', '');
  });
});

// youtube modal: open on page load, requires click to play
$(function() {
  $('.video-overlay').on('click', function(e) {
    var src2 = $('#video-wrapper-pageload').find('iframe').attr('data-iframe-src');
    $('#video-wrapper-pageload').show();
    $('#video-wrapper-pageload').find('iframe').attr('src', src2);
    $(this).hide();
    e.preventDefault();
  });
  $('#modal-video-pageload').on('hidden.bs.modal', function(e) {
    $('#video-wrapper-pageload').hide();
    $('#video-wrapper-pageload').find('iframe').attr('src', '');
    $('.video-overlay').show(1000); // bring back the placeholder just in case the modal can be re-opened
  });
});

// new video module: clicking anchor wrapper will swap out the placeholder for the video player
$('.video-overlay').on('click', function(e) {
  $(this).closest('.modal-inner').find('.video-hidden').show();
  $(this).hide();
  e.preventDefault();
});