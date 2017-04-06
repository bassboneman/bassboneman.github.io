<?php
/**
 * ech functions and definitions
 *
 * @package ech
 */

if ( ! function_exists( 'ech_setup' ) ) :
	/**
	 * Sets up theme defaults and registers support for various WordPress features.
	 *
	 * Note that this function is hooked into the after_setup_theme hook, which
	 * runs before the init hook. The init hook is too late for some features, such
	 * as indicating support for post thumbnails.
	 */
	function ech_setup() {
		/*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on ech, use a find and replace
		 * to change 'ech' to the name of your theme in all the template files
		 */
		load_theme_textdomain( 'ech', get_template_directory() . '/languages' );

		// Add default posts and comments RSS feed links to head.
		add_theme_support( 'automatic-feed-links' );

		/*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
		add_theme_support( 'title-tag' );

		/*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link http://codex.wordpress.org/Function_Reference/add_theme_support#Post_Thumbnails
		 */
		add_theme_support( 'post-thumbnails' );

		// This theme uses wp_nav_menu() in one location.
		register_nav_menus( array(
			'primary' => esc_html__( 'Primary Menu', 'ech' ),
			'footer'  => esc_html__( 'Footer Menu', 'ech' ),
		) );

		/*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
		add_theme_support( 'html5', array(
			'search-form',
			'comment-form',
			'comment-list',
			'gallery',
			'caption',
		) );

		/*
		 * Enable support for Post Formats.
		 * See http://codex.wordpress.org/Post_Formats
		 */
		// add_theme_support( 'post-formats', array(
		//   'aside',
		//   'image',
		//   'video',
		//   'quote',
		//   'link',
		// ) );

		// Set up the WordPress core custom background feature.
		add_theme_support( 'custom-background', apply_filters( 'ech_custom_background_args', array(
			'default-color' => 'ffffff',
			'default-image' => '',
		) ) );

		if( function_exists('taxonomy_image_plugin_activate') ) {
			taxonomy_image_plugin_activate();
		}
	}
endif; // ech_setup
add_action( 'after_setup_theme', 'ech_setup' );

/**
 * Set the content width in pixels, based on the theme's design and stylesheet.
 *
 * Priority 0 to make it available to lower priority callbacks.
 *
 * @global int $content_width
 */
function ech_content_width() {
	$GLOBALS['content_width'] = apply_filters( 'ech_content_width', 640 );
}

add_action( 'after_setup_theme', 'ech_content_width', 0 );

/**
 * Register widget area.
 *
 * @link http://codex.wordpress.org/Function_Reference/register_sidebar
 */
function ech_widgets_init() {
	register_sidebar( array(
		'name'          => esc_html__( 'Sidebar', 'ech' ),
		'id'            => 'sidebar-1',
		'description'   => '',
		'before_widget' => '<aside id="%1$s" class="widget %2$s">',
		'after_widget'  => '</aside>',
		'before_title'  => '<h1 class="widget-title">',
		'after_title'   => '</h1>',
	) );
}

add_action( 'widgets_init', 'ech_widgets_init' );

/**
 * Enqueue scripts and styles.
 */
function ech_scripts() {
  if ( get_query_var( 'embed' ) ) {
	  wp_enqueue_style( 'ech-style', get_template_directory_uri() . '/assets/css/embeds.css', array(), '2.1' );
    wp_enqueue_script( 'ech-typekit', '//use.typekit.net/tfa1zps.js', array() );
    wp_enqueue_script( 'ech-head-scripts', get_template_directory_uri() . '/assets/js/head-scripts.js', array( 'ech-typekit' ), false, false );
  } else {
    wp_enqueue_style( 'ech-style', get_template_directory_uri() . '/assets/css/styles.css', array(), '5.0.4' );
    // wp_enqueue_style( 'ech-typography', '//cloud.typography.com/6629674/695488/css/fonts.css', array(), '4.8' );
    wp_enqueue_style( 'ech-typography', '//fonts.googleapis.com/css?family=Source+Sans+Pro:400,300,300italic,400italic,600,600italic' );
    wp_enqueue_style( 'ech-fontawesome', '//netdna.bootstrapcdn.com/font-awesome/4.6.3/css/font-awesome.min.css?ver=4.6.3', array() );

    // wp_enqueue_script( 'ech-typekit', '//use.typekit.net/tfa1zps.js', array() );
    wp_enqueue_script( 'ech-head-scripts', get_template_directory_uri() . '/assets/js/head-scripts.js', array( 'ech-typekit' ), false, false );

    wp_enqueue_script( 'ech-navigation', get_template_directory_uri() . '/js/navigation.js', array(), '20120206', true );

    wp_enqueue_script( 'ech-skip-link-focus-fix', get_template_directory_uri() . '/js/skip-link-focus-fix.js', array(), '20130115', true );

    wp_enqueue_script( 'ech-bootstrap', get_template_directory_uri() . '/assets/js/bootstrap.min.js', array( 'jquery' ), false, true );
    wp_enqueue_script( 'ech-photo-carousel', get_template_directory_uri() . '/assets/js/photo-carousel.js', array( 'jquery' ), false, true );

    wp_enqueue_script( 'sharrre', get_template_directory_uri() . '/lib/sharrre/jquery.sharrre.min.js', array( 'jquery' ), false, true );
    wp_localize_script( 'sharrre', 'sharrre', array(
      'curlUrl' => get_template_directory_uri() . '/lib/sharrre/sharrre.php',
      'theUrl'  => get_the_permalink(),
    ) );

    wp_enqueue_script( 'ech-gigya-remote', 'https://cdns.gigya.com/js/socialize.js?apiKey=3_xh_qvnfeK89RAq1aVfXKOH5LfbA3ImSNFoTwEoNLMS2Sn28n5NhB_0LBuQj7vWpQ', array(), false, true );
    wp_enqueue_script( 'ech-gigya', get_template_directory_uri() . '/assets/js/gigya.js', array(
      'jquery',
      'ech-gigya-remote'
    ), false, true );
    wp_localize_script( 'ech-gigya', 'chicos', array( 'template_path' => get_template_directory_uri() ) );

    wp_enqueue_script( 'ech-site', get_template_directory_uri() . '/assets/js/site.js', array(
      'jquery',
      'ech-photo-carousel'
    ), '4.8', false, true );

    if ( is_singular() && comments_open() && get_option( 'thread_comments' ) ) {
      wp_enqueue_script( 'comment-reply' );
    }
  }
}

add_action( 'wp_enqueue_scripts', 'ech_scripts' );

/**
 * Implement the Custom Header feature.
 */
require get_template_directory() . '/inc/custom-header.php';

/**
 * Custom template tags for this theme.
 */
require get_template_directory() . '/inc/template-tags.php';

/**
 * Custom functions that act independently of the theme templates.
 */
require get_template_directory() . '/inc/extras.php';

/**
 * Customizer additions.
 */
require get_template_directory() . '/inc/customizer.php';

/**
 * Load Jetpack compatibility file.
 */
require get_template_directory() . '/inc/jetpack.php';

/**
 * Load featured post metabox.
 */
require get_template_directory() . '/inc/class-featured-post.php';

/**
 * Load syndication features
 */
require get_template_directory() . '/inc/class-syndicate.php';

/**
 * Load post intro metabox.
 */
require get_template_directory() . '/inc/class-post-intro.php';

require get_template_directory() . '/inc/vt-resize.php';

require get_template_directory() . '/inc/gallery-shortcode.php';

require get_template_directory() . '/plugins/taxonomy-images/taxonomy-images.php';

require get_template_directory() . '/plugins/tweaked-shortcode-ui/shortcode-ui.php';

require get_template_directory() . '/inc/shortcake-recipe-shortcode.php';

require get_template_directory() . '/inc/shortcake-photogrid-shortcode.php';

function main_menu_nav_wrap() {
	// default value of 'items_wrap' is <ul id="%1$s" class="%2$s">%3$s</ul>'

	// open the <ul>, set 'menu_class' and 'menu_id' values
	$wrap = '<ul id="%1$s" class="%2$s">';

	$wrap .= '<li class="menu-close"><span data-toggle="offcanvas"><i class="fa fa-times"></i></span></li>';

	// get nav items as configured in /wp-admin/
	$wrap .= '%3$s';

	// the static link
	$wrap .= _nav_search_form_markup();

	// close the <ul>
	$wrap .= '</ul>';

	// return the result
	return $wrap;
}

function _nav_search_form_markup() {
	ob_start();
	include( 'template-parts/header-search-box.php' );

	return ob_get_clean();
}

add_filter( 'excerpt_length', 'ech_excerpt_length', 999 );
function ech_excerpt_length( $length ) {
	return 15;
}

add_filter( 'the_excerpt', 'ech_excerpt', 11 );
function ech_excerpt( $excerpt ) {
	return str_replace( '<p>', '<p class=\'excerpt\'>', $excerpt );
}

add_filter( 'image_send_to_editor', 'ech_html5_insert_image', 10, 9 );
function ech_html5_insert_image( $html, $id, $caption, $title, $align, $url, $size, $alt ) {
	preg_match( '@src="([^"]+)"@', $html, $match );
	$url           = empty( $url ) ? array_pop( $match ) : $url;
	$caption_class = ( $caption ) ? 'wp-caption' : '';
	$html5         = "<figure id='post-$id-media-$id' class='align$align $caption_class'>";
	$html5 .= "<img src='$url' alt='$title' class='wp-image-$id align$align img-responsive' />";
	if ( $caption ) {
		$html5 .= "<figcaption class='wp-caption-text'>$caption</figcaption>";
	}
	$html5 .= "</figure>";

	return $html5;
}

add_filter('the_content', 'add_image_responsive_class');
function add_image_responsive_class($content) {
   global $post;
   $pattern ="/<img(.*?)class=\"(.*?)\"(.*?)>/i";
   $replacement = '<img$1class="$2 img-responsive"$3>';
   $content = preg_replace($pattern, $replacement, $content);
   return $content;
}

add_filter( 'the_category', 'ech_the_category_filter', 10, 2 );
function ech_the_category_filter( $list, $separator = ' ' ) {
	return $list;
}

function ech_get_related_posts( $post_id, $flush = false ) {
	$cache_key = 'related_posts_' . $post_id;

	if ( $flush || false === ( $related_posts = get_transient( $cache_key ) ) ) {
		$tags_ids = wp_get_post_tags( $post_id, array( 'fields' => 'ids' ) );
		$tag_posts = array();
		if ( $tags_ids ) {
			$args      = array(
				'tag__in'        => $tags_ids,
				'post__not_in'   => array( $post_id ),
				'posts_per_page' => 4, // Number of related posts that will be displayed.
			);
			$query     = new WP_Query( $args );
			$tag_posts = $query->posts;
		}

		$category_posts = array();
		if ( 4 > count( $tag_posts ) ) {
			$category_ids   = wp_get_post_categories( $post_id, array( 'fields' => 'ids' ) );
			$args           = array(
				'category__in'   => $category_ids,
				'post__not_in'   => array( $post_id ),
				'posts_per_page' => 4, // Number of related posts that will be displayed.
			);
			$query          = new WP_Query( $args );
			$category_posts = $query->posts;
		}

		$related_posts = ( $tag_posts ) ? array_merge( $tag_posts, $category_posts ) : $category_posts;
		set_transient( $cache_key, $related_posts, 60 * 60 * 5 );
	}

	return array_slice( $related_posts, 0, 4 );
}

add_filter( 'embed_oembed_html', 'ech_responsive_embeds', 99, 4 );
function ech_responsive_embeds( $html, $url, $attr, $post_id ) {
	return '<div class="embed-responsive embed-responsive-16by9">' . $html . '</div>';
}

function ech_pre_get_posts( $query ) {
	if ( $query->is_home() && $query->is_main_query() ) {
		$query->set( 'posts_per_page', 17 );
	}

	return $query;
}

add_filter( 'pre_get_posts', 'ech_pre_get_posts' );


// replace the default posts feed with feedburner
function ech_custom_rss_feed( $output, $feed ) {
	if ( strpos( $output, 'comments' ) ) {
		return $output;
	}

	return esc_url( 'http://feeds.feedburner.com/IntimatelySoma' );
}

add_action( 'feed_link', 'ech_custom_rss_feed', 10, 2 );


// add images to RSS feed (with styling)
function featuredtoRSS($content) {
  global $post;
  if ( has_post_thumbnail( $post->ID ) ){
    $content = '' . get_the_post_thumbnail( $post->ID, 'thumbnail', array( 'style' => 'float:left; margin:0 15px 5px 0;' ) ) . '' . $content . ' <a href="' . get_permalink() . '">Read More</a>';
  }
  return $content;
}
add_filter('the_excerpt_rss', 'featuredtoRSS');
add_filter('the_content_feed', 'featuredtoRSS');

// MAKE EMBEDDED VIDEOS RESPONSIVE - ADDED BY CB
add_filter( 'embed_oembed_html', 'custom_oembed_filter', 10, 4 ) ;

function custom_oembed_filter($html, $url, $attr, $post_ID) {
    $return = '<div class="embed-responsive embed-responsive-16by9">'.$html.'</div>';
    return $return;
}



// a comment callback function to create comment list
if ( ! function_exists( 'gdlr_comment_list' ) ) {
	function gdlr_comment_list( $comment, $args, $depth ) {
		global $theme_option;
		$icon_class = array( 'date' => 'fa fa-clock-o', 'reply' => 'fa fa-mail-reply' );


		$GLOBALS['comment'] = $comment;
		switch ( $comment->comment_type ) {
			case 'pingback' :
			case 'trackback' :
				?>
				<li <?php comment_class(); ?> id="comment-<?php comment_ID(); ?>">
				<p><?php _e( 'Pingback :', 'gdlr_translate' ); ?><?php comment_author_link(); ?><?php edit_comment_link( __( '(Edit)', 'gdlr_translate' ), '<span class="edit-link">', '</span>' ); ?></p>
				<?php break; ?>

			<?php default :
			global $post; ?>
		<li <?php comment_class(); ?> id="li-comment-<?php comment_ID(); ?>">
			<article id="comment-<?php comment_ID(); ?>" class="comment-article">
				<div class="comment-avatar"><?php echo get_avatar( $comment, 60 ); ?></div>
				<div class="comment-body">
					<header class="comment-meta">
						<div class="comment-author gdlr-title"><?php echo get_comment_author_link(); ?></div>
						<div class="comment-time">
							<i class="<?php echo $icon_class['date']; ?>"></i>
							<a href="<?php echo esc_url( get_comment_link( $comment->comment_ID ) ); ?>">
								<time datetime="<?php echo get_comment_time( 'c' ); ?>">
									<?php echo get_comment_date() . ' ' . __( 'at', 'gdlr_translate' ) . ' ' . get_comment_time(); ?>
								</time>
							</a>
						</div>
						<div class="comment-reply">
							<?php comment_reply_link( array_merge( $args, array( 'before'     => ' <i class="' . $icon_class['reply'] . '"></i>',
							                                                     'reply_text' => __( 'Reply', 'gdlr_translate' ),
							                                                     'depth'      => $depth,
							                                                     'max_depth'  => $args['max_depth']
							) ) ); ?>
						</div>
						<!-- reply -->
					</header>

					<?php if ( '0' == $comment->comment_approved ) { ?>
						<p class="comment-awaiting-moderation"><?php echo __( 'Your comment is awaiting moderation.', 'gdlr_translate' ); ?></p>
					<?php } ?>

					<section class="comment-content">
						<?php comment_text(); ?>
						<?php edit_comment_link( __( 'Edit', 'gdlr_translate' ), '<p class="edit-link">', '</p>' ); ?>
					</section>
					<!-- comment-content -->

				</div>
				<!-- comment-body -->
			</article>
			<!-- comment-article -->
			<?php
			break;
		}
	}
}

// Update ellipsis on excerpts (remove "[]")
function new_excerpt_more($more) {
	return '...';
}
add_filter('excerpt_more', 'new_excerpt_more');
