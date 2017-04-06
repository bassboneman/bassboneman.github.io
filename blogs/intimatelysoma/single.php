<?php
/**
 * The template for displaying all single posts.
 *
 * @package ech
 */

get_header(); ?>

<?php /*
  <div id="primary" class="content-area">
    <main id="main" class="site-main" role="main">

    <?php //while ( have_posts() ) : the_post(); ?>

      <?php //get_template_part( 'template-parts/content', 'single' ); ?>

      <?php //the_post_navigation(); ?>

      <?php
        // If comments are open or we have at least one comment, load up the comment template.
        //if ( comments_open() || get_comments_number() ) :
        //  comments_template();
        //endif;
      ?>

    <?php //endwhile; // End of the loop. ?>

    </main><!-- #main -->
  </div><!-- #primary -->
  */ ?>
  <div class="content">
  <div class="container-fluid">

  <hr class="hr-top">
  <?php while ( have_posts() ) : the_post(); ?>
    <article class="article">
      <header class="article-header">
        <?php if ( is_single() ) { ?>
          <div class="article-cat"><?php the_category( ' ', 'single' ) ?></div>
        <?php } ?>
        <h1><?php the_title() ?></h1>
        <hr>
        <?php if ( is_single() ) { ?>
          <time datetime="<?php echo get_the_date( 'Y-n-j' ) ?>"
                pubdate="<?php echo get_the_date( 'Y-n-j' ) ?>"><?php the_date() ?></time>
        <?php } ?>
      </header>
      <section class="article-body">
        <?php ech_the_intro() ?>
        <?php the_content() ?>
      </section>
      <footer class="article-footer">

				<?php
					$hastags = get_the_tags();
					if ( $hastags ) {
				?>
	        <div class="article-labels">
	          <span>Labels:</span> <?php the_tags( '' ) ?>
	        </div>
				<?php 
					}
				?>
      </footer>
    </article>
    <?php $previous_post_link = get_previous_post_link( '%link', '<i class="fa fa-angle-left"></i> Previous Article' ); ?>
    <?php $next_post_link = get_next_post_link( '%link', 'Next Article <i class="fa fa-angle-right"></i>' ); ?>
    <div class="share">
      <div class="share-btns" data-text="<?php echo esc_attr( get_the_title() ) ?>"
           data-url="<?php echo esc_url( get_the_permalink() ) ?>" style="display:inline-block;">
        <!-- Share buttons and counts populated by sharrre js -->
      </div>

      <div class="share-widget-email" title="Email this article">
        <a class="box"
           href="mailto:?subject=Special Delivery From InsideChic&amp;body=Hi,%0D%0A%0D%0AI thought you'd love this story from Chico's blog, InsideChic, as much as I did. Enjoy!%0D%0A%0D%0A<?php echo esc_url( get_the_permalink() ) ?>"
           data-track="" data-track-label="Share - Email">
          <i class="fa fa-fw fa-envelope"></i>
          <span>Email</span>
        </a>
      </div>

      <div class="share-widget-comment" title="Comment">
        <a class="box" href="#comments">
          <i class="fa fa-fw fa-comment"></i>
          <span>Comment</span>
        </a>
      </div>

    </div>
  <?php endwhile; // End of the loop. ?>
  <div class="story-related">
    <h2 class="text-center">You May Also Like</h2>
    <div class="row">
      <?php get_template_part( 'template-parts/related-posts' ) ?>
    </div>
  </div>

  <?php if ( comments_open() || get_comments_number() ) : ?>
    <div class="comment-wrap">
      <a name="comments"></a>
      <?php comments_template(); ?>
    </div>
  <?php endif; ?>

  <nav class="article-nav">
    <div class="row">
      <div class="col-sm-4 article-nav-prev">
        <?php echo $previous_post_link ?>
      </div>
      <div class="col-sm-4 article-nav-cat">
        <?php $category = get_the_category();
        $category       = $category[0];
        ?>
        <a href="<?php echo esc_url( get_category_link( $category->term_id ) ) ?>">Back
          to <?php echo esc_html( $category->name ) ?></a>
      </div>
      <div class="col-sm-4 article-nav-next">
        <?php echo $next_post_link ?>
      </div>
    </div>
  </nav>
<?php get_footer();
