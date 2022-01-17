import '../sass/index.scss';
import App from './modules/App';
import Carousel from './modules/carousel';



const app = new App();
app.init();


window.addEventListener('resize',() => {
    let state = app.update();
    //history carousel
    if(app.UI.carousel_container !== null) {
        if(state.is_mobile) {
            app.destroyCarousel();   
        } else {
            app.setCarousel(app.UI.carousel_container);
        }
    }

    //code
   
    
});