/******************************************************************************
Project      : Premanandhan Web Framework (PWF)
Website      : Sam Marbles & Granites
File         : products.js
Purpose      : Product Management Module
Author       : Premanandhan Narayanan
Version      : 1.0
******************************************************************************/

"use strict";

/*------------------------------------------------------------------------------
CREATE PRODUCTS MODULE
------------------------------------------------------------------------------*/

PWF.products = {

    /*--------------------------------------------------------------------------
    DATA
    --------------------------------------------------------------------------*/

    products : [],

    filteredProducts : [],

    categories : [],

    currentCategory : "all",

    /*--------------------------------------------------------------------------
    DOM ELEMENTS
    --------------------------------------------------------------------------*/

    container : null,

    categoryContainer : null,

    searchBox : null,

    totalProducts : null,

    /*--------------------------------------------------------------------------
    INITIALIZE
    --------------------------------------------------------------------------*/

    async init(){

        PWF.log("Initializing Products Module...");

        this.cacheElements();

        this.loadProducts();

        this.bindEvents();

    }

};


/*------------------------------------------------------------------------------
REGISTER MODULE
------------------------------------------------------------------------------*/

PWF.registerModule(

    "products",

    PWF.products

);


/*------------------------------------------------------------------------------
CACHE DOM ELEMENTS
------------------------------------------------------------------------------*/

PWF.products.cacheElements = function(){

    this.container =

        PWF.utils.$("#products-container");

    this.categoryContainer =

        PWF.utils.$("#category-container");

    this.searchBox =

        PWF.utils.$("#product-search");

    this.totalProducts =

        PWF.utils.$("#total-products");

};


/*------------------------------------------------------------------------------
LOAD PRODUCTS

------------------------------------------------------------------------------*/

PWF.products.loadProducts = function(){

    const data = PWF.loader.get("products");

    if(!data){

        PWF.warn(

            "products.json not loaded."

        );

        return;

    }

    this.products = data.products || [];

    this.filteredProducts =

        [...this.products];

    PWF.log(

        `${this.products.length} products loaded.`

    );

};


/*------------------------------------------------------------------------------
BIND EVENTS

------------------------------------------------------------------------------*/

PWF.products.bindEvents = function(){

    if(this.searchBox){

        this.searchBox.addEventListener(

            "input",

            PWF.utils.debounce(

                (event) => {

                    this.search(

                        event.target.value

                    );

                },

                300

            )

        );

    }

};


/*------------------------------------------------------------------------------
PRODUCTS READY

------------------------------------------------------------------------------*/

document.addEventListener(

    "PWF:ProductsReady",

    function(){

        PWF.log(

            "Products Module Ready."

        );

    }

);


/******************************************************************************
END OF PART 1

NEXT PART

LOAD CATEGORIES

RENDER CATEGORY BUTTONS

RENDER PRODUCTS

PRODUCT COUNT

******************************************************************************/
/******************************************************************************
PART 2

LOAD CATEGORIES

RENDER CATEGORY BUTTONS

RENDER PRODUCTS

PRODUCT COUNT

******************************************************************************/

/*------------------------------------------------------------------------------
LOAD CATEGORIES

------------------------------------------------------------------------------*/

PWF.products.loadCategories = function(){

    const categories = new Set();

    categories.add("all");

    this.products.forEach(product => {

        if(product.category){

            categories.add(

                product.category

            );

        }

    });

    this.categories = [...categories];

};


/*------------------------------------------------------------------------------
RENDER CATEGORY BUTTONS

------------------------------------------------------------------------------*/

PWF.products.renderCategories = function(){

    if(!this.categoryContainer){

        return;

    }

    this.categoryContainer.innerHTML = "";

    this.categories.forEach(category => {

        const button =

            PWF.utils.createElement(

                "button",

                "category-button",

                PWF.utils.titleCase(category)

            );

        button.dataset.category = category;

        if(category === this.currentCategory){

            button.classList.add("active");

        }

        button.addEventListener(

            "click",

            () => {

                this.filterByCategory(category);

            }

        );

        this.categoryContainer.appendChild(button);

    });

};


/*------------------------------------------------------------------------------
RENDER PRODUCTS

------------------------------------------------------------------------------*/

PWF.products.renderProducts = function(){

    if(!this.container){

        return;

    }

    this.container.innerHTML = "";

    this.filteredProducts.forEach(product => {

        this.container.appendChild(

            this.createProductCard(product)

        );

    });

    this.updateProductCount();

};


/*------------------------------------------------------------------------------
CREATE PRODUCT CARD

------------------------------------------------------------------------------*/

PWF.products.createProductCard = function(product){

    const card =

        PWF.utils.createElement(

            "article",

            "product-card"

        );

    card.innerHTML = `

        <img

            src="${product.image}"

            alt="${product.name}"

            loading="lazy"

        >

        <div class="product-content">

            <h3>${product.name}</h3>

            <p>${product.category}</p>

        </div>

    `;

    return card;

};


/*------------------------------------------------------------------------------
UPDATE PRODUCT COUNT

------------------------------------------------------------------------------*/

PWF.products.updateProductCount = function(){

    if(!this.totalProducts){

        return;

    }

    this.totalProducts.textContent =

        `${this.filteredProducts.length} Products`;

};


/*------------------------------------------------------------------------------
UPDATE loadProducts()

Add these lines at the END

------------------------------------------------------------------------------*/

// Load Categories

this.loadCategories();

// Render Category Buttons

this.renderCategories();

// Render Products

this.renderProducts();


/******************************************************************************
END OF PART 2

NEXT PART

CATEGORY FILTER

SEARCH

CLEAR FILTERS

NO RESULTS

******************************************************************************/
/******************************************************************************
PART 3

CATEGORY FILTER

SEARCH

CLEAR FILTERS

NO RESULTS

******************************************************************************/

/*------------------------------------------------------------------------------
FILTER BY CATEGORY

------------------------------------------------------------------------------*/

PWF.products.filterByCategory = function(category){

    this.currentCategory = category;

    if(category === "all"){

        this.filteredProducts = [...this.products];

    }
    else{

        this.filteredProducts = this.products.filter(product =>

            product.category === category

        );

    }

    this.renderProducts();

    this.updateCategoryButtons();

};


/*------------------------------------------------------------------------------
SEARCH PRODUCTS

------------------------------------------------------------------------------*/

PWF.products.search = function(keyword){

    keyword = keyword.trim().toLowerCase();

    if(keyword === ""){

        this.filterByCategory(this.currentCategory);

        return;

    }

    const source =

        this.currentCategory === "all"

        ? this.products

        : this.products.filter(product =>

            product.category === this.currentCategory

        );

    this.filteredProducts = source.filter(product =>

        product.name.toLowerCase().includes(keyword) ||

        product.category.toLowerCase().includes(keyword)

    );

    this.renderProducts();

};


/*------------------------------------------------------------------------------
UPDATE CATEGORY BUTTONS

------------------------------------------------------------------------------*/

PWF.products.updateCategoryButtons = function(){

    const buttons =

        PWF.utils.$$(".category-button");

    buttons.forEach(button => {

        button.classList.toggle(

            "active",

            button.dataset.category === this.currentCategory

        );

    });

};


/*------------------------------------------------------------------------------
CLEAR FILTERS

------------------------------------------------------------------------------*/

PWF.products.clearFilters = function(){

    this.currentCategory = "all";

    this.filteredProducts = [...this.products];

    if(this.searchBox){

        this.searchBox.value = "";

    }

    this.updateCategoryButtons();

    this.renderProducts();

};


/*------------------------------------------------------------------------------
NO RESULTS MESSAGE

------------------------------------------------------------------------------*/

PWF.products.showNoResults = function(){

    this.container.innerHTML = `

        <div class="no-products">

            <h3>No Products Found</h3>

            <p>

                Try a different search term or category.

            </p>

        </div>

    `;

};


/*------------------------------------------------------------------------------
UPDATE renderProducts()

Replace the beginning of renderProducts()

------------------------------------------------------------------------------*/

if(!this.container){

    return;

}

this.container.innerHTML = "";

if(this.filteredProducts.length === 0){

    this.showNoResults();

    this.updateProductCount();

    return;

}


/******************************************************************************
END OF PART 3

NEXT PART

PRODUCT DETAILS

FEATURED PRODUCTS

SORTING

ANIMATIONS

******************************************************************************/
/******************************************************************************
PART 4

PRODUCT DETAILS

FEATURED PRODUCTS

SORTING

ANIMATIONS

******************************************************************************/

/*------------------------------------------------------------------------------
SHOW PRODUCT DETAILS

------------------------------------------------------------------------------*/

PWF.products.showDetails = function(product){

    const modal = PWF.utils.$("#product-modal");

    const content = PWF.utils.$("#product-modal-content");

    if(!modal || !content){

        return;

    }

    content.innerHTML = `

        <img
            src="${product.image}"
            alt="${product.name}"
            class="product-modal-image"
        >

        <h2>${product.name}</h2>

        <p><strong>Category:</strong> ${product.category}</p>

        <p>${product.description || ""}</p>

    `;

    modal.classList.add("show");

};


/*------------------------------------------------------------------------------
CLOSE PRODUCT DETAILS

------------------------------------------------------------------------------*/

PWF.products.closeDetails = function(){

    const modal = PWF.utils.$("#product-modal");

    if(modal){

        modal.classList.remove("show");

    }

};


/*------------------------------------------------------------------------------
FEATURED PRODUCTS

------------------------------------------------------------------------------*/

PWF.products.getFeaturedProducts = function(){

    return this.products.filter(product =>

        product.featured === true

    );

};


/*------------------------------------------------------------------------------
SORT PRODUCTS

name

category

------------------------------------------------------------------------------*/

PWF.products.sort = function(field = "name"){

    this.filteredProducts.sort((a,b)=>{

        return String(a[field]).localeCompare(

            String(b[field])

        );

    });

    this.renderProducts();

};


/*------------------------------------------------------------------------------
UPDATE createProductCard()

Add this BEFORE

return card;

------------------------------------------------------------------------------*/

card.addEventListener(

    "click",

    () => this.showDetails(product)

);


/*------------------------------------------------------------------------------
UPDATE bindEvents()

------------------------------------------------------------------------------*/

const closeButton =

    PWF.utils.$("#product-modal-close");

if(closeButton){

    closeButton.addEventListener(

        "click",

        () => this.closeDetails()

    );

}


const modal =

    PWF.utils.$("#product-modal");

if(modal){

    modal.addEventListener(

        "click",

        (event)=>{

            if(event.target === modal){

                this.closeDetails();

            }

        }

    );

}


/******************************************************************************
END OF PART 4

NEXT PART

LAZY LOADING

PRODUCT STATISTICS

DEBUG

SUMMARY

******************************************************************************/
/******************************************************************************
PART 5

LAZY LOADING

PRODUCT STATISTICS

DEBUG

SUMMARY

******************************************************************************/

/*------------------------------------------------------------------------------
REFRESH PRODUCTS

Re-render Current View

------------------------------------------------------------------------------*/

PWF.products.refresh = function(){

    this.renderProducts();

};


/*------------------------------------------------------------------------------
PRODUCT STATISTICS

------------------------------------------------------------------------------*/

PWF.products.statistics = function(){

    return{

        totalProducts : this.products.length,

        filteredProducts : this.filteredProducts.length,

        totalCategories : this.categories.length,

        currentCategory : this.currentCategory

    };

};


/*------------------------------------------------------------------------------
GET PRODUCT BY ID

------------------------------------------------------------------------------*/

PWF.products.getById = function(id){

    return this.products.find(product =>

        product.id === id

    ) || null;

};


/*------------------------------------------------------------------------------
GET PRODUCTS BY CATEGORY

------------------------------------------------------------------------------*/

PWF.products.getByCategory = function(category){

    if(category === "all"){

        return [...this.products];

    }

    return this.products.filter(product =>

        product.category === category

    );

};


/*------------------------------------------------------------------------------
DEBUG INFORMATION

------------------------------------------------------------------------------*/

PWF.products.debug = function(){

    console.group(

        "%cProducts Debug",

        "color:#0B5ED7;font-weight:bold;"

    );

    console.table(

        this.statistics()

    );

    console.groupEnd();

};


/*------------------------------------------------------------------------------
MODULE SUMMARY

------------------------------------------------------------------------------*/

PWF.products.summary = function(){

    PWF.log("--------------------------------");

    PWF.log("Products Module");

    PWF.log("--------------------------------");

    PWF.log(

        `Products   : ${this.products.length}`

    );

    PWF.log(

        `Categories : ${this.categories.length}`

    );

    PWF.log(

        `Current    : ${this.currentCategory}`

    );

};


/*------------------------------------------------------------------------------
MODULE INFORMATION

------------------------------------------------------------------------------*/

PWF.products.info = function(){

    return{

        products : this.products.length,

        filtered : this.filteredProducts.length,

        categories : this.categories.length,

        currentCategory : this.currentCategory

    };

};


/*------------------------------------------------------------------------------
INITIALIZATION UPDATE

Add these lines at the END of init()

------------------------------------------------------------------------------*/

// Print Summary

this.summary();

// Framework Ready

PWF.flags.productsReady = true;

// Notify Framework

document.dispatchEvent(

    new CustomEvent(

        "PWF:ProductsReady",

        {

            detail : this.info()

        }

    )

);


/******************************************************************************
END OF PART 5

NEXT PART

PRODUCT UTILITIES

RELATED PRODUCTS

FUTURE FEATURES

END OF products.js

******************************************************************************/
/******************************************************************************
PART 6

PRODUCT UTILITIES

RELATED PRODUCTS

RESET

FRAMEWORK READY

END OF PRODUCTS.JS

******************************************************************************/

/*------------------------------------------------------------------------------
GET RELATED PRODUCTS

Returns products from the same category

------------------------------------------------------------------------------*/

PWF.products.getRelatedProducts = function(productId, limit = 4){

    const product = this.getById(productId);

    if(!product){

        return [];

    }

    return this.products.filter(item =>

        item.id !== product.id &&

        item.category === product.category

    ).slice(0, limit);

};


/*------------------------------------------------------------------------------
CHECK PRODUCT EXISTS

------------------------------------------------------------------------------*/

PWF.products.exists = function(productId){

    return this.getById(productId) !== null;

};


/*------------------------------------------------------------------------------
RESET PRODUCTS MODULE

------------------------------------------------------------------------------*/

PWF.products.reset = function(){

    this.filteredProducts = [...this.products];

    this.currentCategory = "all";

    if(this.searchBox){

        this.searchBox.value = "";

    }

    this.updateCategoryButtons();

    this.renderProducts();

};


/*------------------------------------------------------------------------------
GET ALL PRODUCTS

------------------------------------------------------------------------------*/

PWF.products.getAll = function(){

    return [...this.products];

};


/*------------------------------------------------------------------------------
EXPORT PRODUCT DATA

Useful for future reports

------------------------------------------------------------------------------*/

PWF.products.export = function(){

    return JSON.parse(

        JSON.stringify(this.products)

    );

};


/*------------------------------------------------------------------------------
FRAMEWORK HEALTH CHECK

------------------------------------------------------------------------------*/

PWF.products.healthCheck = function(){

    return{

        loaded : this.products.length > 0,

        categories : this.categories.length,

        ready : PWF.flags.productsReady

    };

};


/*------------------------------------------------------------------------------
FINAL SUMMARY

------------------------------------------------------------------------------*/

PWF.products.finalSummary = function(){

    console.group(

        "%cProducts Module Completed",

        "color:#198754;font-weight:bold;"

    );

    console.table({

        "Products" : this.products.length,

        "Categories" : this.categories.length,

        "Current Category" : this.currentCategory,

        "Module Ready" : PWF.flags.productsReady

    });

    console.groupEnd();

};


/*------------------------------------------------------------------------------
UPDATE INITIALIZATION

Add these lines after summary()

------------------------------------------------------------------------------*/

this.finalSummary();


/******************************************************************************
END OF FILE

products.js

Premanandhan Web Framework

Version 1.0

Products Module Completed

******************************************************************************/
