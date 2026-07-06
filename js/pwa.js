/******************************************************************************
Project      : Premanandhan Web Framework (PWF)
Website      : Sam Marbles & Granites
File         : pwa.js
Purpose      : Progressive Web App Service
Author       : Premanandhan Narayanan
Version      : 1.0
******************************************************************************/

"use strict";

/*------------------------------------------------------------------------------
CREATE PWA SERVICE

------------------------------------------------------------------------------*/

PWF.pwa = {

    /*--------------------------------------------------------------------------
    PWA STATUS
    --------------------------------------------------------------------------*/

    supported : false,

    installed : false,

    installPrompt : null,

    registration : null,

    /*--------------------------------------------------------------------------
    DOM ELEMENTS
    --------------------------------------------------------------------------*/

    installButton : null,

    updateButton : null,

    /*--------------------------------------------------------------------------
    INITIALIZE
    --------------------------------------------------------------------------*/

    async init(){

        PWF.log(

            "Initializing PWA Service..."

        );

        this.cacheElements();

        this.detectSupport();

        this.registerServiceWorker();

        this.bindEvents();

    }

};


/*------------------------------------------------------------------------------
REGISTER MODULE

------------------------------------------------------------------------------*/

PWF.registerModule(

    "pwa",

    PWF.pwa

);


/*------------------------------------------------------------------------------
CACHE DOM ELEMENTS

------------------------------------------------------------------------------*/

PWF.pwa.cacheElements = function(){

    this.installButton =

        PWF.utils.$("#install-app");

    this.updateButton =

        PWF.utils.$("#update-app");

};


/*------------------------------------------------------------------------------
CHECK PWA SUPPORT

------------------------------------------------------------------------------*/

PWF.pwa.detectSupport = function(){

    this.supported =

        "serviceWorker" in navigator;

    if(this.supported){

        PWF.log(

            "PWA Supported."

        );

    }
    else{

        PWF.warn(

            "PWA Not Supported."

        );

    }

};


/*------------------------------------------------------------------------------
REGISTER SERVICE WORKER

------------------------------------------------------------------------------*/

PWF.pwa.registerServiceWorker = async function(){

    if(!this.supported){

        return;

    }

    try{

        this.registration =

            await navigator.serviceWorker.register(

                "service-worker.js"

            );

        PWF.log(

            "Service Worker Registered."

        );

    }

    catch(error){

        console.error(error);

    }

};


/*------------------------------------------------------------------------------
BIND EVENTS

------------------------------------------------------------------------------*/

PWF.pwa.bindEvents = function(){

    window.addEventListener(

        "beforeinstallprompt",

        (event)=>{

            event.preventDefault();

            this.installPrompt = event;

            this.showInstallButton();

        }

    );

};


/*------------------------------------------------------------------------------
SHOW INSTALL BUTTON

------------------------------------------------------------------------------*/

PWF.pwa.showInstallButton = function(){

    if(this.installButton){

        this.installButton.classList.remove(

            "hidden"

        );

    }

};


/*------------------------------------------------------------------------------
PWA READY

------------------------------------------------------------------------------*/

document.addEventListener(

    "PWF:PWAReady",

    function(){

        PWF.log(

            "PWA Service Ready."

        );

    }

);


/******************************************************************************
END OF PART 1

NEXT PART

INSTALL APP

CHECK INSTALL STATUS

HIDE INSTALL BUTTON

UPDATE EVENTS

******************************************************************************/
/******************************************************************************
PART 2

INSTALL APP

CHECK INSTALL STATUS

HIDE INSTALL BUTTON

UPDATE EVENTS

******************************************************************************/

/*------------------------------------------------------------------------------
INSTALL APPLICATION

------------------------------------------------------------------------------*/

PWF.pwa.install = async function(){

    if(!this.installPrompt){

        PWF.warn(

            "Install prompt not available."

        );

        return;

    }

    this.installPrompt.prompt();

    const result =

        await this.installPrompt.userChoice;

    if(result.outcome === "accepted"){

        PWF.log(

            "Application Installed."

        );

    }
    else{

        PWF.log(

            "Installation Cancelled."

        );

    }

    this.installPrompt = null;

    this.hideInstallButton();

};


/*------------------------------------------------------------------------------
HIDE INSTALL BUTTON

------------------------------------------------------------------------------*/

PWF.pwa.hideInstallButton = function(){

    if(this.installButton){

        this.installButton.classList.add(

            "hidden"

        );

    }

};


/*------------------------------------------------------------------------------
CHECK INSTALL STATUS

------------------------------------------------------------------------------*/

PWF.pwa.checkInstalled = function(){

    this.installed =

        window.matchMedia(

            "(display-mode: standalone)"

        ).matches;

    return this.installed;

};


/*------------------------------------------------------------------------------
CHECK FOR SERVICE WORKER UPDATE

------------------------------------------------------------------------------*/

PWF.pwa.checkForUpdates = function(){

    if(

        this.registration &&

        this.registration.update

    ){

        this.registration.update();

    }

};


/*------------------------------------------------------------------------------
UPDATE AVAILABLE

------------------------------------------------------------------------------*/

PWF.pwa.onUpdateAvailable = function(){

    PWF.log(

        "New version available."

    );

    if(this.updateButton){

        this.updateButton.classList.remove(

            "hidden"

        );

    }

};


/*------------------------------------------------------------------------------
UPDATE APPLICATION

------------------------------------------------------------------------------*/

PWF.pwa.updateApplication = function(){

    window.location.reload();

};


/*------------------------------------------------------------------------------
UPDATE registerServiceWorker()

Add these lines after successful registration

------------------------------------------------------------------------------*/

this.registration.addEventListener(

    "updatefound",

    ()=>{

        this.onUpdateAvailable();

    }

);


/*------------------------------------------------------------------------------
UPDATE bindEvents()

Add these lines

------------------------------------------------------------------------------*/

// Install Button

if(this.installButton){

    this.installButton.addEventListener(

        "click",

        ()=>this.install()

    );

}


// Update Button

if(this.updateButton){

    this.updateButton.addEventListener(

        "click",

        ()=>this.updateApplication()

    );

}


// Installed Event

window.addEventListener(

    "appinstalled",

    ()=>{

        this.installed = true;

        this.hideInstallButton();

        PWF.log(

            "PWA Installed Successfully."

        );

    }

);


/******************************************************************************
END OF PART 2

NEXT PART

ONLINE / OFFLINE

CACHE STATUS

NETWORK STATUS

UPDATE NOTIFICATIONS

******************************************************************************/
/******************************************************************************
PART 3

ONLINE / OFFLINE

CACHE STATUS

NETWORK STATUS

UPDATE NOTIFICATIONS

******************************************************************************/

/*------------------------------------------------------------------------------
CHECK NETWORK STATUS

------------------------------------------------------------------------------*/

PWF.pwa.isOnline = function(){

    return navigator.onLine;

};


/*------------------------------------------------------------------------------
HANDLE ONLINE

------------------------------------------------------------------------------*/

PWF.pwa.onOnline = function(){

    PWF.log(

        "Internet Connection Restored."

    );

    this.showNetworkStatus(

        "online",

        "🟢 Back Online"

    );

};


/*------------------------------------------------------------------------------
HANDLE OFFLINE

------------------------------------------------------------------------------*/

PWF.pwa.onOffline = function(){

    PWF.warn(

        "Internet Connection Lost."

    );

    this.showNetworkStatus(

        "offline",

        "🔴 You are Offline"

    );

};


/*------------------------------------------------------------------------------
DISPLAY NETWORK STATUS

------------------------------------------------------------------------------*/

PWF.pwa.showNetworkStatus = function(type,message){

    const status =

        PWF.utils.$("#network-status");

    if(!status){

        PWF.log(message);

        return;

    }

    status.className =

        `network-status ${type}`;

    status.textContent = message;

    status.classList.add("show");

    setTimeout(()=>{

        status.classList.remove("show");

    },4000);

};


/*------------------------------------------------------------------------------
CACHE STATUS

------------------------------------------------------------------------------*/

PWF.pwa.getCacheStatus = async function(){

    if(!("caches" in window)){

        return [];

    }

    return await caches.keys();

};


/*------------------------------------------------------------------------------
CLEAR CACHE

------------------------------------------------------------------------------*/

PWF.pwa.clearCache = async function(){

    if(!("caches" in window)){

        return;

    }

    const keys =

        await caches.keys();

    for(const key of keys){

        await caches.delete(key);

    }

    PWF.log(

        "Application Cache Cleared."

    );

};


/*------------------------------------------------------------------------------
NETWORK INFORMATION

------------------------------------------------------------------------------*/

PWF.pwa.networkInfo = function(){

    return{

        online :

            navigator.onLine,

        language :

            navigator.language,

        platform :

            navigator.platform,

        userAgent :

            navigator.userAgent

    };

};


/*------------------------------------------------------------------------------
UPDATE bindEvents()

Add these lines

------------------------------------------------------------------------------*/

// Online

window.addEventListener(

    "online",

    ()=>this.onOnline()

);


// Offline

window.addEventListener(

    "offline",

    ()=>this.onOffline()

);


/******************************************************************************
END OF PART 3

NEXT PART

DEVICE INFORMATION

INSTALL STATUS

PWA STATISTICS

DEBUG

******************************************************************************/
/******************************************************************************
PART 4

DEVICE INFORMATION

INSTALL STATUS

PWA STATISTICS

DEBUG

******************************************************************************/

/*------------------------------------------------------------------------------
GET DEVICE INFORMATION

------------------------------------------------------------------------------*/

PWF.pwa.getDeviceInfo = function(){

    return{

        userAgent :

            navigator.userAgent,

        language :

            navigator.language,

        platform :

            navigator.platform,

        online :

            navigator.onLine,

        cookiesEnabled :

            navigator.cookieEnabled

    };

};


/*------------------------------------------------------------------------------
CHECK INSTALL STATUS

------------------------------------------------------------------------------*/

PWF.pwa.getInstallStatus = function(){

    return{

        supported :

            this.supported,

        installed :

            this.checkInstalled(),

        serviceWorker :

            this.registration !== null

    };

};


/*------------------------------------------------------------------------------
PWA STATISTICS

------------------------------------------------------------------------------*/

PWF.pwa.statistics = async function(){

    const cache =

        await this.getCacheStatus();

    return{

        supported :

            this.supported,

        installed :

            this.installed,

        online :

            navigator.onLine,

        cacheCount :

            cache.length,

        serviceWorker :

            this.registration !== null

    };

};


/*------------------------------------------------------------------------------
DEBUG INFORMATION

------------------------------------------------------------------------------*/

PWF.pwa.debug = async function(){

    console.group(

        "%cPWA Debug",

        "color:#6f42c1;font-weight:bold;"

    );

    console.table(

        await this.statistics()

    );

    console.groupEnd();

};


/*------------------------------------------------------------------------------
REFRESH PWA INFORMATION

------------------------------------------------------------------------------*/

PWF.pwa.refresh = async function(){

    this.checkInstalled();

    await this.debug();

};


/*------------------------------------------------------------------------------
UPDATE bindEvents()

Add these lines

------------------------------------------------------------------------------*/

// Refresh when page becomes visible

document.addEventListener(

    "visibilitychange",

    ()=>{

        if(!document.hidden){

            this.refresh();

        }

    }

);


/******************************************************************************
END OF PART 4

NEXT PART

SUMMARY

HEALTH CHECK

FRAMEWORK READY

END OF pwa.js

******************************************************************************/
/******************************************************************************
PART 5

SUMMARY

HEALTH CHECK

FRAMEWORK READY

END OF PWA.JS

******************************************************************************/

/*------------------------------------------------------------------------------
MODULE SUMMARY

------------------------------------------------------------------------------*/

PWF.pwa.summary = function(){

    PWF.log("--------------------------------");

    PWF.log("PWA Module");

    PWF.log("--------------------------------");

    PWF.log(

        `Supported      : ${this.supported}`

    );

    PWF.log(

        `Installed      : ${this.installed}`

    );

    PWF.log(

        `Online         : ${navigator.onLine}`

    );

    PWF.log(

        `Service Worker : ${this.registration !== null}`

    );

};


/*------------------------------------------------------------------------------
MODULE INFORMATION

------------------------------------------------------------------------------*/

PWF.pwa.info = function(){

    return{

        supported :

            this.supported,

        installed :

            this.installed,

        online :

            navigator.onLine,

        serviceWorker :

            this.registration !== null,

        language :

            navigator.language,

        platform :

            navigator.platform

    };

};


/*------------------------------------------------------------------------------
HEALTH CHECK

------------------------------------------------------------------------------*/

PWF.pwa.healthCheck = function(){

    return{

        browserSupported :

            this.supported,

        serviceWorkerReady :

            this.registration !== null,

        installAvailable :

            this.installPrompt !== null,

        installed :

            this.installed,

        online :

            navigator.onLine,

        moduleReady :

            PWF.flags.pwaReady

    };

};


/*------------------------------------------------------------------------------
FINAL SUMMARY

------------------------------------------------------------------------------*/

PWF.pwa.finalSummary = function(){

    console.group(

        "%cPWA Module Completed",

        "color:#198754;font-weight:bold;"

    );

    console.table({

        "Supported" :

            this.supported,

        "Installed" :

            this.installed,

        "Online" :

            navigator.onLine,

        "Service Worker" :

            this.registration !== null,

        "Module Ready" :

            PWF.flags.pwaReady

    });

    console.groupEnd();

};


/*------------------------------------------------------------------------------
FRAMEWORK HEALTH DASHBOARD

------------------------------------------------------------------------------*/

PWF.health = function(){

    console.group(

        "%cPremanandhan Web Framework Health",

        "color:#0B5ED7;font-weight:bold;font-size:14px;"

    );

    console.table({

        "Config" :

            PWF.flags.configReady,

        "Loader" :

            PWF.flags.loaderReady,

        "Theme" :

            PWF.flags.themeReady,

        "Business Hours" :

            PWF.flags.businessHoursReady,

        "Navigation" :

            PWF.flags.navigationReady,

        "Products" :

            PWF.flags.productsReady,

        "Gallery" :

            PWF.flags.galleryReady,

        "Testimonials" :

            PWF.flags.testimonialsReady,

        "Contact" :

            PWF.flags.contactReady,

        "Search" :

            PWF.flags.searchReady,

        "PWA" :

            PWF.flags.pwaReady

    });

    console.groupEnd();

};


/*------------------------------------------------------------------------------
UPDATE INITIALIZATION

Add these lines at the END of init()

------------------------------------------------------------------------------*/

// Print Summary

this.summary();

// Framework Ready

PWF.flags.pwaReady = true;

// Final Summary

this.finalSummary();

// Notify Framework

document.dispatchEvent(

    new CustomEvent(

        "PWF:PWAReady",

        {

            detail : this.info()

        }

    )

);


/******************************************************************************
END OF FILE

pwa.js

Premanandhan Web Framework

Version 1.0

PWA Module Completed

******************************************************************************/
