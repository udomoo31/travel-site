class MobileMenu{
    
    constructor(){
        // document.querySelector(".site-header__menu-icon").addEventListener('click', function (e) {
        //   console.log("clicked menue!")  
        // });
        this.menuIcon = document.querySelector(".site-header__menu-icon");
        this.menuContent = document.querySelector(".site-header__menu-content");
        this.siteHeader = document.querySelector(".site-header");
        this.events()
    }

    events(){
        this.menuIcon.addEventListener( "click", () => this.toggleTheMenu() ) // this.toggleTheMenu
    }

    toggleTheMenu(){
        // console.log("Hoorayz!");
        this.menuContent.classList.toggle("site-header__menu-content--is-visible")
        this.siteHeader.classList.toggle("site-header--is-expanded");
        this.menuIcon.classList.toggle("site-header__menu-icon--close-x");
    }
    
}


export default MobileMenu;