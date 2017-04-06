<?php
// set og:type and og:image based on page
if ( is_home() ) {
	$ogType  = "website";
} else {
	$ogType = "article";
	if ( has_post_thumbnail() ) {
		$src     = wp_get_attachment_image_src( get_post_thumbnail_id( $post->ID ), 'thumbnail' );
		$ogImage = $src[0];
	}
}

if ( is_author() ) {
	// get contributor avatar for OG:image
	global $wp_query;
	$curauth = ( isset( $_GET['ID'] ) ) ? get_user_by( 'slug', $author_name ) : get_userdata( intval( $author ) );
	$ogImage = get_the_author_meta( 'avatar', $curauth->ID );
}

if ( have_posts() ) : while ( have_posts() ) : the_post();
	$metaDescription = get_the_excerpt();
	$category        = get_the_category();
endwhile;
endif;

if ( is_home() ) {
	$metaDescription = "Visit the Intimately Soma blog for bra fit tips, interviews, inspiration, recipes and more.";
}

?>
<?php // get page URL to fix the category page stupidity where the first post is picked up instead of the category page URL
$url = "http://" . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI'];
?>
<!-- open graph data -->
<meta property="fb:admins" content=""/>
<meta property="og:type" content="<?php echo $ogType ?>"/>
<?php if ( is_home() ) { ?>
<meta property="og:title" content="Intimately, Soma – A beautiful blog"/>
<meta property="og:image" content="http://intimatelysoma.com/wp-content/uploads/2016/05/intimately-soma-og.jpg"/>
<?php } else { ?>
<?php if ( isset( $ogImage ) ) { ?>
	<?php /* HIDE SMALL OG:IMAGE FOR NOW <meta property="og:image" content="<?php echo $ogImage ?>" /> */ ?>
	<meta property="og:image" content="<?php vt_resize( get_the_ID(), 600, 315, true ) ?>"/>
<?php } ?>
<meta property="og:title" content="<?php wp_title( '|', true, 'right' ); ?>"/>
<?php } ?>
<meta property="og:site_name" content="Intimately, Soma"/>
<meta property="og:url" content="<?php echo $url ?>"/>
<?php /* HIDE PUBLISHER FOR NOW 

<meta property="article:publisher" content=""/>

*/ ?>


<?php if ( is_single() ) { ?>
	<?php if ( get_the_author_meta( 'facebook' ) ) { ?>
		<meta property="article:author" content="<?php the_author_meta( 'facebook' ); ?>"/>
	<?php } ?>
<?php } ?>

<?php if ( is_category() ) { ?>
	<meta property="og:description" content="<?php echo strip_tags( category_description() ); ?>"/>
<?php } else { ?>
	<meta property="og:description" content="<?php echo $metaDescription; ?>"/>
<?php } ?>
<meta property="og:locale" content="en_US"/>

<meta name="twitter:card" content="summary">
<meta name="twitter:site" content="@chicos">
<?php if ( get_the_author_meta( 'twitter' ) ) { ?>
	<meta name="twitter:creator" content="@<?php the_author_meta( 'twitter' ); ?>">
<?php } ?>
<meta name="twitter:image" content="<?php echo $ogImage ?>">
<?php if ( is_category() ) { ?>
	<meta name="twitter:description" content="<?php echo strip_tags( category_description() ); ?>"/>
<?php } else { ?>
	<meta name="twitter:description" content="<?php echo $metaDescription; ?>"/>
<?php } ?>

<!-- meta data -->
<meta name="keywords" content="<?php if ( is_page( 'Home' ) ) {
	echo '" "';
} else {
	$metaKeywords = get_the_tags();
	if ( $metaKeywords ) {
		$outputMetaKeywords = array();
		foreach ( $metaKeywords as $tag ) {
			echo $tag->name . ',';
			$outputMetaKeywords[] = $tag->name;
		}
	}
}
?><?php echo htmlspecialchars_decode( $category[0]->cat_name ); ?>"/>

<?php if ( is_category() ) { ?>
	<meta name="description" content="<?php echo strip_tags( category_description() ); ?>"/>
<?php } else { ?>
	<meta name="description" content="<?php echo $metaDescription; ?>"/>
<?php } ?>
<meta http-equiv="Content-Type" content="<?php bloginfo( 'html_type' ); ?>; charset=<?php bloginfo( 'charset' ); ?>"/>

<?php
	$shareData = array();
	$shareData['title'] = wp_title('|', false, 'right') ;
	$shareData['type'] = $ogType;
	$shareData['image'] = $ogImage;
	$shareData['description'] = $metaDescription;
	$shareData['url'] = $url;
	$shareData['keywords'] = $outputMetaKeywords;
?>
<script>
	var ech = {'shareData': <?php echo json_encode( $shareData ); ?> };

</script>