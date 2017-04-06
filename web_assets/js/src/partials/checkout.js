// show header summary toggle once user scrolls past sidebar item
$(document).scroll(function() {
  var summaryHeight = $(this).scrollTop();
  if (summaryHeight > 350) {
    $('.summary-toggle').addClass('visible');
  } else {
    $('.summary-toggle').removeClass('visible');
  }
});


$(function() {
  var checkoutField = $('.form-labels .form-control');
  $(checkoutField).focus(function() {
    $(this).closest('.form-group').addClass('focus');
  });
  $(checkoutField).blur(function() {
    // var inputVal = $(checkoutField).val(); // temp
    if ($(this).val().length == 0) {
      $(this).closest('.form-group').removeClass('focus field-invalid field-valid');
    } else {
      if ($(this).attr('data-card')) {
        // var ccType = $(this).data('card');
        if ($(this).val() == '4444444444444444') { // temp
          $(this).closest('.form-group').addClass('field-valid visa').removeClass('field-invalid'); // temp
          $(this).closest('.form-group').find('.input-icon-cc').html('<img src="/web_assets/svg/checkout/visa.svg" alt="Visa">');
        } else if ($(this).val() == '3333333333333333') {
          $(this).closest('.form-group').addClass('field-valid americanexpress').removeClass('field-invalid'); // temp
          $(this).closest('.form-group').find('.input-icon-cc').html('<img src="/web_assets/svg/checkout/americanexpress.svg" alt="American Express">');
        } else if ($(this).val() == '2222222222222222') {
          $(this).closest('.form-group').addClass('field-valid dinersclub').removeClass('field-invalid'); // temp
          $(this).closest('.form-group').find('.input-icon-cc').html('<img src="/web_assets/svg/checkout/dinersclub.svg" alt="Diners Club">');
        } else if ($(this).val() == '5555555555555555') {
          $(this).closest('.form-group').addClass('field-valid mastercard').removeClass('field-invalid'); // temp
          $(this).closest('.form-group').find('.input-icon-cc').html('<img src="/web_assets/svg/checkout/mastercard.svg" alt="Master Card">');
        } else {
          $(this).closest('.form-group').addClass('field-invalid').removeClass('field-valid'); // temp
          $('.alert-checkout').addClass('visible');
          $(this).closest('.form-group').find('.input-icon-cc').html('');
        }
      } else {
        $(this).closest('.form-group').addClass('field-valid').removeClass('field-invalid'); // temp
        $('.alert-checkout').removeClass('visible');
      }
    }
  });

  // since form elements are large, we need to let the selectpicker script know to add the proper class
  $('.selectpicker.input-lg').selectpicker({
    'selectedText': '',style:'btn-lg'
  });

  // add class to selects when an option with value has been selected. the class reveals the label and shifts the content.
  var selectStyled = $('.form-labels .selectpicker');
  $(selectStyled).change(function() {
    if ($('option:selected', $(this)).attr('value')) {
      $(this).closest('.form-group').addClass('focus-select field-valid');
    } else {
      $(this).closest('.form-group').removeClass('focus-select field-valid');
    }
  });

  // add class to inputs when user focuses or adds content. the class reveals the label and shifts the content.
  $('.form-labels .form-control').each(function(index, item){
    if($(item).val() !== '') {
      $(item).closest('.form-group').addClass('focus');   
    }
  });
  $('.form-labels .selectpicker').each(function(index, selectItem){
    if($('option:selected', $(selectItem)).attr('value')) {
      $(selectItem).closest('.form-group').addClass('focus-select');   
    }
  });
});

// telephone formatting (US settings)
$('input[type="tel"]').formatter({
  'pattern': '({{999}}) {{999}}-{{9999}}',
  'persistent': true
});

// test for touch
function isTouchDevice() {
  return 'ontouchstart' in document.documentElement;    
}   
// uncheck creditcard radio and hide content for mobile users
$(function() {
  if ((isTouchDevice()) && ($(window).width() < 768)) {
    $('.checkout-toggle #creditcard').prop('checked', false);
    $('#checkout-creditcard').hide();
    $('[data-btn="paypal"]').hide();
  }
});

// toggle hidden elements when clicking radios
var radioToggle = $('.checkout-toggle').find('input[type="radio"]');
$(radioToggle).change(function() {
  var radioVal = $(this).val();
  var checkoutHidden = $(this).closest('.radio-list').find('.checkout-toggle-content');
  var radioTarget = $(this).closest('.radio-list').find('#checkout-' + radioVal);
  $(radioTarget).slideToggle(400).closest('.checkout-toggle').addClass('active');
  $(checkoutHidden).not(radioTarget).slideUp(400).closest('.radio').removeClass('active');
  if ($('.checkout-toggle #creditcard').prop('checked')) {
    $('[data-btn="creditcard"]').removeClass('hidden');
    $('[data-btn="paypal"]').addClass('hidden');
  } else if ($('.checkout-toggle #paypal').prop('checked')) {
    $('[data-btn="creditcard"]').addClass('hidden');
    $('[data-btn="paypal"]').removeClass('hidden');
  }
});

$('[data-target="radio-cancel"]').click(function(e) {
  $(this).closest('.checkout-toggle').removeClass('active').find('.checkout-toggle-content').slideUp(400);
  $(this).closest('.checkout-toggle').find('input').prop('checked', false);
  e.preventDefault();
});

// toggle hidden elements when clicking checkboxes
var checkToggle = $('.checkout-toggle').find('input[type="checkbox"]');
$(checkToggle).change(function() {
  var checkVal = $(this).val();
  var checkcheckoutHidden = $(this).closest('.radio-list').find('.checkout-toggle-content');
  var checkhiddenTarget = $(this).closest('.radio-list').find('#checkout-' + checkVal);
  $(checkhiddenTarget).slideToggle(400);
  console.log('check toggled');
});
// toggle generic hidden components
var checkoutToggle = $('[data-action="toggle"]');
$(checkoutToggle).click(function(e) {
  var toggleLabel = $(this).data('label');
  var checkoutToggleTarget = $(this).data('target');
  var checkoutToggleBlock = $('#' + checkoutToggleTarget);
  $(checkoutToggleBlock).slideToggle(400);
  $(this).data('label', $(this).html()).html(toggleLabel);
  $(this).toggleClass('link-toggled');
  e.preventDefault();
});
// a more generic toggle item that doesn't need radios, checkboxes, etc.
var toggleSimple = $('[data-toggle="checkout-block"]');
$(toggleSimple).click(function(e) {
  var toggleSimpleVal = $(this).data('target');
  var toggleSimpleLabel = $(this).data('label');
  var toggleSimpleTarget = $('#checkout-' + toggleSimpleVal);
  $(toggleSimpleTarget).slideToggle(400);
  if ($(this).data('hide')) {
    $(this).hide();
  }
  e.preventDefault();
});





// toggle next checkout block on btn click
$('.checkout-block').on('click', '.btn-checkout', function(e) {
  var blockTarget = $(this).data('checkout');
  var hiddenBlock = $('#checkout-' + blockTarget);
  $(hiddenBlock).removeClass('not-started').addClass('editing');
  $(this).closest('.checkout-block').find('[data-toggle="checkout-edit"]').text('Change');
  if ($(this).attr('data-checkout') == 'save-info' && $('#payment-email').val().length == 0) {
    $('#payment-email').closest('.form-group').addClass('field-invalid').removeClass('field-valid'); // temp
    $('.alert-checkout').addClass('visible').find('.media-body').html('<strong>Important message:</strong> Your email address entry is invalid. Please try again.');
  } else {
    if ($(this).attr('data-checkout') == 'save-info') {
      $('[data-btn="place-order"]').removeAttr('disabled');
      $(this).closest('.checkout-block').addClass('complete').removeClass('first editing');
    } else if ($(this).attr('data-saved-info') == 'yes') { // need to hide the "CHANGE" button when she has signed up
      $(this).closest('.checkout-block').addClass('complete info-saved').removeClass('first editing');
    } else if ($(this).attr('data-saved-info') == 'no') {
      $(this).closest('.checkout-block').addClass('complete info-not-saved').removeClass('first editing');
    } else {
      $(this).closest('.checkout-block').addClass('complete').removeClass('first editing');
    }
    var path = $(hiddenBlock).attr('id');
    var anchor = $("#" + path);
    var position = anchor.position().top + $(hiddenBlock).scrollTop() - 36;
    // $('body, html').animate({scrollTop: position + 30}); 
    $('body, html').animate({scrollTop: position}); 
    console.log(position);
  }
  e.preventDefault();
});

// a toggle editable/completed sections
$('.checkout-block').on('click', '[data-toggle="checkout-edit"]', function (e) {
  var checkoutBlock = $(this).closest('.checkout-block');
  var checkoutForm = $(checkoutBlock).find('.checkout-section-form');
  var checkoutComplete = $(checkoutBlock).find('.checkout-section-entry');
  // $(checkoutForm).fadeToggle(400);
  // $(checkoutComplete).fadeToggle(400);
  if ($(checkoutBlock).hasClass('complete')) {
    $(checkoutBlock).removeClass('complete first').addClass('editing');
    console.log('back to editing');
  } else if ($(checkoutBlock).hasClass('editing')) {
    $(checkoutBlock).addClass('complete').removeClass('editing');
    console.log('back to complete');
  }
  // $(this).toggleClass('editing').removeClass('complete'); // fix this!!!!!!
  $(this).text(function(i, v) {
    return v === 'Change' ? 'Cancel' : 'Change'
  });
  e.preventDefault();
});







// increment buttons
$('.btn-increment').click(function(e){
  e.preventDefault();
  
  fieldName = $(this).attr('data-field');
  type    = $(this).attr('data-type');
  var input = $("input[name='"+fieldName+"']");
  var currentVal = parseInt(input.val());
  if (!isNaN(currentVal)) {
    if(type == 'minus') {
      if(currentVal > input.attr('min')) {
        input.val(currentVal - 1).change();
      } 
      if(parseInt(input.val()) == input.attr('min')) {
        $(this).attr('disabled', true);
      }
    } else if(type == 'plus') {

      if(currentVal < input.attr('max')) {
        input.val(currentVal + 1).change();
      }
      if(parseInt(input.val()) == input.attr('max')) {
        $(this).attr('disabled', true);
      }

    }
  } else {
    input.val(0);
  }
});
$('.input-increment').focusin(function(){
   $(this).data('oldValue', $(this).val());
});
$('.input-increment').change(function() {
  
  minValue =  parseInt($(this).attr('min'));
  maxValue =  parseInt($(this).attr('max'));
  valueCurrent = parseInt($(this).val());
  
  name = $(this).attr('name');
  if(valueCurrent >= minValue) {
    $(".btn-increment[data-type='minus'][data-field='"+name+"']").removeAttr('disabled')
  } else {
    alert('Sorry, the minimum value was reached');
    $(this).val($(this).data('oldValue'));
  }
  if(valueCurrent <= maxValue) {
    $(".btn-increment[data-type='plus'][data-field='"+name+"']").removeAttr('disabled')
  } else {
    alert('Sorry, the maximum value was reached');
    $(this).val($(this).data('oldValue'));
  }
  
  
});
$(".input-increment").keydown(function (e) {
  // Allow: backspace, delete, tab, escape, enter and .
  if ($.inArray(e.keyCode, [46, 8, 9, 27, 13, 190]) !== -1 ||
     // Allow: Ctrl+A
    (e.keyCode == 65 && e.ctrlKey === true) || 
     // Allow: home, end, left, right
    (e.keyCode >= 35 && e.keyCode <= 39)) {
       // let it happen, don't do anything
       return;
  }
  // Ensure that it is a number and stop the keypress
  if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105)) {
    e.preventDefault();
  }
});



$('.alert-checkout .close').click(function(e) {
  $(this).closest('.alert-checkout').removeClass('visible');
  e.preventDefault();
});


$('[data-toggle="giftcard-balance"]').click(function(e) {
  $(this).closest('.checkout-gift-card').addClass('checking-balance').removeClass('giftcard-applied');
  e.preventDefault();
});
$('[data-toggle="giftcard-another"]').click(function(e) {
  $(this).closest('.checkout-gift-card').removeClass('checking-balance').removeClass('giftcard-applied');
  e.preventDefault();
});
$('[data-toggle="giftcard-apply"]').click(function(e) {
  $(this).closest('.checkout-gift-card').addClass('giftcard-applied').removeClass('checking-balance');
  // $(this).closest('.checkout-gift-card').find('[data-action="toggle"]').text('Remove').toggleClass('link-toggled');
  e.preventDefault();
});
$('[data-toggle="giftcard-remove"]').click(function(e) {
  var parent = $(this).closest('.checkout-gift-card');
  var parentToggle = $(parent).find('[data-action="toggle"]');
  var parentToggleLabel = $(parentToggle).data('label');
  $(parent).removeClass('giftcard-applied');
  $(parent).find('.checkout-hidden').hide();
  $(parentToggle).data('label', $(parentToggle).html()).html(parentToggleLabel).toggleClass('link-toggled');;
  e.preventDefault();
});