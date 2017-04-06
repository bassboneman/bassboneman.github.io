jQuery( function($) {
	$('#insert-media-button' ).click(function() {
		jQuery("a:contains('Insert Media')" ).click();
	});
});

function launchShortCakeEditor( shortcode ) {
	wp.media.editor.open();
	jQuery( "a:contains('Insert Post Element')" ).click();
	jQuery('[data-shortcode="'+shortcode+'"]' ).click();
	return false;
}

function updateSelectFieldListener( changed, collection, shortcode ) {

	function attributeByName( name ) {
		return _.find(
			collection,
			function ( viewModel ) {
				return name === viewModel.model.get( 'attr' );
			}
		);
	}

	var updatedVal = changed.value,
		grid_number = attributeByName( 'grid_number' ),
		updatedVal = ( undefined === updatedVal ) ? grid_number.$el.find('select' ).val() : updatedVal;
		photos = [];
		photos.push( attributeByName( 'photo1' ) );
		photos.push( attributeByName( 'photo2' ) );
		photos.push( attributeByName( 'photo3' ) );
		photos.push( attributeByName( 'photo4' ) );
		photos.push( attributeByName( 'photo5' ) );
		photos.push( attributeByName( 'photo6' ) );

	_.each(photos, function(el, idx) {
		var $photo = el.$el;
		if ( idx < updatedVal ) {
			$photo[0].style.display = 'inline-block';
		} else {
			$photo[0].style.display = 'none';
		}
	});

}
wp.shortcake.hooks.addAction( 'ech_photogrid.grid_number', updateSelectFieldListener );