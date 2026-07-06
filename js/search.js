/******************************************************************************
Project      : Premanandhan Web Framework (PWF)
Website      : Sam Marbles & Granites
File         : search.js
Purpose      : Universal Search Service
Author       : Premanandhan Narayanan
Version      : 1.0
******************************************************************************/

"use strict";

/*------------------------------------------------------------------------------
CREATE SEARCH MODULE
------------------------------------------------------------------------------*/

PWF.search = {

    /*--------------------------------------------------------------------------
    SEARCH DATA
    --------------------------------------------------------------------------*/

    query : "",

    results : [],

    searchableModules : [

        "products",

        "gallery",

        "testimonials"

    ],

    /*--------------------------------------------------------------------------
    DOM ELEMENTS
    --------------------------------------------------------------------------*/

    searchBox : null,

    resultsContainer : null,

    resultCount : null,

    clearButton : null,

    /*--------------------------------------------------------------------------
    INITIALIZE
    --------------------------------------------------------------------------*/

    async init(){

        PWF.log(

            "Initializing Search Module..."

        );

        this.cacheElements();

        this.bindEvents();

    }

};


/*------------------------------------------------------------------------------
REGISTER MODULE
------------------------------------------------------------------------------*/

PWF.registerModule(

    "search",

    PWF.search

);


/*------------------------------------------------------------------------------
CACHE DOM ELEMENTS
------------------------------------------------------------------------------*/

PWF.search.cacheElements = function(){

    this.searchBox =

        PWF.utils.$("#site-search");

    this.resultsContainer =

        PWF.utils.$("#search-results");

    this.resultCount =

        PWF.utils.$("#search-count");

    this.clearButton =

        PWF.utils.$("#search-clear");

};


/*------------------------------------------------------------------------------
BIND EVENTS
------------------------------------------------------------------------------*/

PWF.search.bindEvents = function(){

    if(this.searchBox){

        this.searchBox.addEventListener(

            "input",

            PWF.utils.debounce(

                (event)=>{

                    this.search(

                        event.target.value

                    );

                },

                300

            )

        );

    }

    if(this.clearButton){

        this.clearButton.addEventListener(

            "click",

            ()=>this.clear()

        );

    }

};


/*------------------------------------------------------------------------------
CLEAR SEARCH

------------------------------------------------------------------------------*/

PWF.search.clear = function(){

    this.query = "";

    this.results = [];

    if(this.searchBox){

        this.searchBox.value = "";

    }

    this.renderResults();

};


/*------------------------------------------------------------------------------
SEARCH READY

------------------------------------------------------------------------------*/

document.addEventListener(

    "PWF:SearchReady",

    function(){

        PWF.log(

            "Search Module Ready."

        );

    }

);


/******************************************************************************
END OF PART 1

NEXT PART

SEARCH PRODUCTS

SEARCH GALLERY

SEARCH TESTIMONIALS

COLLECT RESULTS

******************************************************************************/
/******************************************************************************
PART 2

SEARCH PRODUCTS

SEARCH GALLERY

SEARCH TESTIMONIALS

COLLECT RESULTS

******************************************************************************/

/*------------------------------------------------------------------------------
SEARCH

------------------------------------------------------------------------------*/

PWF.search.search = function(query){

    this.query = query.trim().toLowerCase();

    this.results = [];

    if(this.query.length === 0){

        this.renderResults();

        return;

    }

    this.searchProducts();

    this.searchGallery();

    this.searchTestimonials();

    this.renderResults();

};


/*------------------------------------------------------------------------------
SEARCH PRODUCTS

------------------------------------------------------------------------------*/

PWF.search.searchProducts = function(){

    if(!PWF.products){

        return;

    }

    PWF.products.getAll().forEach(product=>{

        const text = [

            product.name,

            product.category,

            product.description || ""

        ].join(" ").toLowerCase();

        if(text.includes(this.query)){

            this.results.push({

                module : "Products",

                type : "product",

                title : product.name,

                subtitle : product.category,

                data : product

            });

        }

    });

};


/*------------------------------------------------------------------------------
SEARCH GALLERY

------------------------------------------------------------------------------*/

PWF.search.searchGallery = function(){

    if(!PWF.gallery){

        return;

    }

    PWF.gallery.images.forEach(image=>{

        const text = [

            image.title,

            image.category,

            image.description || ""

        ].join(" ").toLowerCase();

        if(text.includes(this.query)){

            this.results.push({

                module : "Gallery",

                type : "image",

                title : image.title,

                subtitle : image.category,

                data : image

            });

        }

    });

};


/*------------------------------------------------------------------------------
SEARCH TESTIMONIALS

------------------------------------------------------------------------------*/

PWF.search.searchTestimonials = function(){

    if(!PWF.testimonials){

        return;

    }

    PWF.testimonials.testimonials.forEach(item=>{

        const text = [

            item.name,

            item.review,

            item.location || ""

        ].join(" ").toLowerCase();

        if(text.includes(this.query)){

            this.results.push({

                module : "Testimonials",

                type : "testimonial",

                title : item.name,

                subtitle : item.review.substring(0,60),

                data : item

            });

        }

    });

};


/*------------------------------------------------------------------------------
UPDATE RESULT COUNT

------------------------------------------------------------------------------*/

PWF.search.updateCount = function(){

    if(!this.resultCount){

        return;

    }

    this.resultCount.textContent =

        `${this.results.length} Results Found`;

};


/******************************************************************************
END OF PART 2

NEXT PART

RENDER RESULTS

RESULT CARD

NO RESULTS

RESULT CLICK

******************************************************************************/
/******************************************************************************
PART 3

RENDER RESULTS

RESULT CARD

NO RESULTS

RESULT CLICK

******************************************************************************/

/*------------------------------------------------------------------------------
RENDER SEARCH RESULTS

------------------------------------------------------------------------------*/

PWF.search.renderResults = function(){

    if(!this.resultsContainer){

        return;

    }

    this.resultsContainer.innerHTML = "";

    if(this.results.length === 0){

        this.showNoResults();

        this.updateCount();

        return;

    }

    this.results.forEach(result=>{

        this.resultsContainer.appendChild(

            this.createResultCard(result)

        );

    });

    this.updateCount();

};


/*------------------------------------------------------------------------------
CREATE RESULT CARD

------------------------------------------------------------------------------*/

PWF.search.createResultCard = function(result){

    const card =

        PWF.utils.createElement(

            "article",

            "search-result-card"

        );

    card.innerHTML = `

        <div class="search-result-header">

            <span class="search-module">

                ${result.module}

            </span>

        </div>

        <h3>

            ${result.title}

        </h3>

        <p>

            ${result.subtitle}

        </p>

    `;

    card.addEventListener(

        "click",

        ()=>{

            this.openResult(result);

        }

    );

    return card;

};


/*------------------------------------------------------------------------------
NO RESULTS

------------------------------------------------------------------------------*/

PWF.search.showNoResults = function(){

    this.resultsContainer.innerHTML = `

        <div class="search-no-results">

            <h3>

                No Results Found

            </h3>

            <p>

                Try another keyword or browse our categories.

            </p>

        </div>

    `;

};


/*------------------------------------------------------------------------------
OPEN SEARCH RESULT

------------------------------------------------------------------------------*/

PWF.search.openResult = function(result){

    switch(result.type){

        case "product":

            PWF.products.showDetails(

                result.data

            );

            break;

        case "image":

            const index =

                PWF.gallery.images.findIndex(

                    image => image.id === result.data.id

                );

            if(index >= 0){

                PWF.gallery.openLightbox(index);

            }

            break;

        case "testimonial":

            const testimonialIndex =

                PWF.testimonials.testimonials.findIndex(

                    item => item.id === result.data.id

                );

            if(testimonialIndex >= 0){

                PWF.testimonials.goTo(

                    testimonialIndex

                );

            }

            break;

    }

};


/*------------------------------------------------------------------------------
CLEAR RESULTS

------------------------------------------------------------------------------*/

PWF.search.clearResults = function(){

    this.results = [];

    this.renderResults();

};


/******************************************************************************
END OF PART 3

NEXT PART

SORT RESULTS

KEYBOARD NAVIGATION

SEARCH HISTORY

RECENT SEARCHES

******************************************************************************/
/******************************************************************************
PART 4

SORT RESULTS

KEYBOARD NAVIGATION

SEARCH HISTORY

RECENT SEARCHES

******************************************************************************/

/*------------------------------------------------------------------------------
SORT RESULTS

------------------------------------------------------------------------------*/

PWF.search.sortResults = function(){

    this.results.sort((a,b)=>{

        return (b.score || 0) - (a.score || 0);

    });

};


/*------------------------------------------------------------------------------
CALCULATE RELEVANCE SCORE

------------------------------------------------------------------------------*/

PWF.search.calculateScore = function(title,subtitle){

    let score = 0;

    const query = this.query;

    title = (title || "").toLowerCase();

    subtitle = (subtitle || "").toLowerCase();

    if(title.includes(query)){

        score += 10;

    }

    if(subtitle.includes(query)){

        score += 5;

    }

    return score;

};


/*------------------------------------------------------------------------------
UPDATE SEARCH FUNCTIONS

After pushing each result

Add

score : this.calculateScore(...)

Example

------------------------------------------------------------------------------*/

/*

this.results.push({

    module : "Products",

    type : "product",

    title : product.name,

    subtitle : product.category,

    data : product,

    score : this.calculateScore(

        product.name,

        product.category

    )

});

*/


/*------------------------------------------------------------------------------
KEYBOARD NAVIGATION

------------------------------------------------------------------------------*/

PWF.search.handleKeyboard = function(event){

    if(event.key === "Escape"){

        this.clear();

    }

};


/*------------------------------------------------------------------------------
SAVE SEARCH HISTORY

------------------------------------------------------------------------------*/

PWF.search.saveHistory = function(){

    if(this.query.length < 2){

        return;

    }

    let history =

        PWF.utils.getStorage(

            "search-history"

        ) || [];

    history = history.filter(

        item => item !== this.query

    );

    history.unshift(this.query);

    history = history.slice(0,10);

    PWF.utils.setStorage(

        "search-history",

        history

    );

};


/*------------------------------------------------------------------------------
GET SEARCH HISTORY

------------------------------------------------------------------------------*/

PWF.search.getHistory = function(){

    return PWF.utils.getStorage(

        "search-history"

    ) || [];

};


/*------------------------------------------------------------------------------
CLEAR SEARCH HISTORY

------------------------------------------------------------------------------*/

PWF.search.clearHistory = function(){

    PWF.utils.removeStorage(

        "search-history"

    );

};


/*------------------------------------------------------------------------------
UPDATE search()

Before renderResults()

Add

------------------------------------------------------------------------------*/

this.sortResults();

this.saveHistory();


/*------------------------------------------------------------------------------
UPDATE bindEvents()

Add

------------------------------------------------------------------------------*/

document.addEventListener(

    "keydown",

    (event)=>this.handleKeyboard(event)

);


/******************************************************************************
END OF PART 4

NEXT PART

SUMMARY

DEBUG

HEALTH CHECK

FRAMEWORK READY

END OF search.js

******************************************************************************/
/******************************************************************************
PART 5

SUMMARY

DEBUG

HEALTH CHECK

FRAMEWORK READY

END OF SEARCH.JS

******************************************************************************/

/*------------------------------------------------------------------------------
MODULE SUMMARY

------------------------------------------------------------------------------*/

PWF.search.summary = function(){

    PWF.log("--------------------------------");

    PWF.log("Search Module");

    PWF.log("--------------------------------");

    PWF.log(

        `Current Query : ${this.query || "(none)"}`

    );

    PWF.log(

        `Results       : ${this.results.length}`

    );

    PWF.log(

        `Modules       : ${this.searchableModules.length}`

    );

};


/*------------------------------------------------------------------------------
MODULE INFORMATION

------------------------------------------------------------------------------*/

PWF.search.info = function(){

    return{

        query : this.query,

        totalResults : this.results.length,

        searchableModules :

            [...this.searchableModules],

        history :

            this.getHistory()

    };

};


/*------------------------------------------------------------------------------
REFRESH SEARCH

------------------------------------------------------------------------------*/

PWF.search.refresh = function(){

    if(this.query){

        this.search(this.query);
    }
    else{

        this.renderResults();

    }

};


/*------------------------------------------------------------------------------
HEALTH CHECK

------------------------------------------------------------------------------*/

PWF.search.healthCheck = function(){

    return{

        searchBoxReady :

            this.searchBox !== null,

        resultsContainerReady :

            this.resultsContainer !== null,

        resultCountReady :

            this.resultCount !== null,

        clearButtonReady :

            this.clearButton !== null,

        searchableModules :

            this.searchableModules.length,

        moduleReady :

            PWF.flags.searchReady

    };

};


/*------------------------------------------------------------------------------
DEBUG INFORMATION

------------------------------------------------------------------------------*/

PWF.search.debug = function(){

    console.group(

        "%cSearch Debug",

        "color:#0dcaf0;font-weight:bold;"

    );

    console.table({

        "Current Query" :

            this.query,

        "Results Found" :

            this.results.length,

        "History Items" :

            this.getHistory().length,

        "Modules" :

            this.searchableModules.join(", "),

        "Module Ready" :

            PWF.flags.searchReady

    });

    console.groupEnd();

};


/*------------------------------------------------------------------------------
FINAL SUMMARY

------------------------------------------------------------------------------*/

PWF.search.finalSummary = function(){

    console.group(

        "%cSearch Module Completed",

        "color:#198754;font-weight:bold;"

    );

    console.table({

        "Searchable Modules" :

            this.searchableModules.length,

        "Current Results" :

            this.results.length,

        "History" :

            this.getHistory().length,

        "Module Ready" :

            PWF.flags.searchReady

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

PWF.flags.searchReady = true;

// Final Summary

this.finalSummary();

// Notify Framework

document.dispatchEvent(

    new CustomEvent(

        "PWF:SearchReady",

        {

            detail : this.info()

        }

    )

);


/******************************************************************************
END OF FILE

search.js

Premanandhan Web Framework

Version 1.0

Search Module Completed

******************************************************************************/
