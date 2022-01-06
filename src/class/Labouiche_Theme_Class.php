<?php
/**
 * Labouiche Main Theme Functions
 */



 class Labouiche_Theme_Class
 {

    /**
     * Theme directory
     *
     * @var string
     */
    public $dir = LABOUICHE_THEME_DIR;

    public function __construct() {

        //define constant
        $this->labouiche_constants();

        //load required files

        $this->labouiche_load_required_files();

        //theme core set up

        add_action('after_setup_theme',[$this,'labouiche_setup_theme']);
        //register_script
        add_action('wp_enqueue_scripts', [$this,'labouiche_register_scripts']);

        //add navbar active class 
        add_filter('nav_menu_css_class', [$this,'labouiche_menu_add_active_class'], 10, 2);

    }

    /**
     * register theme constant 
     *
     * @return void
     */
    private function labouiche_constants():void {

        $version = self::labouiche_theme_version();

        define('LABOUICHE_THEME_VERSION',$version);

        //js images css assets path
        define('THEME_ASSETS',get_stylesheet_directory_uri(). '/assets');


        //text-domain for translation
        define('LABOUICHE_TEXT_DOMAIN','labouiche');

        //if woocommerce plugin has been activated
        define('WOOCOMMERCE_ACTIVE',class_exists('Woocommerce'));

    }

    /**
     * Load theme required files
     *
     * @return void
     */
    private function labouiche_load_required_files():void {
        //load required files here
    }

    /**
     * Get theme version
     *
     * @return string
     */
    public static function labouiche_theme_version():string {
        $theme = wp_get_theme();

        return $theme->get('Version');
    }

    /**
     * Core set up function
     *
     * @return void
     */
    public function labouiche_setup_theme():void {
        /*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on labouiche, use a find and replace
		 * to change 'labouiche' to the name of your theme in all the template files.
		 */
        load_theme_textdomain('LABOUICHE_TEXT_DOMAIN','LABOUICHE_THEME_DIR' . '/languages');

        // Add default posts and comments RSS feed links to head.
        add_theme_support('automatic-feed-links');

        /*
		 * Let WordPress manage the document title.
		 * By adding theme support, we declare that this theme does not use a
		 * hard-coded <title> tag in the document head, and expect WordPress to
		 * provide it for us.
		 */
        add_theme_support('title-tag');

        /*
		 * Enable support for Post Thumbnails on posts and pages.
		 *
		 * @link https://developer.wordpress.org/themes/functionality/featured-images-post-thumbnails/
		 */
        add_theme_support('post-thumbnails');

        // This theme uses wp_nav_menu() in one location.
        register_nav_menus(
            array(
               'menu-1' => esc_html__( 'Menu header gauche', 'labouiche' ),
               'menu-2' => esc_html__( 'Menu header droit', 'labouiche' ),
               'menu-3' => esc_html__( 'Menu header mobile', 'labouiche' ),
            )
        );

        /*
		 * Switch default core markup for search form, comment form, and comments
		 * to output valid HTML5.
		 */
        add_theme_support(
            'html5',
            array(
                'search-form',
                'comment-form',
                'comment-list',
                'gallery',
                'caption',
                'style',
                'script',
            )
        );

        // Add theme support for selective refresh for widgets.
        add_theme_support('customize-selective-refresh-widgets');

        /**
         * Add support for core custom logo.
         *
         * @link https://codex.wordpress.org/Theme_Logo
         */
        add_theme_support(
            'custom-logo',
            array(
                'height'      => 400,
                'width'       => 400,
                'flex-width'  => true,
                'flex-height' => true,
            )
        );

        /**
         * display full screen images in gutemberg 
         */
        add_theme_support('align-wide');

        //disable custom font-size
        add_theme_support('disable-custom-font-sizes');
        /**
         * The embed blocks automatically apply styles to embedded content to reflect the aspect ratio of content that is embedded in an iFrame
         */
        add_theme_support('responsive-embeds');

        remove_theme_support('widgets-block-editor');
    }

    /**
     * Enqueue scripts
     *
     * @return void
     */
    public function labouiche_register_scripts():void {

        wp_enqueue_style('labouiche-theme-style',get_stylesheet_uri(),array(),LABOUICHE_THEME_VERSION);
        wp_enqueue_style('bootstrap',"https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css",array(),'5.1.3');
        wp_enqueue_style('labouiche-main-style', LABOUICHE_THEME_URI . '/build/main.css', array(), LABOUICHE_THEME_VERSION);
        wp_enqueue_script('labouiche-js', LABOUICHE_THEME_URI . "/build/main.bundle.js", array(), LABOUICHE_THEME_VERSION, true);
    }

    /**
     * Add active class to menu li element
     *
     * @param array $classes
     * @param [type] $item
     * @return array
     */
    public function labouiche_menu_add_active_class(array $classes,$item):array {
        if (in_array('current-menu-item', $classes)|| in_array('current-page-ancestor', $classes) ) {

			$classes[] = 'active';
		}
		return $classes;
    }


    public static function labouiche_required_plugin() {

        //
    }

    public static function labouiche_display_carousel_from_acf() {
        $slides = self::labouiche_get_acf_history_galery();
        foreach($slides as $slide):
            ?>
                <div class="_carousel-item">
                    <div class="_carousel-item-img">
                        <img src="<?=$slide->image['value']['sizes']['medium']; ?>" alt="<?= $slide->image['value']['alt']; ?>">
                    </div>
                    <div class="_carousel-item-content">
                        <?= $slide->content['value']; ?>
                    </div>
                </div>
            <?php
        endforeach;
    }

    public static function labouiche_get_acf_history_galery () {
        $fields =  get_field_objects();
        $slides = [];
        if($fields):  
            for($i = 1; $i <= count($fields) / 2; $i++) {
                $slide = new stdClass();
                $slide->image = $fields['carousel_image_'.strval($i)];
                $slide->content  = $fields['carousel_content_'.strval($i)];
                $slides[] = $slide;
            }
        endif;
        return $slides;
    }


 }