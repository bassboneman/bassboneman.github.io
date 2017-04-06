<?php $related_posts = ech_get_related_posts( get_the_ID() ); ?>
<?php
foreach( $related_posts as $related_post ) {
  global $post;
  $post = $related_post;
  setup_postdata( $post );
  echo '<div class="col-md-3 col-sm-6">';
  get_template_part('template-parts/related-post-item');
  echo '</div>';
}
wp_reset_postdata();