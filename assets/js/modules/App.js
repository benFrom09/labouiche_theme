import Carousel from "./carousel";

class App {

    constructor() {

        //track state of application like current width ...
        this.state = {
            is_mobile:false,
            screen:{
                width:0,
                height:0
            },
            carousel:null
        }
        this.UI = {
            //SELECTORS
            //navbar
            mobile_nav:document.getElementById("menu-mobile") ?? null,
            open_nav_btn:document.querySelector('#nav-bg-small-menu span') ?? null,
            close_nav_btn:document.querySelector('#menu-mobile a.closebtn') ?? null,
            //carousel
            carousel_container:document.querySelector('.carousel-container') ?? null,
            //virtual visit 
            l_map_container:document.querySelector('.labouiche-map-container') ?? null,
            //labouiche_custom_post_type_element
            l_cpt_visit:document.querySelector('.cpt_visit') ?? null,
            points:document.querySelectorAll('img.point') ?? null,
            items_to_show:document.querySelectorAll('.visit_cpt_item_container') ?? null
        }
        this.open_navbar = this.open_navbar.bind(this);
        this.close_navbar = this.close_navbar.bind(this);

    }
    init() {
        this.update();
        const { open_nav_btn, close_nav_btn, l_map_container, l_cpt_visit,points, items_to_show, carousel_container } = this.UI;
        const { is_mobile } = this.state;
        if(open_nav_btn !== null) {
            open_nav_btn.addEventListener('click',this.open_navbar);
        }
        if(close_nav_btn !== null) {
            close_nav_btn.addEventListener('click',this.close_navbar);
        }
        //VIRTUAL VISIT
        if(l_map_container !== null && l_cpt_visit.childElementCount > 0) {
            this.virtual_visit_show_location(points,items_to_show);
        }
        if(carousel_container !== null) {
            if(!is_mobile) {
                this.setCarousel(carousel_container);
            }
            
        }
    }
    /**
     * Update app current state
     * 
     * @returns Object
     */
    update() {
        let { is_mobile, screen } = this.state;
        screen.width = window.innerWidth;
        screen.height = window.innerHeight;
        is_mobile = (screen.width < 1024) ? true : false;
        return Object.assign(this.state,{screen,is_mobile});
        
    }
    close_navbar() {
        const { mobile_nav } = this.UI;
        mobile_nav.style.width = "0";
    }

    open_navbar() {
        const { mobile_nav } = this.UI;
        mobile_nav.style.width = "250px";
    }

    virtual_visit_show_location(points = NodeList,itemsToShow = NodeList) {
        points.forEach((point) => {
            point.addEventListener('click',(e) => {
                const id = e.target.dataset.id;
                Array.from(itemsToShow).find(el => {
                    if(el.dataset.id == id) {
                        el.style.opacity = 1;
                    } else {
                        el.style.opacity = 0;
                    }
                })
            });
        });
    }

    setCarousel(element) {
        if(this.state.carousel === null) {
            this.state.carousel = new Carousel(element);
        }
        
    }

    destroyCarousel() {
        if(this.state.carousel !== null) {
            this.state.carousel.destroy();
            this.state.carousel = null;
        }
        
    }
}

export default App;