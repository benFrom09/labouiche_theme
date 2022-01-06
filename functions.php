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

