<?php
/**
 * The template for displaying 404 pages (not found).
 *
 * @package ech
 */

get_header(); ?>

<div class="content">
	<div class="container-fluid">
		<h1>We're Sorry!</h1>

		<p>We can't find the page you're looking for.</p>

		<p>Go to <a href="<?php echo esc_url( home_url( '/' ) ); ?>"">Intimately Soma's homepage</a> for other great
			stories.</p>
	</div>
</div>

<?php get_footer();
