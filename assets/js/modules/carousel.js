import {createHTML} from "./createHTML";
export default class Carousel
{
    /**
     * 
     * @param {HTMLElement} container 
     * @param {Object} options
     * @param {Object} options.slidesToScroll number of elements to scroll
     * @param {Object} options.slidesToShow number of elements to show into a slide
     * @param {Boolean} options.loop loop on carousel
     * @param {Boolean} options.navigation set nvigation
     * @param {Boolean} options.pagination set pagination
     * @param {Boolean} options.infinite set infinite slide
     */
    constructor(container,options = {}) {
        this.container = container;
        //assing defaul value to options object
        this.options = Object.assign({},
            {
                slidesToScroll:1,
                slidesToShow:1,
                navigation:true,
                loop:false,
                pagination:false,
                infinite:false
            }
        , options);
        if(this.options.loop && this.options.infinite) throw new Error("Cannot set to true loop and infinite at the same time");
        //keep track of container children at the time 
        let childrens = [].slice.call(this.container.children) ;
        this.current = 0;
        this.index = 0;
        this.isMobile = false;
        this.offset = 0;
        //keep context
        this.next = this.next.bind(this);
        this.previous = this.previous.bind(this);
        this.arrowControl = this.arrowControl.bind(this);
        //create a root container for the slider
        this.root = createHTML({
            el:"div",
            attributes:{
                className:["carousel"]
            },
            listener:["keyup"]
        },this.arrowControl);
        //create the slider for slideItems 
        this.slider = createHTML({
            el:"div",
            attributes:{
                className:["carousel-slider"]
            }
        },false);       
        this.root.appendChild(this.slider);
        this.root.setAttribute('tabindex','0');
        this.container.appendChild(this.root);
        this.eventCallback = []
        //replace slide item into the slider container
        this.items = childrens.map(item => {
            let carouselItemContainer = createHTML({el:"div",attributes:{className:["carousel-item-container"]}},false);  
            carouselItemContainer.appendChild(item);
            
            return carouselItemContainer;          
        });

        if(this.options.infinite === true) {
            this.offset = this.options.slidesToShow + this.options.slidesToScroll;
            if (this.offset > childrens.length) throw new Error("il n\ya pas assez de slide dans le carousel");
            this.items = [
                ...this.items.slice(this.items.length - (this.offset)).map(item=>item.cloneNode(true)),
                ...this.items,
                ...this.items.slice(0,this.offset).map(item =>item.cloneNode(true)),
            ];
            this.goTo(this.offset);
        }
        this.items.forEach(item => {
            this.slider.appendChild(item);
        });
        this.setSlideRatio();
        if(this.options.navigation) {
            this.createControls();
        }

        if(this.options.pagination) {
            this.createPagination();
        }
        
        //events
        this.eventCallback.forEach(cb => cb(this.current));
        this.onResize();
        window.addEventListener('resize',this.onResize.bind(this));
    }

    /**
     * gives right dimensions of the carousel elements 
     */
    setSlideRatio() {
        let ratio = this.items.length / this.slidesToShow;
        this.slider.style.width = (ratio * 100) + "%";
        this.items.forEach(el => {
            el.style.width = ((100/this.slidesToShow/ ratio)) + "%";
        });
    }

    createControls() {
        let nextBtn = createHTML({
            el:"div",
            attributes:{ className:["carousel-next"]},
            innerHTML:createHTML(
                {el:"i",
                attributes:{className:["fa","fa-chevron-right"]}
            },false),
            listener:["click"],
        },this.next);
        let prevBtn = createHTML({
            el:"div",
            attributes:{ className:["carousel-prev"]},
            innerHTML:createHTML(
                {el:"i",
                attributes:{className:["fa","fa-chevron-left"]}
            },false),
            listener:["click"],
        },this.previous); 
        this.root.appendChild(nextBtn);
        this.root.appendChild(prevBtn);
        this.onAddEvent(index => {
            if(this.options.loop) return;
            if(index === 0) {
                prevBtn.classList.add("item-hidden");
            } else {
                prevBtn.classList.remove("item-hidden");
            }
            if(this.items[this.current + this.slidesToShow] === undefined) {
                nextBtn.classList.add("item-hidden");
            } else {
                nextBtn.classList.remove("item-hidden");
            }    
        });
    }
    createPagination() {
        let pagination = createHTML({
            el:"div",
            attributes:{className:["carousel-pagination"]}
        },false);
        let buttons = [];
        this.root.appendChild(pagination);
        for(let i = 0 ; i < (this.items.length -2 * this.offset); i = i + this.options.slidesToScroll) {
            let btn = createHTML({
                el:"div",
                attributes:{className:["carousel-pagination-btn"]}
            });
            btn.addEventListener('click',(e)=> {
                this.goTo(i + this.offset)
            });
            pagination.appendChild(btn);
            buttons.push(btn);
        }
        this.onAddEvent(index => {
            let count = this.items.length - 2 * this.offset;
           let btnActive = buttons[Math.floor((index - this.offset) % count / this.options.slidesToScroll)];
           if(btnActive) {
               buttons.forEach(btn => {
                    btn.classList.remove('c-p-btn-active');
               });
               btnActive.classList.add('c-p-btn-active');
           }
        });
    }

   next(e) {
      this.goTo(this.current + this.slidesToScroll);
   }

   previous(e) {
       this.goTo(this.current - this.slidesToScroll);
   }

   goTo(index,animation = true) {
       if(index < 0) {
           if(this.options.loop) {
               index = this.items.length - this.slidesToShow;
           } else {
               return;
           }
           
       } else if (index >= this.items.length || (this.items[this.current + this.slidesToShow] === undefined) && index > this.current){
           if(this.options.loop) {
               index = 0
           } else {
               return;
           }
           
       }
       if(animation === false) {
           this.slider.style.transition = "none"
       }
       let translateX =  index * -100 / this.items.length ;
       this.slider.style.transform = `translate3d(${translateX}%,0,0)`;
       this.slider.offsetHeight // this is hack to force navigator cancelling animation (just get any property)
       if(animation === false) {
        this.slider.style.transition = ""
        }
        this.current = index;
        this.eventCallback.forEach(cb => cb(index));
        if(this.options.infinite){
            this.slider.addEventListener("transitionend",this.moveContainer.bind(this))
        }
        
   }
   /**
    * move the slides container to give impressio of infinite slide
    */
   moveContainer() {
        if(this.current <= this.options.slidesToScroll) {
            /**
             * 1234567
             * 34567|1234567|12345
             */
            this.goTo(this.current + this.items.length - (2*this.offset),false);
        } else if (this.current >=  this.items.length - this.offset) {
            this.goTo(this.current -(this.items.length - (2*this.offset)),false);
        }
   }

   destroy() {
       this.items = null;
   }

   onAddEvent(cb){
        this.eventCallback.push(cb);
   }

   arrowControl(e) {
       if(e.key === "ArrowRight" || e.key ==="Right") this.next();
       if(e.key === "ArrowLeft" || e.key === "Left") this.previous();
   }

   onResize() {
       let mobile = window.innerWidth < 900;
       if(mobile !== this.isMobile) {
           this.isMobile = mobile;
           this.setSlideRatio();
           this.eventCallback.forEach(cb => cb(0));
       }
   }
   /**
    * @returns {number}
    */
   get slidesToScroll(){
       return this.isMobile ? 1 : this.options.slidesToScroll;
   }

   /**
    * @returns {number}
    */
   get slidesToShow(){
       return this.isMobile ? 1 : this.options.slidesToShow;
   }
   

    

   
}