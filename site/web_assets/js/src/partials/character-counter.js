$('.counter').keyup(function () {
  var max = $(this).data('countmax');
  var len = $(this).val().length;
  var char = max - len;
  $(this).closest('.form-group').next('.char-count').find('span').text(char);
  console.log(char);
});