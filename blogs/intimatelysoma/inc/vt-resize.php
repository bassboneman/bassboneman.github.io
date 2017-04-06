<?php
/**
 * Resize images dynamically using wp built in functions.
 * @author Victor Teixeira http://profiles.wordpress.org/vteixeira/
 * @author Aaron Collegeman http://aaroncollegeman.com
 * @see http://core.trac.wordpress.org/ticket/15311
 *
 * php 5.2+
 *
 * Examples:
 *
 * <?php
 *   $image = vt_resize( get_post_thumbnail_id(), 140, 110, true ); // == vt_resize( get_the_ID(), 140, 110, true )
 *   // or, resize any locally stored image:
 *   $image = vt_resize( '/some/image/url.jpg', 100, 100, true );
 * ?>
 * <img src="<?php echo $image[url]; ?>" width="<?php echo $image[width]; ?>" height="<?php echo $image[height]; ?>" />
 *
 * @param mixed $attach_ref - either an attachment id, a post ID, or a URL
 * @param int $width
 * @param int $height
 * @param bool $crop
 * @return array
 */
function get_vt_resize( $attach_ref = null, $width, $height, $crop = false ) {

	// this is an attachment or a Post, so we have the ID
	if ( is_numeric($attach_ref) ) {

		$image_src = wp_get_attachment_image_src( $attach_ref, 'full' );
		if (!$image_src) {
			$attach_ref = get_post_thumbnail_id( $attach_ref );
			$image_src = wp_get_attachment_image_src( $attach_ref, 'full' );
		}

		$file_path = get_attached_file( $attach_ref );

		// this is not an attachment, so try to find the file
	} else {

		$file_path = parse_url( $attach_ref );
		$file_path = ltrim( $file_path['path'], '/' );
		//$file_path = rtrim( ABSPATH, '/' ).$file_path['path'];

		$orig_size = getimagesize( $file_path );

		$image_src[0] = $attach_ref;
		$image_src[1] = $orig_size[0];
		$image_src[2] = $orig_size[1];
	}

	if (!$file_path) {
		return array(
			'url' => '#',
			'width' => -1,
			'height' => -1
		);
	}

	$file_info = pathinfo( $file_path );
	$extension = '.'. $file_info['extension'];

	// the image path without the extension
	$no_ext_path = $file_info['dirname'].'/'.$file_info['filename'];

	$cropped_img_path = $no_ext_path.'-'.$width.'x'.$height.$extension;

	// checking if the file size is larger than the target size
	// if it is smaller or the same size, stop right here and return
	if ( $image_src[1] > $width || $image_src[2] > $height ) {

		// the file is larger, check if the resized version already exists (for crop = true but will also work for crop = false if the sizes match)
		if ( file_exists( $cropped_img_path ) ) {

			$cropped_img_url = str_replace( basename( $image_src[0] ), basename( $cropped_img_path ), $image_src[0] );

			$vt_image = array (
				'url' => $cropped_img_url,
				'width' => $width,
				'height' => $height
			);

			return $vt_image;
		}

		// crop = false
		if ( $crop == false ) {

			// calculate the size proportionaly
			$proportional_size = wp_constrain_dimensions( $image_src[1], $image_src[2], $width, $height );
			$resized_img_path = $no_ext_path.'-'.$proportional_size[0].'x'.$proportional_size[1].$extension;

			// checking if the file already exists
			if ( file_exists( $resized_img_path ) ) {

				$resized_img_url = str_replace( basename( $image_src[0] ), basename( $resized_img_path ), $image_src[0] );

				$vt_image = array (
					'url' => $resized_img_url,
					'width' => $new_img_size[0],
					'height' => $new_img_size[1]
				);

				return $vt_image;
			}
		}

		// no cached files - let's finally resize it
		$new_img_path = image_resize( $file_path, $width, $height, $crop );
		$new_img_size = getimagesize( $new_img_path );
		$new_img = str_replace( basename( $image_src[0] ), basename( $new_img_path ), $image_src[0] );

		// resized output
		$vt_image = array (
			'url' => $new_img,
			'width' => $new_img_size[0],
			'height' => $new_img_size[1]
		);

		return $vt_image;
	}

	// default output - without resizing
	$vt_image = array (
		'url' => $image_src[0],
		'width' => $image_src[1],
		'height' => $image_src[2]
	);

	return $vt_image;
}

/**
 * Use this function to simply print the URL of the resized image.
 * Note that this approach does not account for cases in which the
 * source image is smaller than the requested size, in which case
 * the requested width/height will not necessarily be the exact width
 * and height of the resulting image.
 *
 * Example:
 *
 * <img src="<?php vt_image(get_the_ID(), 400, 300, true) ?>" width="400" height="300" />
 *
 * @param mixed $attach_ref - either an attachment id, a post ID, or a URL
 * @param int $width
 * @param int $height
 * @param bool $crop
 */
function vt_resize( $attach_ref = null, $width, $height, $crop = false ) {
	$image = get_vt_resize( $attach_ref, $width, $height, $crop );
	echo $image['url'];
}