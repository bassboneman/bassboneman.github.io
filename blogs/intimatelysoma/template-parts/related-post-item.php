<article class="story">
        <span class="story-img">
            <?php if ( has_post_thumbnail() ) { ?>
	            <a href="<?php the_permalink() ?>"><img class="img-responsive"
	                                                    src="<?php echo esc_url( vt_resize( get_the_ID(), 440, 290, true ) ) ?>"
	                                                    alt=""></a>
            <?php } ?>
        </span>

	<h3><a href="<?php the_permalink() ?>"><?php the_title() ?></a></h3>
</article>