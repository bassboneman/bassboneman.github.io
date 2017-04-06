(function ( $ ) {
  $( function () {
    var og_image = document.querySelector( 'meta[property="og:image"]' );
    if ( og_image ) {
      og_image = og_image.getAttribute( 'content' );
    } else {
      og_image = '';
    }

    $( '[data-toggle="offcanvas"]' ).click( function () {
      $( '.page' ).toggleClass( 'active' )
    } );

    $( '.share-btns' ).sharrre( {
      share: {
        googlePlus: true,
        facebook: true,
        twitter: true,
        pinterest: {
          media: $( this ).data( 'media' )
        }
      },
      enableHover: false,
      template: '<div class="share-count"><span class="share-total count">{total}</span> <span class="share-label">Shares</span> </div><div class="share-widget-facebook" title="Share"><a class="box" href="#"><i class="fa fa-fw fa-facebook"></i><span>Share</span></a></div><div class="share-widget-twitter" title="Tweet"><a class="box" href="#"><i class="fa fa-fw fa-twitter"></i><span>Tweet</span></a></div><div class="share-widget-pinterest" title="Pin"><a class="box" href="#"><i class="fa fa-fw fa-pinterest"></i><span>Pin</span></a></div>',
      buttons: {
        pinterest: {
          media: og_image
        }
      },
      render: function ( api, options ) {
        $( api.element ).on( 'click', '.share-widget-twitter', function () {
          api.simulateClick();
          api.openPopup( 'twitter' );
        } );
        $( api.element ).on( 'click', '.share-widget-facebook', function () {
          api.simulateClick();
          api.openPopup( 'facebook' );
        } );
        $( api.element ).on( 'click', '.share-widget-pinterest', function () {
          api.simulateClick();
          api.openPopup( 'pinterest' );
        } );
      }
    } );
  } );

  // add animation to bootstrap dropdowns
  $( '.dropdown' ).on( 'show.bs.dropdown', function ( e ) {
    $( this ).find( '.dropdown-menu' ).first().stop( true, true ).slideDown( 400 );
  } );
  $( '.dropdown' ).on( 'hide.bs.dropdown', function ( e ) {
    $( this ).find( '.dropdown-menu' ).first().stop( true, true ).slideUp( 400 );
  } );

  $( '#utility .dropdown-menu, #menu .dropdown-menu .form-control, #menu .dropdown-menu button, .icon-search' ).click( function ( e ) {
    e.stopPropagation();
  } );

  $( window ).on( 'load resize', function () {
    var controlPosition = $( '.carousel' ).width() * 0.50 / 2;
    $( '.carousel-control' ).css( { 'top': controlPosition + 'px' } );
  } );

  $( function () {
    // gallery
    $( '.slider-for' ).slick( {
      slidesToShow: 1,
      slidesToScroll: 1,
      arrows: true,
      fade: true,
      asNavFor: '.slider-nav'
    } );

    $( '.slider-nav' ).slick( {
      slidesToShow: 6,
      slidesToScroll: 1,
      asNavFor: '.slider-for',
      dots: false,
      centerMode: false,
      focusOnSelect: true
    } );
  } );
})( jQuery );
