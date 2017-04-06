// open filter tools on smaller devices
$('[data-toggle="filter-tools"]').on('click', function(e) {
  $('.filter-list-wrap').toggleClass('open').removeClass('filter-desktop'); // for toggle vs. hover
  $('html, body').toggleClass('filters-open');
  e.preventDefault();
});


// can't find this class anywhere. did the lab add this?
function insert() {
  var name = $("input[name='insertvalue']").val();
  if (name!=''){
    var toinsert = true;
    $("ol.thelist > li").each(function() {
      var item = $(this).html();
      if (name.toUpperCase() < item.toUpperCase()) {
        if (toinsert){
          $(this).before(''+name+'');
          toinsert = false;
        }
      }
    });
    if(toinsert){
      $("ol.thelist").append(''+name+'');
    }
    $("input[name='insertvalue']").val('')
  }
}

function filterSelect(e) {
  var dropdownParent = $(this).closest('.dropdown');
  var filterName = $(this).data('name');
  var filterCat = $(this).data('type');
  if ($(this).data('name') == 'all') {
    $(dropdownParent).find('[data-toggle="filter-selector"]').each(function(e) {
      $(dropdownParent).find('[data-toggle="filter-selector"]').removeClass('selected');
      $(dropdownParent).removeClass('dropdown-selected');
      $('.filter-tags').find('[data-type=\''+filterCat+'\']').remove();
    });
    $(this).addClass('selected');
  } else {
    if ($('.filter-tags').find('.filter-tag[data-name="' + filterName + '"]').length == 0) {
      $('.filter-tags').append('<a href="#" class="filter-tag" data-type="' + filterCat + '" data-name="' + filterName + '">' + filterCat + ': ' + filterName + ' <svg class="icon-close"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-close"></use></svg></a>');
    } else {
      $('.filter-tag[data-name="' + filterName + '"]').remove();
    }
    $(dropdownParent).find('[data-toggle="filter-selector-all"]').removeClass('selected');
    $(this).toggleClass('selected');
    $(dropdownParent).addClass('dropdown-selected');
    $('.filter-clear').removeClass('hidden');
    if ($(dropdownParent).find('[data-toggle="filter-selector"].selected').length == 0) {
      $(dropdownParent).removeClass('dropdown-selected');
      $(dropdownParent).find('[data-toggle="filter-selector-all"]').addClass('selected');
    }
  }
  if ($('.filter-tag').length == 0) {
    $('.filter-clear').addClass('hidden');
  }
  e.preventDefault();
}
$('.selector-toggle').not('.disabled').click(filterSelect);

// clear all
$('.filter-outer').on('click', '[data-toggle="filter-clear-all"]', function(e) {
  $('.filter-list').find('[data-toggle="filter-selector"]').removeClass('selected');
  $('.filter-list li').removeClass('dropdown-selected');
  $('.filter-tag').remove();
  $('.filter-tags-wrap [data-toggle="filter-clear-all"]').addClass('hidden');
  $('[data-toggle="filter-selector-all"]').addClass('selected');
  e.preventDefault();
});

// remove filters when main selector is changed
$('.filter-outer').on('change', '#filter-cats', function(e) {
  $('.filter-clear').addClass('hidden');
  $('.filter-tag').remove();
  $('.filter-list').find('[data-toggle="filter-selector"]').removeClass('selected');
  $('.filter-list li').removeClass('dropdown-selected');
});

// remove individual filters
function filterRemove(e) {
  var tagNameRemove = $(this).data('name');
  var tagTypeRemove = $(this).data('type');
  $(this).remove();
  $('.filter-list').find('[data-name="' + tagNameRemove + '"]').removeClass('selected');
  if ($('.filter-tag').length == 0) {
    $('.filter-clear').addClass('hidden');
    $('.filter-list').find('[data-toggle="filter-selector-all"]').addClass('selected');
  }
  if ($('.filter-tag[data-type="' + tagTypeRemove + '"]').length == 0) {
    $('.filter-list').find('[data-type="' + tagTypeRemove + '"]').closest('li').removeClass('dropdown-selected');
    $('.filter-list').find('[data-name="all"][data-type="' + tagTypeRemove + '"]').addClass('selected');
  }
  e.preventDefault();
}
$('.filter-outer').on('click', '.filter-tag', filterRemove);

// toggle dropdown-menu using close icon
// no longer needed as the dropdown is initiated on hover
// $('[data-toggle="filter-toggles"]').dropdown();


// filter crumbs
var filterTagObject = [];
function buildTags() {
  $(filterTagObject).each(function(index, value) {
    $(value.actives).each(function(index, activesValue) {
      var newTag = buildTag(value.name, activesValue.filterName, activesValue.matchedElement);
      // Add filter tag to the page
      $('.filter-tags').append(newTag);
      // When a tag is added, clear all needs to become a thing
      $('.filter-clear').removeClass('hidden');    
    });
  });
}
buildTags();
