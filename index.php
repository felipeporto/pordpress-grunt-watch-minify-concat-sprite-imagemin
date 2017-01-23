<?php
/**
 * The front page template file
 *
 * @package dc-blog
 */

get_header(); ?>

	<div id="primary" class="content-area">
		<main id="main" class="site-main" role="main">
	
			<div class="home-container clear">
				<section class="home-posts clear">
					<?php if ( have_posts() ) : ?>
						
						<?php 
							if (is_author()) : 
								$user_photo = get_field('foto', 'user_' . get_the_author_meta('ID'));
						?>
							<div class="author-box">
								<div class="clear">
									<?php if($user_photo) : ?>
										<div class="author-box-image">
											<img src="<?php echo $user_photo['sizes']['thumbnail'] ?>">										
										</div>
									<?php endif; ?>

									<div class="author-box-content">
										<h1 class="entry-title"><?php the_archive_title('', ''); ?></h1>
										
										<?php 
											$facebook_url = get_the_author_meta('facebook', $user->ID);
											$instagram_url = get_field('instagram_url', 'user_' . get_the_author_meta('ID'));
											$youtube_url = get_field('youtube_url', 'user_' . get_the_author_meta('ID'));
										?>

										<?php echo ($facebook_url) ? "<a href=\"{$facebook_url}\" class=\"fb-author\">Facebook</a>" : ''; ?>
										<?php echo ($instagram_url) ? "<a href=\"{$instagram_url}\" class=\"ig-author\">Instagram</a>" : ''; ?>
										<?php echo ($youtube_url) ? "<a href=\"{$youtube_url}\" class=\"yt-author\">YouTube</a>" : ''; ?>
										<?php echo ($user->user_url) ? "<a href=\"{$user->user_url}\" class=\"site-author\">" . preg_replace('(^https?://)', '', $user->user_url ) . "</a>" : ''; ?>
									</div>
								</div>

								<div class="entry-excerpt">
									<?php echo nl2br(get_the_author_meta('description')); ?>
								</div>

								<div class="count-posts">
									<?php echo count_user_posts(get_the_author_meta('ID') , 'post'); ?> Artigos Escritos
								</div>
							</div>
						<?php else: ?>
							<h1 class="entry-title single-title page-title"><span><?php the_archive_title('', ''); ?></span></h1>
						<?php endif; ?>
						
						<div class="post-list-content">
							<?php
								while (have_posts()) : the_post();
									get_template_part('template-parts/loop', get_post_type());
								endwhile;
							?>
						</div>

						<div class="more-posts-container">
							<a class="more-posts-link" href="<?php echo get_permalink(88); ?>" data-cpt="<?php echo get_post_type(); ?>" data-cpt-page="2" <?php if (is_category()) { echo 'data-cpt-cat="' . get_query_var('cat') . '"'; } ?>>+ Ainda mais</a>

							<div class="spinner">
								<div class="bounce1"></div>
								<div class="bounce2"></div>
								<div class="bounce3"></div>
							</div>
						</div>

						<?php 
							wp_pagenavi();
						else :
							get_template_part( 'template-parts/content', 'none' );
						endif; 
					?>
				</section><!-- .home-posts -->

				<?php get_sidebar(); ?>
			</div><!-- .home-container -->

		</main><!-- #main -->
	</div><!-- #primary -->

<?php
get_footer();
