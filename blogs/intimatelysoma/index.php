<?php
/**
 * The main template file.
 *
 * @package ech
 */
$get_featured_posts = new ECH_Featured_Post();
$featured_posts     = $get_featured_posts->get_posts( 5 );


get_header(); ?>

<div id="carousel-home" class="carousel slide" data-ride="carousel">
	<div class="carousel-inner" role="listbox">
		<?php
		global $post;
		$active = 'active';
		$skip_ids = array();
		foreach ( $featured_posts as $post ) {
			setup_postdata( $post );
			include 'template-parts/featured-carousel-item.php';
			$active = '';
			$skip_ids[] = get_the_ID();
		}
		wp_reset_postdata();
		?>
	</div>
	<a class="left carousel-control" href="#carousel-home" role="button" data-slide="prev">
		<span class="fa fa-angle-left" aria-hidden="true"></span>
		<span class="sr-only">Previous</span>
	</a>
	<a class="right carousel-control" href="#carousel-home" role="button" data-slide="next">
		<span class="fa fa-angle-right" aria-hidden="true"></span>
		<span class="sr-only">Next</span>
	</a>
</div>

<div class="content">
	<div class="container-fluid">

		<hr class="hr-top">

		<div class="story-block">
			<?php if ( have_posts() ) : ?>
				<div class="row">
					<?php
					$count = 0;
					while ( have_posts() ) : the_post(); ?>
						<?php
							if ( in_array( get_the_ID(), $skip_ids ) ) continue ;
							if ( 12 === $count ) break;
							get_template_part( 'template-parts/article-grid-item', get_post_format() );

							$count ++;
							if ( 0 === ( $count % 4 ) ) {
								echo '</div><div class=\'row\'>';
							}
						?>
					<?php endwhile; ?>
				</div>
			<?php else : ?>

				<?php get_template_part( 'template-parts/content', 'none' ); ?>

			<?php endif; ?>
		</div>

	</div>
	<!-- .container-fluid -->
</div><!-- .content -->

<?php get_footer(); ?>
