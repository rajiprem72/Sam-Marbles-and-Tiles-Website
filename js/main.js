/******************************************************************************
Project      : Premanandhan Web Framework (PWF)
Website      : Sam Marbles & Granites
File         : main.js
Purpose      : Framework Bootstrap
Author       : Premanandhan Narayanan
Version      : 1.0
******************************************************************************/

"use strict";

/*------------------------------------------------------------------------------
FRAMEWORK BOOTSTRAP
------------------------------------------------------------------------------*/

document.addEventListener("DOMContentLoaded", async () => {

    try{

        startupBanner();

        PWF.log("Starting Premanandhan Web Framework...");

        await initializeFramework();

    }

    catch(error){

        PWF.error(

            "Framework failed to initialize.",

            error

        );

    }

});


/*------------------------------------------------------------------------------
INITIALIZE FRAMEWORK
------------------------------------------------------------------------------*/

async function initializeFramework(){

    PWF.log("Validating framework...");

    if(!PWF.validate()){

        throw new Error(

            "Framework configuration is invalid."

        );

    }

    PWF.log("Framework validated successfully.");

    PWF.flags.initialized = true;

}


/*------------------------------------------------------------------------------
STARTUP BANNER
------------------------------------------------------------------------------*/

function startupBanner(){

    console.clear();

    console.log(

`%c
=========================================================

 Premanandhan Web Framework (PWF)

 Version : ${PWF.version.framework}

 Website : ${PWF.config.website.name}

=========================================================

 Framework Initializing...

=========================================================
`,

"color:#0B5ED7;font-size:13px;font-weight:bold;"

    );

}


/*------------------------------------------------------------------------------
APPLICATION READY EVENT
------------------------------------------------------------------------------*/

document.addEventListener(

    "PWF:Ready",

    () => {

        PWF.log(

            "Application Ready."

        );

    }

);


/******************************************************************************
END OF PART 1

NEXT PART

LOAD MODULES

Loader

Theme

Navigation

Business Hours

Search

******************************************************************************/
/******************************************************************************
PART 2

MODULE INITIALIZATION

Loader

Theme

Navigation

Business Hours

Search

******************************************************************************/

/*------------------------------------------------------------------------------
STARTUP MODULES

Execution Order Matters

------------------------------------------------------------------------------*/

const startupModules = [

    "loader",

    "theme",

    "navigation",

    "businessHours",

    "search"

];


/*------------------------------------------------------------------------------
INITIALIZE MODULES

------------------------------------------------------------------------------*/

async function initializeModules(){

    PWF.log("Initializing Framework Modules...");

    for(const moduleName of startupModules){

        if(!PWF.isEnabled(moduleName)){

            PWF.log(`${moduleName} module disabled.`);

            continue;

        }

        const module = PWF.getModule(moduleName);

        if(!module){

            PWF.warn(`${moduleName} module not registered.`);

            continue;

        }

        if(typeof module.init !== "function"){

            PWF.warn(`${moduleName} has no init() method.`);

            continue;

        }

        try{

            PWF.log(`Initializing ${moduleName}...`);

            await module.init();

            PWF.log(`${moduleName} initialized.`);

        }

        catch(error){

            PWF.error(

                `${moduleName} initialization failed.`,

                error

            );

        }

    }

}


/*------------------------------------------------------------------------------
LOAD APPLICATION

------------------------------------------------------------------------------*/

async function loadApplication(){

    await initializeModules();

}


/*------------------------------------------------------------------------------
UPDATE FRAMEWORK INITIALIZATION

Replace the end of initializeFramework()

------------------------------------------------------------------------------*/

// Replace these lines

// PWF.flags.initialized = true;

// with

await loadApplication();

PWF.flags.initialized = true;

PWF.log("Core modules initialized.");


/*------------------------------------------------------------------------------
DISPATCH READY EVENT

------------------------------------------------------------------------------*/

function frameworkReady(){

    document.dispatchEvent(

        new CustomEvent(

            "PWF:Ready",

            {

                detail:{

                    version:PWF.version.framework,

                    timestamp:new Date()

                }

            }

        )

    );

}


/******************************************************************************
END OF PART 2

NEXT PART

PRODUCTS

GALLERY

TESTIMONIALS

CONTACT

ANIMATIONS

******************************************************************************/
/******************************************************************************
PART 3

CONTENT MODULES

Products

Showroom

Testimonials

Contact

******************************************************************************/

/*------------------------------------------------------------------------------
CONTENT MODULES

These modules depend on the basic framework being initialized first.

------------------------------------------------------------------------------*/

const contentModules = [

    "products",

    "showroom",

    "testimonials",

    "contact"

];


/*------------------------------------------------------------------------------
INITIALIZE CONTENT MODULES

------------------------------------------------------------------------------*/

async function initializeContentModules(){

    PWF.log("Initializing Content Modules...");

    for(const moduleName of contentModules){

        if(!PWF.isEnabled(moduleName)){

            PWF.log(`${moduleName} module disabled.`);

            continue;

        }

        const module = PWF.getModule(moduleName);

        if(!module){

            PWF.warn(`${moduleName} module not registered.`);

            continue;

        }

        if(typeof module.init !== "function"){

            PWF.warn(`${moduleName} has no init() method.`);

            continue;

        }

        try{

            PWF.log(`Loading ${moduleName}...`);

            await module.init();

            PWF.log(`${moduleName} ready.`);

        }

        catch(error){

            PWF.error(

                `${moduleName} failed.`,

                error

            );

        }

    }

}


/*------------------------------------------------------------------------------
UPDATE APPLICATION LOADER

Replace

await initializeModules();

with

------------------------------------------------------------------------------*/

// Core Modules

await initializeModules();

// Content Modules

await initializeContentModules();

PWF.log("All content modules initialized.");


/*------------------------------------------------------------------------------
FRAMEWORK STATUS

------------------------------------------------------------------------------*/

function showFrameworkStatus(){

    PWF.log("--------------------------------");

    PWF.log("Framework Status");

    PWF.log("--------------------------------");

    PWF.log(`Theme           : ${PWF.features.dailyThemes}`);

    PWF.log(`Products        : ${PWF.features.products}`);

    PWF.log(`Showroom        : ${PWF.features.showroom}`);

    PWF.log(`Testimonials    : ${PWF.features.testimonials}`);

    PWF.log(`Contact         : ${PWF.features.contact}`);

    PWF.log(`Business Hours  : ${PWF.features.businessHours}`);

    PWF.log(`Search          : ${PWF.features.search}`);

    PWF.log(`PWA             : ${PWF.features.pwa}`);

}


/******************************************************************************
END OF PART 3

NEXT PART

GLOBAL EVENTS

WINDOW RESIZE

WINDOW SCROLL

NETWORK STATUS

VISIBILITY CHANGE

ERROR HANDLING

******************************************************************************/
/******************************************************************************
PART 4

GLOBAL EVENTS

WINDOW RESIZE

WINDOW SCROLL

NETWORK STATUS

VISIBILITY CHANGE

ERROR HANDLING

******************************************************************************/

/*------------------------------------------------------------------------------
REGISTER GLOBAL EVENTS

------------------------------------------------------------------------------*/

function registerGlobalEvents(){

    PWF.log("Registering Global Events...");

    window.addEventListener("resize", handleResize);

    window.addEventListener("scroll", handleScroll);

    window.addEventListener("online", handleOnline);

    window.addEventListener("offline", handleOffline);

    document.addEventListener(

        "visibilitychange",

        handleVisibilityChange

    );

}


/*------------------------------------------------------------------------------
WINDOW RESIZE

------------------------------------------------------------------------------*/

function handleResize(){

    PWF.log("Window resized.");

    document.dispatchEvent(

        new CustomEvent(

            "PWF:Resize",

            {

                detail:{

                    width:window.innerWidth,

                    height:window.innerHeight

                }

            }

        )

    );

}


/*------------------------------------------------------------------------------
WINDOW SCROLL

------------------------------------------------------------------------------*/

function handleScroll(){

    document.dispatchEvent(

        new CustomEvent(

            "PWF:Scroll",

            {

                detail:{

                    scrollY:window.scrollY

                }

            }

        )

    );

}


/*------------------------------------------------------------------------------
NETWORK STATUS

------------------------------------------------------------------------------*/

function handleOnline(){

    PWF.log("Internet connection restored.");

    PWF.flags.offline = false;

    document.dispatchEvent(

        new CustomEvent("PWF:Online")

    );

}


function handleOffline(){

    PWF.warn("Internet connection lost.");

    PWF.flags.offline = true;

    document.dispatchEvent(

        new CustomEvent("PWF:Offline")

    );

}


/*------------------------------------------------------------------------------
PAGE VISIBILITY

------------------------------------------------------------------------------*/

function handleVisibilityChange(){

    if(document.hidden){

        PWF.log("Application moved to background.");

    }

    else{

        PWF.log("Application became active.");

    }

}


/*------------------------------------------------------------------------------
GLOBAL ERROR HANDLER

------------------------------------------------------------------------------*/

window.addEventListener(

    "error",

    function(event){

        PWF.error(

            "JavaScript Error",

            event.message

        );

    }

);


/*------------------------------------------------------------------------------
UNHANDLED PROMISE REJECTION

------------------------------------------------------------------------------*/

window.addEventListener(

    "unhandledrejection",

    function(event){

        PWF.error(

            "Unhandled Promise",

            event.reason

        );

    }

);


/*------------------------------------------------------------------------------
UPDATE APPLICATION LOADER

Add this near the end of loadApplication()

------------------------------------------------------------------------------*/

// Register Global Events

registerGlobalEvents();

PWF.log("Global events registered.");


/******************************************************************************
END OF PART 4

NEXT PART

PERFORMANCE

FRAMEWORK READY

STARTUP SUMMARY

DEVELOPER INFORMATION

END OF main.js

******************************************************************************/
/******************************************************************************
PART 5

PERFORMANCE

FRAMEWORK READY

STARTUP SUMMARY

DEVELOPER TOOLS

END OF MAIN.JS

Project : Premanandhan Web Framework (PWF)

******************************************************************************/

/*------------------------------------------------------------------------------
PERFORMANCE TIMER

------------------------------------------------------------------------------*/

let frameworkStartTime = performance.now();


/*------------------------------------------------------------------------------
FRAMEWORK READY

------------------------------------------------------------------------------*/

function frameworkReady(){

    const endTime = performance.now();

    const startupTime = (endTime - frameworkStartTime).toFixed(2);

    PWF.flags.initialized = true;

    PWF.log("Framework Ready.");

    PWF.log(`Startup Time : ${startupTime} ms`);

    document.dispatchEvent(

        new CustomEvent(

            "PWF:Ready",

            {

                detail:{

                    startupTime,

                    version:PWF.version.framework,

                    website:PWF.config.website.name

                }

            }

        )

    );

    showStartupSummary(startupTime);

}


/*------------------------------------------------------------------------------
STARTUP SUMMARY

------------------------------------------------------------------------------*/

function showStartupSummary(startupTime){

    console.group(

        "%cPremanandhan Web Framework",

        "color:#0B5ED7;font-size:14px;font-weight:bold;"

    );

    console.table({

        Framework : PWF.config.framework.name,

        Version   : PWF.version.framework,

        Website   : PWF.config.website.name,

        Language  : PWF.config.website.language,

        Theme     : PWF.config.theme.defaultTheme,

        Debug     : PWF.config.development.debug,

        Startup   : `${startupTime} ms`

    });

    console.groupEnd();

}


/*------------------------------------------------------------------------------
DEVELOPER INFORMATION

------------------------------------------------------------------------------*/

PWF.about = function(){

    console.log("""

======================================================

Premanandhan Web Framework (PWF)

Version : """ + PWF.version.framework + """

Author : Premanandhan Narayanan

Company :

Premanandhan Narayanan Digital Solutions

======================================================

""");

};


/*------------------------------------------------------------------------------
FRAMEWORK INFORMATION

------------------------------------------------------------------------------*/

PWF.info = function(){

    return {

        framework : PWF.config.framework.name,

        version   : PWF.version.framework,

        website   : PWF.config.website.name,

        modules   : Object.keys(PWF.modules).length,

        features  : Object.keys(PWF.features).length

    };

};


/*------------------------------------------------------------------------------
APPLICATION START

Update loadApplication()

At the END of the function add

frameworkReady();

------------------------------------------------------------------------------*/

// frameworkReady();


/******************************************************************************
END OF FILE

File

main.js

Framework Bootstrap Completed

Premanandhan Web Framework

Version 1.0

******************************************************************************/
