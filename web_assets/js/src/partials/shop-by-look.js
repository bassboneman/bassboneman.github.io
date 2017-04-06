// shop by look
$('.select-size').change(function() {
  if ($(this).find('select')[0].value !== '') {
    $(this).closest('.product-wrap').find('.item-selected-checkbox').removeClass('item-deselected initial-hide');
    $(this).closest('.product-wrap').find('.item-selected-checkbox input').prop('checked', true).attr('disabled', false);
    $('.shop-footer-wrap').removeClass('hide-footer');
  } else {
    $(this).closest('.product-wrap').find('.item-selected-checkbox').addClass('item-deselected');
    $(this).closest('.product-wrap').find('.item-selected-checkbox input').prop('checked', false).attr('disabled', true);
  }
});

$('.item-selected-checkbox input').change(function() {
  $(this).closest('.item-selected-checkbox').addClass('item-deselected');
  $(this).attr('disabled', true);
  $(this).closest('.product-wrap').find('.select-size select').val('');
  $(this).closest('.product-wrap').find('.select-size button .filter-option').html('Select Size');
  $(this).closest('.product-wrap').find('.select-size button').prop('title', 'Select Size');
});