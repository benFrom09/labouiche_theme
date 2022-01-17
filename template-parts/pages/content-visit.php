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
            </div>      
        </div><!-- row -->
        <div class="row">
            <div class="col-lg-12">
                <div class="d-none d-md-none d-lg-block d-xl-block">
                    <?php require_once 'partials/visit-wide.php' ?>
                </div>
                <div class="d-block d-sm-block d-md-block d-lg-none d-xl-none">
                    <section class="timeline">
                        <?php the_content(); ?>
                    </section>
                </div>
            </div>
        </div>

    </article><!-- #post-<?php the_ID(); ?> -->
</div>