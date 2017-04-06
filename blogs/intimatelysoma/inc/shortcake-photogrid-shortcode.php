<?php
/**
 * Plugin Name: Recipe shortcode and ui
 * Version: v1.0
 * Description: Adds [shortcake_dev] example shortcode to see Shortcode UI in action
 * Author: Fusion Engineering and community
 * Author URI: http://next.fusion.net/tag/shortcode-ui/
 * Text Domain: shortcode-ui
 * License: GPL v2 or later
 *
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 */

add_action( 'media_buttons', 'add_photogrid_button' );
function add_photogrid_button() {
	echo '<a href="#" id="insert-photogrid" onclick="launchShortCakeEditor(\'ech_photogrid\');" class="button">Add Photo Grid</a>';
}

add_action( 'init', function () {

	if ( ! function_exists( 'shortcode_ui_register_for_shortcode' ) ) {
		add_action( 'admin_notices', function () {
			if ( current_user_can( 'activate_plugins' ) ) {
				echo '<div class="error message"><p>Shortcode UI plugin must be active for Shortcode UI Example plugin to function.</p></div>';
			}
		} );

		return;
	}

	/**
	 * Register your shortcode as you would normally.
	 * This is a simple example for a pullquote with a citation.
	 */
	add_shortcode( 'ech_photogrid', function ( $attr, $content = '' ) {

		$attr = wp_parse_args( $attr, array(
			'grid_number' => '',
			'photo1'      => '',
			'photo2'      => '',
			'photo3'      => '',
			'photo4'      => '',
			'photo5'      => '',
			'photo6'      => '',
		) );

			if ( 2 === (int) $attr[ 'grid_number' ] ) {
				ob_start();

				?>
					<div class="row row-tight">
						<div class="col-sm-6">
							<p><img src="<?php echo esc_url( vt_resize( $attr['photo1'], 371, 556, true ) ) ?>" alt="" class="img-responsive"></p>
						</div>
						<div class="col-sm-6">
							<p><img src="<?php echo esc_url( vt_resize( $attr['photo2'], 371, 556, true ) ) ?>" alt="" class="img-responsive"></p>
						</div>
					</div>
				<?php
				return ob_get_clean();
			} elseif ( 3 === (int) $attr[ 'grid_number' ] ) {
				ob_start();

				?>
				<div class="row row-tight">
					<div class="col-sm-4">
						<p><img src="<?php echo esc_url( vt_resize( $attr['photo1'], 247, 556, true ) ) ?>" alt="" class="img-responsive"></p>
					</div>
					<div class="col-sm-4">
						<p><img src="<?php echo esc_url( vt_resize( $attr['photo2'], 247, 556, true ) ) ?>" alt="" class="img-responsive"></p>
					</div>
					<div class="col-sm-4">
						<p><img src="<?php echo esc_url( vt_resize( $attr['photo3'], 247, 556, true ) ) ?>" alt="" class="img-responsive"></p>
					</div>
				</div>
				<?php
				return ob_get_clean();
			} elseif ( 4 === (int) $attr[ 'grid_number' ] ) {

				ob_start();

				?>
				<div class="row row-tight">
					<div class="col-sm-3">
						<p><img src="<?php echo esc_url( vt_resize( $attr['photo1'], 185, 556, true ) ) ?>" alt="" class="img-responsive"></p>
					</div>
					<div class="col-sm-3">
						<p><img src="<?php echo esc_url( vt_resize( $attr['photo2'], 185, 556, true ) ) ?>" alt="" class="img-responsive"></p>
					</div>
					<div class="col-sm-3">
						<p><img src="<?php echo esc_url( vt_resize( $attr['photo3'], 185, 556, true ) ) ?>" alt="" class="img-responsive"></p>
					</div>
					<div class="col-sm-3">
						<p><img src="<?php echo esc_url( vt_resize( $attr['photo4'], 185, 556, true ) ) ?>" alt="" class="img-responsive"></p>
					</div>
				</div>

				<?php
				return ob_get_clean();
			} elseif ( 6 === (int) $attr[ 'grid_number' ] ) {
				ob_start();

				?>
				<div class="row row-tight">
					<div class="col-sm-2">
						<p><img src="<?php echo esc_url( vt_resize( $attr['photo1'], 123, 556, true ) ) ?>" alt="" class="img-responsive"></p>
					</div>
					<div class="col-sm-2">
						<p><img src="<?php echo esc_url( vt_resize( $attr['photo2'], 123, 556, true ) ) ?>" alt="" class="img-responsive"></p>
					</div>
					<div class="col-sm-2">
						<p><img src="<?php echo esc_url( vt_resize( $attr['photo3'], 123, 556, true ) ) ?>" alt="" class="img-responsive"></p>
					</div>
					<div class="col-sm-2">
						<p><img src="<?php echo esc_url( vt_resize( $attr['photo4'], 123, 556, true ) ) ?>" alt="" class="img-responsive"></p>
					</div>
					<div class="col-sm-2">
						<p><img src="<?php echo esc_url( vt_resize( $attr['photo5'], 123, 556, true ) ) ?>" alt="" class="img-responsive"></p>
					</div>
					<div class="col-sm-2">
						<p><img src="<?php echo esc_url( vt_resize( $attr['photo6'], 123, 556, true ) ) ?>" alt="" class="img-responsive"></p>
					</div>
				</div><?php
				return ob_get_clean();
			}
	} );

	/**
	 * Register a UI for the Shortcode.
	 * Pass the shortcode tag (string)
	 * and an array or args.
	 */
	shortcode_ui_register_for_shortcode(
		'ech_photogrid',
		array(

			// Display label. String. Required.
			'label'         => 'Photo Grid',
			// Icon/attachment for shortcode. Optional. src or dashicons-$icon. Defaults to carrot.
			'listItemImage' => 'dashicons-format-gallery',
			'post_type'     => array( 'post' ),
			// Available shortcode attributes and default values. Required. Array.
			// Attribute model expects 'attr', 'type' and 'label'
			// Supported field types: text, checkbox, textarea, radio, select, email, url, number, and date.
			'attrs'         => array(

				array(
					'label' => 'Photo Number',
					'attr'  => 'grid_number',
					'type'  => 'select',
					'options'  => array(
						'2' => 'Two',
						'3' => 'Three',
						'4' => 'Four',
						'6' => 'Six',
					),
				),
				array(
					'label' => 'Photo',
					'attr'  => 'photo1',
					'type'  => 'attachment',
				),
				array(
					'label' => 'Photo',
					'attr'  => 'photo2',
					'type'  => 'attachment',
				),
				array(
					'label' => 'Photo',
					'attr'  => 'photo3',
					'type'  => 'attachment',
				),
				array(
					'label' => 'Photo',
					'attr'  => 'photo4',
					'type'  => 'attachment',
				),
				array(
					'label' => 'Photo',
					'attr'  => 'photo5',
					'type'  => 'attachment',
				),
				array(
					'label' => 'Photo',
					'attr'  => 'photo6',
					'type'  => 'attachment',
				),
			),
		)
	);

	add_action( 'enqueue_shortcode_ui', function () {
		wp_enqueue_script( 'ech-photogrid-ui', get_template_directory_uri() . '/js/admin/ech-photogrid.js' );
		wp_enqueue_style( 'ech-photogrid-ui', get_template_directory_uri() . '/assets/css/admin/ech-photogrid.css' );
	} );

	add_editor_style(get_template_directory_uri() . '/assets/css/editor-styles.css');

} );