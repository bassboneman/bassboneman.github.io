<div class="col-md-3 col-sm-6">
	<article class="story">
    <span class="story-img">
	    <?php if ( has_post_thumbnail() ) { ?>
	      <a href="<?php the_permalink() ?>">
		      <img class="img-responsive"
		           src="<?php echo esc_url( vt_resize( get_the_ID(), 466, 308, true ) ) ?>" alt="">
	      </a>
	    <?php } ?>
    </span>

		<h2><a href="<?php the_permalink() ?>"><?php the_title() ?></a></h2>

		<?php the_excerpt() ?>

		<p><a href="<?php the_permalink() ?>"><strong>Read More</strong></a></p>
	</article>
</div>