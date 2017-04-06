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

add_action( 'media_buttons', 'add_recipe_button' );
function add_recipe_button() {
	echo '<a href="#" id="insert-recipe" onclick="launchShortCakeEditor(\'ech_recipe\');" class="button">Add Recipe</a>';
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
	add_shortcode( 'ech_recipe', function ( $attr, $content = '' ) {

		$attr = wp_parse_args( $attr, array(
			'title'        => '',
			'summary'      => '',
			'ingredients'  => '',
			'instructions' => '',
			'prep_time'    => '',
			'cook_time'    => '',
			'yield'        => '',
			'photo' => '',
		) );

		$ingredients = explode("\n", strip_tags( $attr['ingredients'] ) );
		$instructions = explode("\n", strip_tags( $attr['instructions'] ) );

		ob_start();

		?>

		<div class="hrecipe">
			<h2 class="fn"><?php echo apply_filters( 'the_title', $attr['title'] ) ?></h2>

			<?php if ( $attr['photo'] ) { ?>
				<img src="<?php echo esc_url( vt_resize( $attr['photo'], 750, 455, true ) ) ?>" class="img-responsive" />
			<?php } ?>

			<?php if ( ! empty( $attr['summary'] ) ) { ?>
				<p class="summary"><?php echo wptexturize( wp_kses_post( $attr['summary'] ) ) ?></p>
			<?php } ?>

			<p class="details">
				<?php if ( ! empty( $attr['yield'] ) ) { ?>
					<span class="yield"><?php echo esc_html( $attr['yield'] ) ?></span><br>
				<?php } ?>
				<?php if ( ! empty( $attr['prep_time'] ) ) { ?>
					Time to prepare: <span class="duration"><?php echo esc_html( $attr['prep_time'] ) ?></span><br>
				<?php } ?>
				<?php if ( ! empty( $attr['cook_time'] ) ) { ?>
					Time to cook: <span class="duration"><?php echo esc_html( $attr['cook_time'] ) ?></span>
				<?php } ?>
			</p>
			<?php if ( ! empty( $ingredients ) ) { ?>
				<h3>Ingredients:</h3>
				<ul class="ingredients">
					<?php foreach( $ingredients as $ingredient ) : ?>
						<li class="ingredient"><?php echo wptexturize( esc_html( strip_tags( $ingredient ) ) ) ?></li>
					<?php endforeach; ?>
				</ul>
			<?php } ?>
			<?php if ( ! empty( $instructions ) ) { ?>
				<h3>Instructions:</h3>
				<ol class="instructions">
					<?php foreach( $instructions as $instruction ) : ?>
						<?php if ( empty( $instruction ) ) continue; ?>
						<li class="instruction"><?php echo wptexturize( esc_html( $instruction ) ) ?></li>
					<?php endforeach; ?>
				</ol>
			<?php } ?>
		</div>

		<?php

		return ob_get_clean();

	} );

	/**
	 * Register a UI for the Shortcode.
	 * Pass the shortcode tag (string)
	 * and an array or args.
	 */
	shortcode_ui_register_for_shortcode(
		'ech_recipe',
		array(

			// Display label. String. Required.
			'label'         => 'Recipe',
			// Icon/attachment for shortcode. Optional. src or dashicons-$icon. Defaults to carrot.
			'listItemImage' => 'dashicons-carrot',

			'post_type'     => array( 'post' ),
			// Available shortcode attributes and default values. Required. Array.
			// Attribute model expects 'attr', 'type' and 'label'
			// Supported field types: text, checkbox, textarea, radio, select, email, url, number, and date.
			'attrs'         => array(

				array(
					'label' => 'Name',
					'attr'  => 'title',
					'type'  => 'text',
					'meta'  => array(
						'placeholder' => 'Recipe Name',
						'data-test'   => 1,
					),
				),
				array(
					'label'    => 'Photo',
					'attr'     => 'photo',
					'type'     => 'attachment',
				),
				array(
					'label'    => 'Summary',
					'attr'     => 'summary',
					'type'     => 'textarea',
					'meta'  => array(
						'placeholder' => 'Summary goes here...',
					),
				),
				array(
					'label' => 'Yield',
					'attr'  => 'yield',
					'type'  => 'text',
					'meta'  => array(
						'placeholder' => '3 dozen cookies',
					),
				),
				array(
					'label' => 'Prep Time',
					'attr'  => 'prep_time',
					'type'  => 'text',
					'meta'  => array(
						'placeholder' => '15 minutes',
					),
				),
				array(
					'label' => 'Cook Time',
					'attr'  => 'cook_time',
					'type'  => 'text',
					'meta'  => array(
						'placeholder' => '40 minutes',
					),
				),
				array(
					'label'    => 'Ingredients (one per line)',
					'attr'     => 'ingredients',
					'type'     => 'textarea',
					'meta'  => array(
						'placeholder' => "1 egg\n3 cups milk",
					),
				),
				array(
					'label'    => 'Instructions (one per line)',
					'attr'     => 'instructions',
					'type'     => 'textarea',
					'meta'  => array(
						'placeholder' => "Beat egg\nAdd milk",
					),
				),
			),
		)
	);

} );