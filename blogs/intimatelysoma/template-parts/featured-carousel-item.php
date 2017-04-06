<div class="item <?php echo sanitize_html_class( $active ) ?>">
	<a href="<?php the_permalink() ?>">
	<img class="carousel-img" src="<?php echo esc_url( vt_resize( get_the_ID(), 1066, 530, true ) ) ?>"
	     alt="">
	</a>

	<div class="carousel-caption">
		<h2><a href="<?php the_permalink() ?>"><?php the_title() ?></a></h2>
		<hr>
		<?php the_excerpt(); ?>
		<p><a href="<?php the_permalink() ?>" class="btn btn-primary btn-lg">Read More</a></p>
	</div>
</div>