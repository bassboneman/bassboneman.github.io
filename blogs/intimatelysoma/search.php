<?php
/**
 * The template for displaying search results pages.
 *
 * @package ech
 */

get_header(); ?>
	<div class="content">
		<div class="container-fluid">
			<?php
			$top = 'top';
			include( 'template-parts/category-details.php' );
			$top = '';
			?>
			<div class="story-block">
				<?php if ( have_posts() ) : ?>
					<?php while ( have_posts() ) : the_post(); ?>
						<?php get_template_part( 'template-parts/archive-item', get_post_format() ); ?>
					<?php endwhile; ?>
				<?php else: ?>
					<?php get_template_part( 'template-parts/content-none', 'none' ); ?>
				<?php endif; ?>
			</div>
			<?php
			include( 'template-parts/category-details.php' );
			?>
		</div>
		<!-- .container-fluid -->
	</div><!-- .content -->

<?php get_footer();
