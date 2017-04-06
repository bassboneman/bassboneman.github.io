<article class="story search-item">
	<div class="row">
		<div class="col-sm-4">
			<a class="story-img" href="">
				<img class="img-responsive" src="<?php echo esc_url( vt_resize( get_the_ID(), 335, 218, true ) ) ?>" alt="">
			</a>
		</div>
		<div class="col-sm-8">
			<header><h2><a href="<?php the_permalink() ?>"><?php the_title() ?></a></h2></header>
			<p class="excerpt"><?php the_excerpt() ?></p>
			<p><a href="<?php the_permalink() ?>">Read More</a></p>
		</div>
	</div>
</article>