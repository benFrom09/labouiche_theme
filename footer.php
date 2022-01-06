<?php
/**
 * The template for displaying the footer
 *
 * Contains the closing of the #content div and all content after.
 *
 * @link https://developer.wordpress.org/themes/basics/template-files/#template-partials
 *
 * @package labouiche
 */

?>
<footer>
    <div class="alert alert-warning col-lg-12" style="display: none;">
        <button type="button" class="close">×</button>
        <a href="?lg=fr">Français</a> -
        <a href="?lg=en">English</a> -
        <a href="?lg=es">Español</a> -
        <a href="?lg=de">Deutsch</a> -
        <a href="?lg=nl">Nederlander</a>
    </div>
    <div id="langue">
        <img src="" class="langue" id="afficher">
    </div>
    <div id="nav_footer">
        <a href="partenaire.php?lg=fr">Partenaires</a> -
        <a href="mentions.php?lg=fr">Mentions légales</a> -
        <a href="credit.php?lg=fr">Crédits</a> -
        <a href="plan.php?lg=fr">Plan du site</a>
    </div>
    <p id="langue" class="sub">Rivière souterraine de Labouiche</p>
</footer>
<?php wp_footer(); ?>
</body>

</html>