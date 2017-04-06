// glossary
$('.glossary-wrap').on('click', '[data-toggle="glossary-term"]', function(e) {
  var glossaryTermToggle = $('[data-toggle="glossary-term"]');
  var glossaryDefActive = $(this).closest('h3').next('.glossary-definition');
  var glossaryTerm = $('.glossary-definition').not(glossaryDefActive);
  if ($(glossaryDefActive).closest('.glossary-term').hasClass('open')) {
    $(glossaryDefActive).attr('aria-expanded', 'false').slideUp(400).closest('.glossary-term').removeClass('open');
  } else {
    $(glossaryDefActive).attr('aria-expanded', 'true').slideDown(400).closest('.glossary-term').addClass('open');   
  }
  if ($(glossaryTerm).is(':visible')) {
    $(glossaryTerm).slideUp(400).closest('.glossary-term').removeClass('open').attr('aria-expanded', 'false');
  }
  e.preventDefault();
});