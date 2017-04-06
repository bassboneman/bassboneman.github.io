// style switcher
$(".navbar-right li a").click(function() { 
  $('[data-css="brand-css"]').attr("href", $(this).data('brand-css'));
  $('[data-typography="brand-typography"]').attr('href', $(this).data('brand-typography'));

  // $("link").attr("href", $(this).attr('rel'));
  $(this).closest('li').addClass('active');
  $('.navbar-right li a').not(this).closest('li').removeClass('active');
  return false;
});

// show/hide sample code
$('.toggle-code-example').click(function(){
  $(this).parent().parent().parent().find('.example-code').toggle();
  return false;
});

// image modal zoom
$('.modal-gallery .product-img-wrap').zoom({url: 'http://www.chicos.com/Product_Images/570152127_3789_large.jpg?resize=1500px:1850px'});
