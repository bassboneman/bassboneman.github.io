// scripts for flows only
var flowGift = $('[data-gifting="options"]');
$(flowGift).click(function(e) {
  // $(this).closest('.modal').modal('hide');
  var flowGiftVal = $(this).data('target');
  var flowGiftTarget = $('#' + flowGiftVal);
  $('.checkout-gifting').not(flowGiftTarget).hide();
  $(flowGiftTarget).show().find('.checkout-link').addClass('link-toggled');
  $(flowGiftTarget).show().find('.checkout-gifting-options').show();
  console.log('foo');
  e.preventDefault();
});

var giftProductToggle = $('.gift-product-toggle');
$(giftProductToggle).click(function(e) {
  var giftProductToggleVal = $(this).closest('.checkout-toggle').find('input').attr('id');
  var giftProductToggleTarget = $('#flow-' + giftProductToggleVal);
  $(this).closest('.checkout-toggle').hide();
  $(giftProductToggleTarget).show();
  e.preventDefault();
});

var img1 = $('#flow-wrap-product-1').find('img');
var img2 = $('#flow-wrap-product-2').find('img');
var img3 = $('#wrap-product-1').closest('.media').find('img');
var img4 = $('#wrap-product-2').closest('.media').find('img');
var imgMsg1 = $('#flow-message-product-1').find('img');
var imgMsg2 = $('#flow-message-product-2').find('img');
var imgMsg3 = $('#message-product-1').closest('.media').find('img');
var imgMsg4 = $('#message-product-2').closest('.media').find('img');


var dd1 = $('#wrap-product-1').closest('.media').find('.meta-list').find('dd').eq(1);
var dd2 = $('#wrap-product-2').closest('.media').find('.meta-list').find('dd').eq(1);
var dd3 = $('#message-product-1').closest('.media').find('.meta-list').find('dd').eq(1);
var dd4 = $('#message-product-2').closest('.media').find('.meta-list').find('dd').eq(1);


$(function() {
  $(img1).attr('src','/web_assets/imgs/checkout/temp/red.jpg');
  $(img2).attr('src','/web_assets/imgs/checkout/temp/blue.jpg');
  $(img3).attr('src','/web_assets/imgs/checkout/temp/red.jpg');
  $(img4).attr('src','/web_assets/imgs/checkout/temp/blue.jpg');
  $(dd1).text('Red');
  $(dd2).text('Blue');
  $(dd3).text('Red');
  $(dd4).text('Blue');
  $(imgMsg1).attr('src','/web_assets/imgs/checkout/temp/red.jpg');
  $(imgMsg2).attr('src','/web_assets/imgs/checkout/temp/blue.jpg');
  $(imgMsg3).attr('src','/web_assets/imgs/checkout/temp/red.jpg');
  $(imgMsg4).attr('src','/web_assets/imgs/checkout/temp/blue.jpg');


});


$('[data-swap="address"]').click(function() {
  var altAddress = $(this).data('address');
  $('[data-address="multi"]').html(altAddress);
  console.log(altAddress);
})
