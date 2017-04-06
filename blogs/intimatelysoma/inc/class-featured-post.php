<?php

class ECH_Featured_Post {

	protected $cache_key = 'ech_featured_posts';

	function get_posts( $count, $flush = false ) {
		if ( $flush || ( false === ( $posts = get_transient( $this->cache_key ) ) ) ) {
			$featured_query = new WP_Query( array(
				'post_type'      => 'post',
				'post_status'    => 'publish',
				'posts_per_page' => 100,
				'no_found_rows'  => true,
				'meta_query'     => array(
					array(
						'key'   => ECH_Featured_Post_Metabox::$option_key,
						'value' => 1,
					)
				)
			) );
			$posts          = $featured_query->posts;
			if ( $posts ) {
				set_transient( $this->cache_key, $posts );
			}
		}

		return ( $count > count( $posts ) ) ? $posts : array_slice( $posts, 0, $count );
	}
}

/**
 * Calls the class on the post edit screen.
 */
function call_ECH_Featured_Post_Metabox() {
	new ECH_Featured_Post_Metabox();
}

if ( is_admin() ) {
	add_action( 'load-post.php', 'call_ECH_Featured_Post_Metabox' );
	add_action( 'load-post-new.php', 'call_ECH_Featured_Post_Metabox' );
}

class ECH_Featured_Post_Metabox {

	public static $option_key = 'ech_featured_post';
	protected $nonce_field = 'ech_featured_post_nonce_field';
	protected $nonce_name = 'ech_featured_post_nonce';
	protected $allowed_post_types = array( 'post' );

	function __construct() {
		add_action( 'add_meta_boxes', array( $this, 'add_meta_box' ) );
		add_action( 'save_post', array( $this, 'save' ) );
	}

	function add_meta_box( $post_type ) {
		if ( in_array( $post_type, $this->allowed_post_types ) ) {
			add_meta_box(
				'ech_featured_post_metabox'
				, __( 'Feature Post', 'ech_textdomain' )
				, array( $this, 'render_meta_box_content' )
				, $post_type
				, 'side'
				, 'high'
			);
		}
	}

	function render_meta_box_content( $post ) {

		// Add an nonce field so we can check for it later.
		wp_nonce_field( 'save_featured_post_value', $this->nonce_name );

		// Use get_post_meta to retrieve an existing value from the database.
		$value = get_post_meta( $post->ID, self::$option_key, true );

		// Display the form, using the current value.
		echo '<input type="checkbox" id="ech_featured_field" name="ech_featured_field"';
		echo ' ' . checked( $value, 1 ) . ' />';
		echo '<label for="ech_featured_image_field">';
		esc_html_e( 'Check if post should be featured', 'ech_textdomain' );
		echo '</label> ';
	}

	function save( $post_id ) {

		// Check if our nonce is set.
		if ( ! isset( $_POST[ $this->nonce_name ] ) ) {
			return $post_id;
		}

		$nonce = $_POST[ $this->nonce_name ];

		// Verify that the nonce is valid.
		if ( ! wp_verify_nonce( $nonce, 'save_featured_post_value' ) ) {
			return $post_id;
		}

		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return $post_id;
		}

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return $post_id;
		}

		$featured = empty( $_POST['ech_featured_field'] ) ? 0 : 1;

		if ( $featured ) {
			update_post_meta( $post_id, self::$option_key, $featured );
		} else {
			delete_post_meta( $post_id, self::$option_key );
		}

		$featured_posts = new ECH_Featured_Post();
		$featured_posts->get_posts( 1, true );
	}
}