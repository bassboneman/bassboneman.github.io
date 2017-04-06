<?php

class ECH_Syndicate {

	protected static $rewrite_endpoint = 'embed';

	function __construct() {
		add_action( 'init', array( $this, 'embed_taxonomy_init' ) );
		add_action( 'init', array( $this, 'rewrite_init' ) );
		add_filter( 'template_include', array( $this, 'embeds_template' ), 99 );
	}

	function rewrite_init() {
		//adds api endpoint
		add_rewrite_endpoint( static::$rewrite_endpoint, EP_ROOT );
	}

	function embeds_template( $template ) {
		global $wp_query, $embeds_data;
		if ( ! empty( $wp_query->query_vars[ static::$rewrite_endpoint ] ) ) {
			$embed_type = sanitize_text_field( wp_unslash( $wp_query->query_vars[ static::$rewrite_endpoint ] ) );
			$data_type = sprintf('get_%s_data', $embed_type);
			$new_template = locate_template( array( sprintf('embed-%s.php', $embed_type ) ) );

			if ( ! empty( $new_template ) ) {
				show_admin_bar( false );
				wp_enqueue_script( 'ech-iframe-resizer', get_template_directory_uri() . '/bower_components/iframe-resizer/js/iframeResizer.contentWindow.min.js', array(), '3.4.2', true );
				if ( method_exists( $this, $data_type ) ) {
					$embeds_data = call_user_func_array( array( $this, $data_type ), array() );
				}
				return $new_template;
			}
		}
		return $template;
	}

	function get_featured_data() {
		$query = new WP_Query( array(
			'post_type' => 'post',
			'post_status' => 'publish',
			'no_found_rows' => true,
			'posts_per_page' => 4,
			'tax_query' => array(
				array(
					'taxonomy' => 'embeds',
					'field'    => 'slug',
					'terms'    => 'featured',
				),
			)
		) );

		$embed_type = get_term_by('slug', 'featured', 'embeds');
		$digested_data = array(
			'description' => $embed_type->description,
			'posts' => array()
		);

		foreach( $query->posts as $post ) {
			$image_obj = get_vt_resize( $post->ID, 466, 308, true );
			$digested_data['posts'][] = array(
				'id' => $post->ID,
				'title' => $post->post_title,
				'image' => $image_obj['url'],
				'permalink' => get_permalink( $post->ID ),
			);
		}

		return $digested_data;
	}

	function embed_taxonomy_init() {
		// create a new taxonomy
		register_taxonomy(
			'embeds',
			'post',
			array(
				'label' => esc_html__( 'Embed Types' ),
				'public' => false,
				'show_ui' => true,
				'rewrite' => false,
				'hierarchical' => true,
				'show_admin_column' => true,
			)
		);
	}
}

new ECH_Syndicate();
