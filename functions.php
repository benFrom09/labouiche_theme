<?php

/**
 * Labouiche functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Labouiche
 */

//exit if accessed directly 
if (!defined('ABSPATH')) {
	exit;
}
//
if (!defined('_S_VERSION')) {
	// Replace the version number of the theme on each release.
	define('_S_VERSION', '1.0.0');
}

//path theme dir constants

define('LABOUICHE_THEME_DIR', get_template_directory());
define('LABOUICHE_THEME_URI', get_template_directory_uri());

require_once 'src/class/Labouiche_Theme_Class.php';

new Labouiche_Theme_Class();


if(!function_exists('labouiche_add_favicon')) {
    /**
     * ADD favicon link to header
     *
     * @return void
     */
    function labouiche_add_favicon():void {
        echo '<link rel="shortcut icon" type="image/x-icon" href="'.get_template_directory_uri().'/assets/img/favicon.ico" />';
    }
    
    //add_action('wp_head', 'labouiche_add_favicon');
}
function labouiche_visit_cpt() {

	/* visit */
	$labels = array(
		'name'                => _x('visits', 'Post Type General Name', 'labouiche'),
		'singular_name'       => _x('visit', 'Post Type Singular Name', 'labouiche'),
		'menu_name'           => __('visits', 'labouiche'),
		'name_admin_bar'      => __('visits', 'labouiche'),
		'parent_item_colon'   => __('Parent Item:', 'labouiche'),
		'all_items'           => __('All Items', 'labouiche'),
		'add_new_item'        => __('Add New Item', 'labouiche'),
		'add_new'             => __('Add New', 'labouiche'),
		'new_item'            => __('New Item', 'labouiche' ),
		'edit_item'           => __('Edit Item', 'labouiche'),
		'update_item'         => __('Update Item', 'labouiche'),
		'view_item'           => __('View Item', 'labouiche'),
		'search_items'        => __('Search Item', 'labouiche'),
		'not_found'           => __('Not found', 'labouiche'),
		'not_found_in_trash'  => __('Not found in Trash', 'labouiche'),
	);
	$rewrite = array(
		'slug'                => _x('visit', 'visit', 'labouiche'),
		'with_front'          => true,
		'pages'               => true,
		'feeds'               => false,
	);
	$args = array(
		'label'               => __('visit', 'labouiche'),
		'description'         => __('visits', 'labouiche'),
		'labels'              => $labels,
		'supports'            => array('title', 'editor', 'thumbnail', 'comments', 'revisions', 'custom-fields'),
		'taxonomies'          => array('visit_type'),
		'hierarchical'        => false,
		'public'              => true,
		'show_ui'             => true,
		'show_in_menu'        => true,
		'menu_position'       => 5,
		'menu_icon'           => 'dashicons-admin-home',
		'show_in_admin_bar'   => true,
		'show_in_nav_menus'   => true,
		'can_export'          => true,
		'has_archive'         => false,
		'exclude_from_search' => false,
		'publicly_queryable'  => true,
		'query_var'           => 'visit',
		'rewrite'             => $rewrite,
		'capability_type'     => 'page',
	);
	register_post_type('visit', $args);	
}

add_action('init', 'labouiche_visit_cpt', 10);
/*
function labouiche_add_custom_post_types($query) {
   
    //var_dump(is_page_template( $template ));wp_die();
    if ( is_front_page() && $query->is_main_query() ) {
        var_dump('TEMPLTE');wp_die();
        $query->set( 'post_type', array('post','page', 'visit' ) );
    }
    return $query;
}
add_action('pre_get_posts', 'labouiche_add_custom_post_types');
*/