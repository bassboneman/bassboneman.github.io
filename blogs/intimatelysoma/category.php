<?php
get_header();

?>
	<div class="content">
		<div class="container-fluid">

			<?php
				$top = 'top';
				include('template-parts/category-details.php');
				$top = '';
			?>

			<div class="story-block">
				<?php if ( have_posts() ) : ?>
					<div class="row">
						<?php
						$count = 0;
						while ( have_posts() ) : the_post(); ?>
							<?php
							get_template_part( 'template-parts/article-grid-item', get_post_format() );
							?>
							<?php
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

			<?php include( 'template-parts/category-details.php' ); ?>

		</div>
		<!-- .container-fluid -->
	</div><!-- .content -->
<?php
get_footer();