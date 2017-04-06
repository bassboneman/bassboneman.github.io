// sharrre widgets on PDP
$('#share').sharrre( {
  share: {
    facebook: true,
    twitter: true,
    pinterest: true
  },
  enableHover: false,
  template: '<span class="share-widget-facebook"><a class="social-facebook" href="#"><svg class="icon-facebook"><use xlink:href="#icon-facebook-simple"></use></svg><span class="sr-only">Share on Facebook</span></a></span><span class="share-widget-twitter"><a class="social-twitter" href="#"><svg class="icon-twitter"><use xlink:href="#icon-twitter-simple"></use></svg><span class="sr-only">Tweet</span></a></span><span class="share-widget-pinterest"><a class="social-pinterest" href="#"><svg class="icon-pinterest"><use xlink:href="#icon-pinterest-simple"></use></svg><span class="sr-only">Pin</span></a></span>',
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
    $( api.element ).on( 'click', '.share-widget-google-plus', function () {
      api.simulateClick();
      api.openPopup( 'googlePlus' );
    });
  }
});