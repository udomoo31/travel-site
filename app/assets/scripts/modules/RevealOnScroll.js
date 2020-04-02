import throttle from 'lodash/throttle';
import debounce from "lodash/debounce";

class RevealOnScroll{

    constructor(els , thresholdPercent){
        this.thresholdPercent = thresholdPercent;
        this.itemsToReveal = els;
        this.browserHeight = window.innerHeight;
        this.hideInitially()
        this.scrollThrottle = throttle(this.calcCaller, 200).bind(this);
        this.events()
    }

    events(){
        window.addEventListener("scroll", this.scrollThrottle );
        window.addEventListener("resize", debounce( ()=> {
            this.browserHeight = window.innerHeight;
            // console.log( "resize run width " + this.browserHeight + " browser height" );

        }, 333 ));
    }

    calcCaller(){
        console.log("running calcCaller");
        this.itemsToReveal.forEach(elem => {
          
            if(elem.isRevealed === false ){
                this.calculateIfScrolledTo(elem);
            }

        });
    }

    calculateIfScrolledTo(elem){
        
        if (window.scrollY + this.browserHeight > elem.offsetTop) {
          console.log("Element was Calculated!----------------");
          let scrollPercent =
            (elem.getBoundingClientRect().y / this.browserHeight ) * 100;
          if (scrollPercent < this.thresholdPercent ) {
            elem.classList.add("reveal-item--is-visible");
            elem.isRevealed = true;

            if (elem.isLastItem) {
              window.removeEventListener("scroll", this.scrollThrottle);
            }
          }
        }

    }

    hideInitially(){
        this.itemsToReveal.forEach( elem => {
            elem.classList.add("reveal-item")
            elem.isRevealed = false;
        });

        this.itemsToReveal[this.itemsToReveal.length - 1].isLastItem = true;
    }
    


}


export default RevealOnScroll;