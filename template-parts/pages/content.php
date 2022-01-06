<?php

/**
 * Template part for displaying posts
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package Labouiche
 */

?>
<div class="post-archive-container">

    <article id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
        <div class="row">
            <div class="col-lg-12">
                <h1 class="page-title underline">
                    <?php the_title(); ?>
                </h1>
                <?php if (get_field('special_infos')) : ?>
                    <div class="alert-danger special-infos">
                        <?= get_field('special_infos'); ?>
                    </div>
                <?php endif; ?>

            </div>

        </div>
        <div class="row">
            <div class="col-lg-12">
                <div class="post-content">
                    <?php the_content(); ?>
                </div>
            </div>

        </div>

    </article><!-- #post-<?php the_ID(); ?> -->
</div>