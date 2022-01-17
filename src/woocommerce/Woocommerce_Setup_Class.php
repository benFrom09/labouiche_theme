<?php



class Woocommerce_Setup_Class
{

    public function __construct()
    {
        //remove action
        remove_action('woocommerce_before_main_content', 'woocommerce_output_content_wrapper', 10);
        remove_action('woocommerce_after_main_content', 'woocommerce_output_content_wrapper_end', 10);
        remove_action('woocommerce_sidebar', 'woocommerce_get_sidebar', 10);

        //add action 
        add_action('after_setup_theme', [$this, 'labouiche_woo_setup']);
        add_action('woocommerce_before_main_content', [$this, 'labouiche_woo_wrapper_before']);
        add_action('woocommerce_after_main_content', [$this, 'labouiche_woo_wrapper_after']);
        //add filter
        //remove woo default style
        //add_filter( 'woocommerce_enqueue_styles', '__return_empty_array' );
    }
    public function labouiche_woo_setup()
    {
        add_theme_support(
            'woocommerce',
            array(
                'thumbnail_image_width' => 150,
                'single_image_width'    => 300,
                'product_grid'          => array(
                    'default_rows'    => 3,
                    'min_rows'        => 1,
                    'default_columns' => 4,
                    'min_columns'     => 1,
                    'max_columns'     => 6,
                ),
            )
        );
        add_theme_support('wc-product-gallery-zoom');
        add_theme_support('wc-product-gallery-lightbox');
        add_theme_support('wc-product-gallery-slider');
    }
    public function labouiche_woo_wrapper_before()
    {
?>
        <main class="page-default boutique main-content-wrapper container">
            <section id="main-content" class="site-main">
            <?php
        }
        public function labouiche_woo_wrapper_after()
        {
            ?>
            </section>
            <?php if(is_active_sidebar('sidebar-left')): ?>
            <aside class="sidebar">  
                <?php 
                dynamic_sidebar('sidebar-left');
                ?>
            </aside>
            <?php endif; ?>
        </main><!-- #main -->
<?php
        }
        /**
         * Cart Fragments.
         *
         * Ensure cart contents update when products are added to the cart via AJAX.
         *
         * @param array $fragments Fragments to refresh via AJAX.
         * @return array Fragments to refresh via AJAX.
         */
        public static function labouiche_woo_cart_link_fragment($fragments)
        {
            ob_start();
            self::labouiche_woo_cart_link();
            $fragments['a.cart-contents'] = ob_get_clean();

            return $fragments;
        }
           /**
             * Cart Link.
             *
             * Displayed a link to the cart including the number of items present and the cart total.
             *
             * @return void
             */
            public static function labouiche_woo_cart_link()
            {
                if (WOOCOMMERCE_ACTIVE ) :
            ?>
                <a class="cart-contents" href="<?php echo esc_url(wc_get_cart_url()); ?>" title="<?php esc_attr_e('View your shopping cart', 'labouiche'); ?>">
                    <?php
                    $item_count_text = sprintf(
                        /* translators: number of items in the mini cart. */
                        _n('%d', '%d', WC()->cart->get_cart_contents_count(), 'labouiche'),
                        WC()->cart->get_cart_contents_count()
                    );
                    ?>
                    <div class="amount-container">
                        <span class="amount"><?php echo wp_kses_data(WC()->cart->get_cart_subtotal()); ?></span>
                    </div>
                    <div class="cart-total">
                        <i class="fas fa-shopping-cart"></i>
                        <span class="count"><?php echo esc_html($item_count_text); ?></span>
                    </div>

                </a>
            <?php
                endif;
            }
    }
