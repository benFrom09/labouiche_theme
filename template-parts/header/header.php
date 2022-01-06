   <header class="header_menu">
       <div class="row-bis">
           <div class="col-lg-12-bis  d-none d-md-none d-lg-block d-xl-block">
               <div id="menu">
                   <div id="nav-left-link">
                       <?php
                       //
                       if(has_nav_menu('menu-1')) {
                           wp_nav_menu(array(
                                'theme_location' => 'menu-1'
                           ));
                       }
                        ?>
                   </div>
                   <img id="menu-logo" src="<?= THEME_ASSETS ?>/img/logo.png" alt="Logo Labouiche">
                   <div id="nav-right-link">
                       <?php
                        if(has_nav_menu('menu-2')) {
                            wp_nav_menu(array(
                                 'theme_location' => 'menu-2'
                            ));
                        }
                        ?>
                   </div>
                   <div id="trait"></div>
               </div>
           </div><!-- col-lg-12-bis -->
           <div class="col-lg-12 d-block d-sm-block d-md-block d-lg-none d-xl-none">
               <div id="nav-bg-small-menu">
                   <span style="font-size:30px;cursor:pointer;font-family: 'Gabriela', serif;color:#fff;">☰ Menu</span>
                   <img id="nav-logo-small" src="<?= THEME_ASSETS ?>/img/logo.png" alt="Logo Labouiche">
                   <div id="traitpetit"></div>
               </div>
               <div id="menu-mobile" class="menu-mobile-container">
               <a href="javascript:void(0)" class="closebtn">×</a>
                <?php 
                        if(has_nav_menu('menu-3')) {
                            wp_nav_menu(array(
                                'theme_location' => 'menu-3',
                                'menu_id' =>'mySidenav',
                                'menu_class' => 'sidenav',
                                'container' => '',
                            ));
                        }
                ?>
               </div>
               
               <!--
               <div id="mySidenav" class="sidenav">
                   <a href="javascript:void(0)" class="closebtn" onclick="closeNav()">×</a>
                   <a href="accueil.php?lg=fr">Accueil</a>
                   <a href="histoire.php?lg=fr">Histoire</a>
                   <a href="visite.php?lg=fr">Visite</a>
                   <a href="info.php?lg=fr">Informations</a>
                   <a href="galerie.php?lg=fr">Galerie</a>
                   <a href="contact.php?lg=fr">Contact</a>
               </div>
                    -->
           </div><!-- col-lg-12 -->
       </div> <!-- row-bis -->
   </header>