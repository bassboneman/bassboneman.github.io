<?php
/**
 * The template for displaying the footer.
 *
 * Contains the closing of the #content div and all content after
 *
 * @package ech
 */

?>

		</div><!-- #content -->
	</main>
	<footer id="footer" role="contentinfo">
		<div class="container-fluid">
			<div class="footer-border">
				<div class="row">
					<div class="col-md-3">
						<a class="footer-logo" href="http://www.soma.com" target="_blank">
						  <svg class="svg-logo-footer">
						    <use xlink:href="#svg-logo-footer"></use>
							<svg>
						</a>
						<p>Join our mailing list and receive 10% off a future purchase. Plus, be the first to shop gorgeous new arrivals and special offers.</p>
						<p class="text-uppercase"><a href="https://www.soma.com/store/page.jsp?id=98&ICID=footer_emailSignupblog" target="_blank"><i class="fa fa-fw fa-envelope-o"></i>Sign up for email</a></p>
					</div>
					<div class="col-md-4 col-md-offset-2">
						<h4>About Soma</h4>
						<ul>
							<?php wp_nav_menu( array(
									'theme_location' => 'footer',
									'menu_id'        => 'footer-menu',
								)
							); ?>
						</ul>
					</div>
					<div class="col-md-3">
						<h4>Follow Us</h4>
						<div id="social">
							<a class="social-facebook" href="http://www.facebook.com/somaintimates" target="_blank"><i class="fa fa-facebook-official"></i></a>
							<a class="social-youtube" href="https://www.youtube.com/somaintimates" target="_blank"><i class="fa fa-youtube"></i></a>
							<a class="social-twitter" href="https://twitter.com/somaintimates" target="_blank"><i class="fa fa-twitter"></i></a>
							<a class="social-pinterest" href="http://pinterest.com/somaintimates/" target="_blank"><i class="fa fa-pinterest"></i></a>
							<a class="social-google-plus" href="https://plus.google.com/+SomaIntimates" target="_blank"><i class="fa fa-google-plus"></i></a>
							<a class="social-instagram" href="http://instagram.com/somaintimates#" target="_blank"><i class="fa fa-instagram"></i></a>
						</div>
					</div>
				</div>
			</div>
		</div>
	</footer>
</div><!-- #page -->

<?php wp_footer(); ?>

</body>
</html>
