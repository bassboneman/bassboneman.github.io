<?php
$obj   = get_queried_object();

$total_post_count = $wp_query->found_posts;
if ( $obj ) {
	$name = ( 'WP_User' === get_class( $obj ) ) ? $obj->display_name : $obj->name;
}
$args  = array(
	'base'               => get_pagenum_link( 1 ) . '%_%',
	'format'             => 'page/%#%',
	'total'              => $wp_query->max_num_pages,
	'current'            => max( 1, get_query_var( 'paged' ) ),
	'show_all'           => false,
	'end_size'           => 1,
	'mid_size'           => 2,
	'prev_next'          => false,
	'prev_text'          => __( '«' ),
	'next_text'          => __( '»' ),
	'type'               => 'array',
	'add_args'           => false,
	'add_fragment'       => '',
	'before_page_number' => '',
	'after_page_number'  => ''
);

if ( $wp_rewrite->using_permalinks() ) {
	$args['base'] = user_trailingslashit( trailingslashit( remove_query_arg( 's', get_pagenum_link( 1 ) ) ) . 'page/%#%/', 'paged' );
}

if ( ! empty( $wp_query->query_vars['s'] ) ) {
	$args['add_args'] = array( 's' => get_query_var( 's' ) );
}

$paginate_links = paginate_links( $args );
if ( $paginate_links ) {
	$paginate_links = implode( ' ', $paginate_links );
}
?>
<div class="row">
	<div class="col-xs-12">
		<div class="category-details <?php echo sanitize_html_class( $top ) ?>">
			<div class="row">
				<div class="col-sm-6">
					<?php if ( trim( $name ) ) : ?>
						<span class="text-uppercase"><?php echo esc_html( $name ) ?></span>:
					<?php endif;?>
					<?php if ( is_search() ) { ?>
					<span class="text-uppercase">Results for <?php echo esc_html( get_search_query() ); ?></span>:
					<?php } ?>
					<?php echo intval( $total_post_count ) ?> <span class="text-uppercase">Articles</span>
				</div>
				<div class="col-sm-6">
					<div class="paging">
						<?php echo $paginate_links ?>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>