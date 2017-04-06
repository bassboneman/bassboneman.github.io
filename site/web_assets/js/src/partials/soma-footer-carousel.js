// soma footer promo carousel
$(function(){
  $('#carousel-footer .item').each(function(){
    var itemToClone = $(this);
    for (var i=1;i<4;i++) {
      itemToClone = itemToClone.next();
      // wrap around if at end of item collection
      if (!itemToClone.length) {
        itemToClone = $(this).siblings(':first');
      }
      // grab item, clone, add marker class, add to collection
      itemToClone.children(':first-child').clone()
        .addClass("cloneditem-"+(i))
        .appendTo($(this)
      );
    }
  });
});
var footerCarousel = $("#carousel-footer");
footerCarousel.append("<ol class='carousel-indicators'></ol>");
var indicators = $("#carousel-footer .carousel-indicators"); 
footerCarousel.find(".carousel-inner").children(".item").each(function(index) {
  (index === 0) ? 
  indicators.append("<li data-target='#carousel-footer' data-slide-to='"+index+"' class='active'></li>") : 
  indicators.append("<li data-target='#carousel-footer' data-slide-to='"+index+"'></li>");
});