/******************************************************************************
Project      : Premanandhan Web Framework (PWF)
Website      : Sam Marbles & Granites
File         : navigation.js
Purpose      : Navigation Service
Author       : Premanandhan Narayanan
Version      : 1.0
******************************************************************************/

"use strict";

/*------------------------------------------------------------------------------
CREATE NAVIGATION SERVICE
------------------------------------------------------------------------------*/

PWF.navigation = {

    /*--------------------------------------------------------------------------
    ELEMENTS
    --------------------------------------------------------------------------*/

    header : null,

    navigation : null,

    menuButton : null,

    mobileMenu : null,

    backToTop : null,

    /*--------------------------------------------------------------------------
    STATUS
    --------------------------------------------------------------------------*/

    mobileMenuOpen : false,

    currentSection : null,

    /*--------------------------------------------------------------------------
    INITIALIZE
    --------------------------------------------------------------------------*/

    async init(){

        PWF.log("Initializing Navigation Service...");

        this.cacheElements();

        this.bindEvents();

        this.highlightCurrentPage();

    }

};


/*------------------------------------------------------------------------------
REGISTER MODULE
------------------------------------------------------------------------------*/

PWF.registerModule(

    "navigation",

    PWF.navigation

);


/*------------------------------------------------------------------------------
CACHE DOM ELEMENTS
------------------------------------------------------------------------------*/

PWF.navigation.cacheElements = function(){

    this.header =

        PWF.utils.$("header");

    this.navigation =

        PWF.utils.$("nav");

    this.menuButton =

        PWF.utils.$("#menu-toggle");

    this.mobileMenu =

        PWF.utils.$("#mobile-menu");

    this.backToTop =

        PWF.utils.$("#back-to-top");

};


/*------------------------------------------------------------------------------
BIND EVENTS
------------------------------------------------------------------------------*/

PWF.navigation.bindEvents = function(){

    if(this.menuButton){

        this.menuButton.addEventListener(

            "click",

            () => this.toggleMobileMenu()

        );

    }

};


/*------------------------------------------------------------------------------
HIGHLIGHT CURRENT PAGE

------------------------------------------------------------------------------*/

PWF.navigation.highlightCurrentPage = function(){

    const currentPage =

        window.location.pathname

            .split("/")

            .pop() ||

        "index.html";

    const links =

        PWF.utils.$$("nav a");

    links.forEach(link => {

        link.classList.remove("active");

        const href =

            link.getAttribute("href");

        if(href === currentPage){

            link.classList.add("active");

        }

    });

};


/*------------------------------------------------------------------------------
NAVIGATION READY

------------------------------------------------------------------------------*/

document.addEventListener(

    "PWF:NavigationReady",

    function(){

        PWF.log(

            "Navigation Ready."

        );

    }

);


/******************************************************************************
END OF PART 1

NEXT PART

STICKY HEADER

MOBILE MENU

SMOOTH SCROLL

BACK TO TOP

******************************************************************************/
/******************************************************************************
PART 2

STICKY HEADER

MOBILE MENU

SMOOTH SCROLL

BACK TO TOP

******************************************************************************/

/*------------------------------------------------------------------------------
STICKY HEADER

------------------------------------------------------------------------------*/

PWF.navigation.handleScroll = function(){

    if(!this.header){

        return;

    }

    if(window.scrollY > 100){

        this.header.classList.add("sticky");

    }
    else{

        this.header.classList.remove("sticky");

    }

    this.toggleBackToTop();

};


/*------------------------------------------------------------------------------
TOGGLE MOBILE MENU

------------------------------------------------------------------------------*/

PWF.navigation.toggleMobileMenu = function(){

    if(!this.mobileMenu){

        return;

    }

    this.mobileMenu.classList.toggle("active");

    this.mobileMenuOpen =

        this.mobileMenu.classList.contains("active");

};


/*------------------------------------------------------------------------------
CLOSE MOBILE MENU

------------------------------------------------------------------------------*/

PWF.navigation.closeMobileMenu = function(){

    if(!this.mobileMenu){

        return;

    }

    this.mobileMenu.classList.remove("active");

    this.mobileMenuOpen = false;

};


/*------------------------------------------------------------------------------
SMOOTH SCROLL

------------------------------------------------------------------------------*/

PWF.navigation.scrollToSection = function(target){

    const section = PWF.utils.$(target);

    if(!section){

        return;

    }

    section.scrollIntoView({

        behavior : "smooth",

        block : "start"

    });

};


/*------------------------------------------------------------------------------
BACK TO TOP

------------------------------------------------------------------------------*/

PWF.navigation.scrollToTop = function(){

    window.scrollTo({

        top : 0,

        behavior : "smooth"

    });

};


/*------------------------------------------------------------------------------
SHOW / HIDE BACK TO TOP

------------------------------------------------------------------------------*/

PWF.navigation.toggleBackToTop = function(){

    if(!this.backToTop){

        return;

    }

    if(window.scrollY > 300){

        this.backToTop.classList.add("show");

    }
    else{

        this.backToTop.classList.remove("show");

    }

};


/*------------------------------------------------------------------------------
UPDATE bindEvents()

Add the following inside bindEvents()

------------------------------------------------------------------------------*/

// Sticky Header

window.addEventListener(

    "scroll",

    () => this.handleScroll()

);


// Back To Top

if(this.backToTop){

    this.backToTop.addEventListener(

        "click",

        () => this.scrollToTop()

    );

}


// Smooth Scroll

PWF.utils.$$("a[href^='#']").forEach(link => {

    link.addEventListener(

        "click",

        (event) => {

            event.preventDefault();

            const target =

                link.getAttribute("href");

            this.scrollToSection(target);

            this.closeMobileMenu();

        }

    );

});


/******************************************************************************
END OF PART 2

NEXT PART

ACTIVE SECTION

WINDOW RESIZE

DEBUG

SUMMARY

FRAMEWORK READY

END OF navigation.js

******************************************************************************/
/******************************************************************************
PART 3

ACTIVE SECTION

WINDOW RESIZE

DEBUG

SUMMARY

FRAMEWORK READY

END OF navigation.js

******************************************************************************/

/*------------------------------------------------------------------------------
HIGHLIGHT ACTIVE SECTION

------------------------------------------------------------------------------*/

PWF.navigation.highlightActiveSection = function(){

    const sections = PWF.utils.$$("section[id]");

    const links = PWF.utils.$$("nav a[href^='#']");

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 120;

        const sectionHeight = section.offsetHeight;

        if(

            window.scrollY >= sectionTop &&

            window.scrollY < sectionTop + sectionHeight

        ){

            currentSection = section.id;

        }

    });

    links.forEach(link => {

        link.classList.remove("active");

        const href =

            link.getAttribute("href");

        if(href === "#" + currentSection){

            link.classList.add("active");

        }

    });

};


/*------------------------------------------------------------------------------
WINDOW RESIZE

------------------------------------------------------------------------------*/

PWF.navigation.handleResize = function(){

    if(window.innerWidth > 992){

        this.closeMobileMenu();

    }

};


/*------------------------------------------------------------------------------
UPDATE EVENT BINDINGS

Add these lines inside bindEvents()

------------------------------------------------------------------------------*/

// Window Resize

window.addEventListener(

    "resize",

    () => this.handleResize()

);


// Active Section

window.addEventListener(

    "scroll",

    PWF.utils.throttle(

        () => this.highlightActiveSection(),

        100

    )

);


/*------------------------------------------------------------------------------
DEBUG INFORMATION

------------------------------------------------------------------------------*/

PWF.navigation.debug = function(){

    console.group(

        "%cNavigation Debug",

        "color:#0d6efd;font-weight:bold;"

    );

    console.table({

        "Mobile Menu" : this.mobileMenuOpen,

        "Current Section" : this.currentSection,

        "Window Width" : window.innerWidth,

        "Scroll Position" : window.scrollY

    });

    console.groupEnd();

};


/*------------------------------------------------------------------------------
SERVICE SUMMARY

------------------------------------------------------------------------------*/

PWF.navigation.summary = function(){

    PWF.log("--------------------------------");

    PWF.log("Navigation Service");

    PWF.log("--------------------------------");

    PWF.log(`Mobile Menu : ${this.mobileMenuOpen}`);

    PWF.log(`Current Page : ${window.location.pathname}`);

};


/*------------------------------------------------------------------------------
SERVICE INFORMATION

------------------------------------------------------------------------------*/

PWF.navigation.info = function(){

    return{

        mobileMenu : this.mobileMenuOpen,

        currentSection : this.currentSection,

        page : window.location.pathname,

        width : window.innerWidth,

        scrollY : window.scrollY

    };

};


/*------------------------------------------------------------------------------
INITIALIZATION UPDATE

Add these lines at the END of init()

------------------------------------------------------------------------------*/

// Print Summary

this.summary();

// Framework Ready

PWF.flags.navigationReady = true;

// Notify Framework

document.dispatchEvent(

    new CustomEvent(

        "PWF:NavigationReady",

        {

            detail : this.info()

        }

    )

);


/******************************************************************************
END OF FILE

navigation.js

Premanandhan Web Framework

Version 1.0

Navigation Service Completed

******************************************************************************/
