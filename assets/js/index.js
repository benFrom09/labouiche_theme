import '../sass/index.scss';
import Carousel from './modules/carousel';

const mobile_nav =  document.getElementById("menu-mobile");
function openNav() {
   mobile_nav.style.width = "250px";
}

function closeNav() {
    mobile_nav.style.width = "0";
}

document.querySelector('#nav-bg-small-menu span').addEventListener('click',openNav);
document.querySelector('#menu-mobile a.closebtn').addEventListener('click',closeNav);

if(document.querySelector('.carousel-container')!== null) {
    const carousel = new Carousel(document.querySelector('.carousel-container'));
}
