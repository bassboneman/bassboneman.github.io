<?php

function ech_the_intro() {
	$intro_text = get_post_meta( get_the_ID(), ECH_Post_Intro::$option_key, true );
	if ( trim( $intro_text ) ) {
		echo '<div class="intro">' .
	         wp_kses_post( $intro_text ) .
	         '</div>';
	}
}

/**
 * Calls the class on the post edit screen.
 */
function call_ECH_Post_Intro() {
	new ECH_Post_Intro();
}

if ( is_admin() ) {
	add_action( 'load-post.php', 'call_ECH_Post_Intro' );
	add_action( 'load-post-new.php', 'call_ECH_Post_Intro' );
}

class ECH_Post_Intro {

	public static $option_key = 'ech_post_intro';
	protected $nonce_field = 'ech_post_intro_nonce_field';
	protected $nonce_name = 'ech_post_intro_nonce';
	protected $allowed_post_types = array( 'post' );

	function __construct() {
		add_action( 'add_meta_boxes', array( $this, 'add_meta_box' ) );
		add_action( 'save_post', array( $this, 'save' ) );
	}

	function add_meta_box( $post_type ) {
		if ( in_array( $post_type, $this->allowed_post_types ) ) {
			add_meta_box(
				'ech_post_intro_metabox'
				, __( 'Intro', 'ech_textdomain' )
				, array( $this, 'render_meta_box_content' )
				, $post_type
				, 'advanced'
				, 'high'
			);
		}
	}

	function render_meta_box_content( $post ) {

// Add an nonce field so we can check for it later.
		wp_nonce_field( 'save_post_intro_value', $this->nonce_name );

// Use get_post_meta to retrieve an existing value from the database.
		$value = get_post_meta( $post->ID, self::$option_key, true );

// Display the form, using the current value.
		wp_editor( $value, 'ech_post_intro_field', array('media_buttons' => false) );


	}

	function save( $post_id ) {

// Check if our nonce is set.
		if ( ! isset( $_POST[ $this->nonce_name ] ) ) {
			return $post_id;
		}

		$nonce = $_POST[ $this->nonce_name ];

// Verify that the nonce is valid.
		if ( ! wp_verify_nonce( $nonce, 'save_post_intro_value' ) ) {
			return $post_id;
		}

		if ( defined( 'DOING_AUTOSAVE' ) && DOING_AUTOSAVE ) {
			return $post_id;
		}

		if ( ! current_user_can( 'edit_post', $post_id ) ) {
			return $post_id;
		}

		$post_intro = wp_kses_post( $_POST['ech_post_intro_field'] );

		if ( $post_intro ) {
			update_post_meta( $post_id, self::$option_key, $post_intro );
		}
	}
}