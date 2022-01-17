<?php

/**
 * Labouiche Main Theme Functions
 */



class Labouiche_Theme_Class
{


    public function __construct()
    {

        //define constant
        $this->labouiche_constants();

        //load required files

        $this->labouiche_load_required_files();

        //theme core set up

        add_action('after_setup_theme', [$this, 'labouiche_setup_theme']);
        //register_script
        add_action('wp_enqueue_scripts', [$this, 'labouiche_register_scripts']);
        //register_widget action
        add_action('widgets_init', [$this, 'labouiche_register_widgets']);

        //add navbar active class 
        add_filter('nav_menu_css_class', [$this, 'labouiche_menu_add_active_class'], 10, 2);
    }

    /**
     * register theme constant 
     *
     * @return void
     */
    private function labouiche_constants(): void
    {

        $version = self::labouiche_theme_version();

        define('LABOUICHE_THEME_VERSION', $version);

        //js images css assets path
        define('THEME_ASSETS', get_stylesheet_directory_uri() . '/assets');


        //text-domain for translation
        define('LABOUICHE_TEXT_DOMAIN', 'labouiche');

        //if woocommerce plugin has been activated
        define('WOOCOMMERCE_ACTIVE', class_exists('Woocommerce'));
    }

    /**
     * Load theme required files
     *
     * @return void
     */
    private function labouiche_load_required_files(): void
    {
        //load required files here
        if (WOOCOMMERCE_ACTIVE) {
            require_once dirname(__DIR__) . '/woocommerce/Woocommerce_Setup_Class.php' ;

            new Woocommerce_Setup_Class();
            
        }
    }

    /**
     * Get theme version
     *
     * @return string
     */
    public static function labouiche_theme_version(): string
    {
        $theme = wp_get_theme();

        return $theme->get('Version');
    }

    /**
     * Core set up function
     *
     * @return void
     */
    public function labouiche_setup_theme(): void
    {
        /*
		 * Make theme available for translation.
		 * Translations can be filed in the /languages/ directory.
		 * If you're building a theme based on labouiche, use a find and replace
		 * to change 'labouiche' to the name of your theme in all the template files.
		 */
        load_theme_textdomain('LABOUICHE_TEXT_DOMAIN', 'LABOUICHE_THEME_DIR' . '/languages');

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
                'menu-1' => esc_html__('Menu header gauche', 'labouiche'),
                'menu-2' => esc_html__('Menu header droit', 'labouiche'),
                'menu-3' => esc_html__('Menu header mobile', 'labouiche'),
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
    public function labouiche_register_scripts(): void
    {

        wp_enqueue_style('labouiche-theme-style', get_stylesheet_uri(), array(), LABOUICHE_THEME_VERSION);
        wp_enqueue_style('bootstrap', "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css", array(), '5.1.3');
        wp_enqueue_style('labouiche-main-style', LABOUICHE_THEME_URI . '/build/main.css', array(), LABOUICHE_THEME_VERSION);
        wp_enqueue_script('labouiche-js', LABOUICHE_THEME_URI . "/build/main.bundle.js", array(), LABOUICHE_THEME_VERSION, true);
    }

    /**
     * Register sidebar
     */

    public function labouiche_register_widgets() {
        register_sidebar(array(
            'name'          => esc_html__('Sidebar Left', 'labouiche'),
            'id'            => 'sidebar-left',
            'description'   => '',
            'before_widget' => '<div id="%1$s" class="widget %2$s">',
            'after_widget'  => '</div>',
            'before_title'  => '<h2 class="widget-title">',
            'after_title'   => '</h2>'
        ));
    }

    /**
     * Add active class to menu li element
     *
     * @param array $classes
     * @param [type] $item
     * @return array
     */
    public function labouiche_menu_add_active_class(array $classes, $item): array
    {
        if (in_array('current-menu-item', $classes) || in_array('current-page-ancestor', $classes)) {

            $classes[] = 'active';
        }
        return $classes;
    }


    public static function labouiche_required_plugin()
    {

        //
    }

    /**
     * Set HTML of carousel from acf register data on history page
     *
     * @return void
     */
    public static function labouiche_display_carousel_from_acf()
    {
        $slides = self::labouiche_get_acf_history_galery();
        foreach ($slides as $slide) :
?>
            <div class="_carousel-item">
                <div class="_carousel-item-img">
                    <img src="<?= esc_url($slide->image['value']['sizes']['medium']); ?>" alt="<?= esc_attr($slide->image['value']['alt']); ?>" description="<?= esc_attr($slide->image['value']['description']); ?>">
                </div>
                <div class="_carousel-item-content">
                    <?= $slide->content['value']; ?>
                </div>
            </div>
        <?php
        endforeach;
    }

    /**
     * Convert array of data to array of pair data object
     * 
     * ex:array[a-1,b-1,a-2,b-2,a-3,b-3,...] => [stdclass->a1/b1,stdclass->a2/b2,...];
     *
     * @return array 
     */
    public static function labouiche_get_acf_history_galery(): array
    {
        $fields =  get_field_objects();
        $slides = [];
        if ($fields) :
            for ($i = 1; $i <= ceil(count($fields) / 2); $i++) {
                $slide = new stdClass();
                $slide->image = $fields['carousel_image_' . strval($i)];
                $slide->content  = $fields['carousel_content_' . strval($i)];
                $slides[] = $slide;
            }
        endif;
        return $slides;
    }

    /**
     * Set html of inteactive visit on visit page
     *
     * @return void
     */
    public static function set_interactive_map_image_points()
    {
        $image_dir = THEME_ASSETS . '/img';
        $points = 10;
        $places = [
            'Entrée naturelle', 'Salle Dunac', 'Bief Cremadells', 'Petit Barrage',
            'Barques, petit barrage', 'Salle Reynald', 'Temple d\'Angkor',
            'Galerie Dent de Requin', 'Point du photographe', 'Cascade Salette'
        ];
        ?>
        <img src="<?= $image_dir . '/plan3.png'; ?>" alt="<?php esc_attr__('Relevé topographique de la rivière de Labouiche', 'labouiche'); ?>" class="labouiche-map">
        <?php
        while ($points > 0) {
        ?>
            <img src="<?= $image_dir . '/' . $points . '.png'; ?>" id="<?= 'point-' . $points; ?>" data-id="<?= $points; ?>" class="point" alt="<?= esc_attr__($places[$points - 1], 'labouiche'); ?>" title="<?= esc_attr__($places[$points - 1], 'labouiche'); ?>">
<?php
            $points--;
        }
    }

    public static function display_visit_cpt()
    {
        $args = array(
            'post_type' => 'visit',
            'post_per_page'=>10
        );
        $projects = new WP_Query($args);
        $id = 10;
        if ($projects->have_posts()) {
            while ($projects->have_posts()) {
                $projects->the_post();
                ?>
                <div class="visit_cpt_item_container" data-id="<?= $id ?>">
                    <h2>
                        <?php the_title();?>
                    </h2>
                    <div class="visit_cpt_item_body">
                    <figure>
                        <?php the_post_thumbnail();?>
                    </figure>
                    <div class="visit_cpt_item_content">
                        <?php the_content();?>
                    </div>
                    </div> 
                </div>
                <?php
                $id--;
            }
            wp_reset_postdata();
        }
    }
}
