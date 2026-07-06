/******************************************************************************
Project      : Premanandhan Web Framework (PWF)
Website      : Sam Marbles & Granites
File         : contact.js
Purpose      : Contact Management Module
Author       : Premanandhan Narayanan
Version      : 1.0
******************************************************************************/

"use strict";

/*------------------------------------------------------------------------------
CREATE CONTACT MODULE
------------------------------------------------------------------------------*/

PWF.contact = {

    /*--------------------------------------------------------------------------
    DATA
    --------------------------------------------------------------------------*/

    company : null,

    contactInfo : null,

    /*--------------------------------------------------------------------------
    DOM ELEMENTS
    --------------------------------------------------------------------------*/

    form : null,

    name : null,

    mobile : null,

    email : null,

    subject : null,

    message : null,

    submitButton : null,

    whatsappButton : null,

    callButton : null,

    mapContainer : null,

    /*--------------------------------------------------------------------------
    INITIALIZE
    --------------------------------------------------------------------------*/

    async init(){

        PWF.log(

            "Initializing Contact Module..."

        );

        this.cacheElements();

        this.loadCompany();

        this.bindEvents();

        this.renderContactInfo();

    }

};


/*------------------------------------------------------------------------------
REGISTER MODULE
------------------------------------------------------------------------------*/

PWF.registerModule(

    "contact",

    PWF.contact

);


/*------------------------------------------------------------------------------
CACHE DOM ELEMENTS
------------------------------------------------------------------------------*/

PWF.contact.cacheElements = function(){

    this.form =

        PWF.utils.$("#contact-form");

    this.name =

        PWF.utils.$("#contact-name");

    this.mobile =

        PWF.utils.$("#contact-mobile");

    this.email =

        PWF.utils.$("#contact-email");

    this.subject =

        PWF.utils.$("#contact-subject");

    this.message =

        PWF.utils.$("#contact-message");

    this.submitButton =

        PWF.utils.$("#contact-submit");

    this.whatsappButton =

        PWF.utils.$("#contact-whatsapp");

    this.callButton =

        PWF.utils.$("#contact-call");

    this.mapContainer =

        PWF.utils.$("#contact-map");

};


/*------------------------------------------------------------------------------
LOAD COMPANY INFORMATION

------------------------------------------------------------------------------*/

PWF.contact.loadCompany = function(){

    const company =

        PWF.loader.get("company");

    if(!company){

        PWF.warn(

            "company.json not loaded."

        );

        return;

    }

    this.company = company;

    this.contactInfo =

        company.contact || {};

};


/*------------------------------------------------------------------------------
BIND EVENTS

------------------------------------------------------------------------------*/

PWF.contact.bindEvents = function(){

    if(this.form){

        this.form.addEventListener(

            "submit",

            (event)=>{

                event.preventDefault();

                this.submit();

            }

        );

    }

};


/*------------------------------------------------------------------------------
RENDER CONTACT INFORMATION

------------------------------------------------------------------------------*/

PWF.contact.renderContactInfo = function(){

    if(!this.company){

        return;

    }

    PWF.log(

        "Contact information loaded."

    );

};


/*------------------------------------------------------------------------------
CONTACT READY

------------------------------------------------------------------------------*/

document.addEventListener(

    "PWF:ContactReady",

    function(){

        PWF.log(

            "Contact Module Ready."

        );

    }

);


/******************************************************************************
END OF PART 1

NEXT PART

FORM VALIDATION

EMAIL VALIDATION

MOBILE VALIDATION

SUBMIT

******************************************************************************/
/******************************************************************************
PART 2

FORM VALIDATION

EMAIL VALIDATION

MOBILE VALIDATION

SUBMIT VALIDATION

******************************************************************************/

/*------------------------------------------------------------------------------
SHOW FIELD ERROR

------------------------------------------------------------------------------*/

PWF.contact.showError = function(field, message){

    if(!field){

        return false;

    }

    field.classList.add("error");

    field.classList.remove("success");

    field.setCustomValidity(message);

    field.reportValidity();

    return false;

};


/*------------------------------------------------------------------------------
CLEAR FIELD ERROR

------------------------------------------------------------------------------*/

PWF.contact.clearError = function(field){

    if(!field){

        return;
    }

    field.classList.remove("error");

    field.classList.add("success");

    field.setCustomValidity("");

};


/*------------------------------------------------------------------------------
VALIDATE NAME

------------------------------------------------------------------------------*/

PWF.contact.validateName = function(){

    const value = this.name.value.trim();

    if(value.length < 3){

        return this.showError(

            this.name,

            "Please enter your name."

        );

    }

    this.clearError(this.name);

    return true;

};


/*------------------------------------------------------------------------------
VALIDATE MOBILE

------------------------------------------------------------------------------*/

PWF.contact.validateMobile = function(){

    const value = this.mobile.value.trim();

    const pattern = /^[6-9]\d{9}$/;

    if(!pattern.test(value)){

        return this.showError(

            this.mobile,

            "Enter a valid 10-digit mobile number."

        );

    }

    this.clearError(this.mobile);

    return true;

};


/*------------------------------------------------------------------------------
VALIDATE EMAIL

------------------------------------------------------------------------------*/

PWF.contact.validateEmail = function(){

    const value = this.email.value.trim();

    const pattern =

        /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!pattern.test(value)){

        return this.showError(

            this.email,

            "Enter a valid email address."

        );

    }

    this.clearError(this.email);

    return true;

};


/*------------------------------------------------------------------------------
VALIDATE SUBJECT

------------------------------------------------------------------------------*/

PWF.contact.validateSubject = function(){

    const value = this.subject.value.trim();

    if(value.length < 5){

        return this.showError(

            this.subject,

            "Please enter a subject."

        );

    }

    this.clearError(this.subject);

    return true;

};


/*------------------------------------------------------------------------------
VALIDATE MESSAGE

------------------------------------------------------------------------------*/

PWF.contact.validateMessage = function(){

    const value = this.message.value.trim();

    if(value.length < 10){

        return this.showError(

            this.message,

            "Message should contain at least 10 characters."

        );

    }

    this.clearError(this.message);

    return true;

};


/*------------------------------------------------------------------------------
VALIDATE COMPLETE FORM

------------------------------------------------------------------------------*/

PWF.contact.validate = function(){

    const valid = [

        this.validateName(),

        this.validateMobile(),

        this.validateEmail(),

        this.validateSubject(),

        this.validateMessage()

    ];

    return valid.every(Boolean);

};


/*------------------------------------------------------------------------------
SUBMIT FORM

------------------------------------------------------------------------------*/

PWF.contact.submit = function(){

    if(!this.validate()){

        return;

    }

    PWF.log(

        "Contact form validated successfully."

    );

};


/*------------------------------------------------------------------------------
UPDATE bindEvents()

Add these lines inside bindEvents()

------------------------------------------------------------------------------*/

[
    this.name,
    this.mobile,
    this.email,
    this.subject,
    this.message

].forEach(field=>{

    if(!field){

        return;
    }

    field.addEventListener(

        "blur",

        ()=>{

            switch(field){

                case this.name:

                    this.validateName();
                    break;

                case this.mobile:

                    this.validateMobile();
                    break;

                case this.email:

                    this.validateEmail();
                    break;

                case this.subject:

                    this.validateSubject();
                    break;

                case this.message:

                    this.validateMessage();
                    break;

            }

        }

    );

});


/******************************************************************************
END OF PART 2

NEXT PART

WHATSAPP

PHONE

EMAIL

GOOGLE MAPS

******************************************************************************/
/******************************************************************************
PART 3

WHATSAPP

PHONE

EMAIL

GOOGLE MAPS

******************************************************************************/

/*------------------------------------------------------------------------------
OPEN WHATSAPP

------------------------------------------------------------------------------*/

PWF.contact.openWhatsApp = function(){

    if(!this.contactInfo.whatsapp){

        PWF.warn("WhatsApp number not available.");

        return;

    }

    const message = encodeURIComponent(

        "Hello, I would like to know more about your products."

    );

    const url =

        `https://wa.me/${this.contactInfo.whatsapp}?text=${message}`;

    window.open(

        url,

        "_blank"

    );

};


/*------------------------------------------------------------------------------
MAKE PHONE CALL

------------------------------------------------------------------------------*/

PWF.contact.call = function(){

    if(!this.contactInfo.phone){

        PWF.warn("Phone number not available.");

        return;

    }

    window.location.href =

        `tel:${this.contactInfo.phone}`;

};


/*------------------------------------------------------------------------------
SEND EMAIL

------------------------------------------------------------------------------*/

PWF.contact.sendEmail = function(){

    if(!this.contactInfo.email){

        PWF.warn("Email address not available.");

        return;

    }

    const subject = encodeURIComponent(

        this.subject ?

        this.subject.value :

        "Website Enquiry"

    );

    const body = encodeURIComponent(

        this.message ?

        this.message.value :

        ""

    );

    window.location.href =

        `mailto:${this.contactInfo.email}?subject=${subject}&body=${body}`;

};


/*------------------------------------------------------------------------------
OPEN GOOGLE MAPS

------------------------------------------------------------------------------*/

PWF.contact.openMap = function(){

    if(!this.contactInfo.map){

        PWF.warn(

            "Google Maps link not available."

        );

        return;

    }

    window.open(

        this.contactInfo.map,

        "_blank"

    );

};


/*------------------------------------------------------------------------------
UPDATE bindEvents()

Add these lines at the END

------------------------------------------------------------------------------*/

// WhatsApp Button

if(this.whatsappButton){

    this.whatsappButton.addEventListener(

        "click",

        ()=>this.openWhatsApp()

    );

}


// Call Button

if(this.callButton){

    this.callButton.addEventListener(

        "click",

        ()=>this.call()

    );

}


// Email Button

const emailButton =

    PWF.utils.$("#contact-email-button");

if(emailButton){

    emailButton.addEventListener(

        "click",

        ()=>this.sendEmail()

    );

}


// Google Maps Button

const mapButton =

    PWF.utils.$("#contact-map-button");

if(mapButton){

    mapButton.addEventListener(

        "click",

        ()=>this.openMap()

    );

}


/*------------------------------------------------------------------------------
GET CONTACT LINKS

Useful for Other Modules

------------------------------------------------------------------------------*/

PWF.contact.getLinks = function(){

    return{

        whatsapp :

            this.contactInfo.whatsapp,

        phone :

            this.contactInfo.phone,

        email :

            this.contactInfo.email,

        map :

            this.contactInfo.map

    };

};


/******************************************************************************
END OF PART 3

NEXT PART

BUSINESS HOURS

CONTACT SUMMARY

SUCCESS MESSAGE

DEBUG

******************************************************************************/
/******************************************************************************
PART 4

BUSINESS HOURS

CONTACT SUMMARY

SUCCESS MESSAGE

DEBUG

******************************************************************************/

/*------------------------------------------------------------------------------
GET BUSINESS STATUS

------------------------------------------------------------------------------*/

PWF.contact.getBusinessStatus = function(){

    if(!PWF.businessHours){

        return null;

    }

    return PWF.businessHours.info();

};


/*------------------------------------------------------------------------------
DISPLAY BUSINESS STATUS

------------------------------------------------------------------------------*/

PWF.contact.renderBusinessStatus = function(){

    const container =

        PWF.utils.$("#business-status");

    if(!container){

        return;

    }

    const info = this.getBusinessStatus();

    if(!info){

        return;

    }

    container.innerHTML = `

        <div class="business-status">

            <span class="status-badge">

                ${info.badge.icon}

                ${info.badge.text}

            </span>

            <p>

                ${info.display}

            </p>

        </div>

    `;

};


/*------------------------------------------------------------------------------
SUCCESS MESSAGE

------------------------------------------------------------------------------*/

PWF.contact.showSuccess = function(message){

    const success =

        PWF.utils.$("#contact-success");

    if(!success){

        PWF.log(message);

        return;

    }

    success.textContent = message;

    success.classList.add("show");

    setTimeout(()=>{

        success.classList.remove("show");

    },5000);

};


/*------------------------------------------------------------------------------
UPDATE SUBMIT()

Replace

PWF.log(...)

with

------------------------------------------------------------------------------*/

this.showSuccess(

    "Thank you! Your enquiry has been received."

);


/*------------------------------------------------------------------------------
MODULE STATISTICS

------------------------------------------------------------------------------*/

PWF.contact.statistics = function(){

    return{

        hasCompany :

            this.company !== null,

        hasForm :

            this.form !== null,

        hasWhatsApp :

            !!this.contactInfo.whatsapp,

        hasPhone :

            !!this.contactInfo.phone,

        hasEmail :

            !!this.contactInfo.email,

        hasMap :

            !!this.contactInfo.map

    };

};


/*------------------------------------------------------------------------------
DEBUG INFORMATION

------------------------------------------------------------------------------*/

PWF.contact.debug = function(){

    console.group(

        "%cContact Debug",

        "color:#20c997;font-weight:bold;"

    );

    console.table(

        this.statistics()

    );

    console.groupEnd();

};


/*------------------------------------------------------------------------------
UPDATE renderContactInfo()

Add this line at the END

------------------------------------------------------------------------------*/

this.renderBusinessStatus();


/******************************************************************************
END OF PART 4

NEXT PART

SUMMARY

HEALTH CHECK

FRAMEWORK READY

END OF contact.js

******************************************************************************/
/******************************************************************************
PART 5

SUMMARY

HEALTH CHECK

FRAMEWORK READY

END OF CONTACT.JS

******************************************************************************/

/*------------------------------------------------------------------------------
MODULE SUMMARY

------------------------------------------------------------------------------*/

PWF.contact.summary = function(){

    PWF.log("--------------------------------");

    PWF.log("Contact Module");

    PWF.log("--------------------------------");

    PWF.log(

        `Company Loaded : ${this.company !== null}`

    );

    PWF.log(

        `Contact Form   : ${this.form !== null}`

    );

    PWF.log(

        `WhatsApp       : ${!!this.contactInfo.whatsapp}`

    );

    PWF.log(

        `Phone          : ${!!this.contactInfo.phone}`

    );

    PWF.log(

        `Email          : ${!!this.contactInfo.email}`

    );

};


/*------------------------------------------------------------------------------
MODULE INFORMATION

------------------------------------------------------------------------------*/

PWF.contact.info = function(){

    return{

        companyLoaded :

            this.company !== null,

        hasForm :

            this.form !== null,

        hasWhatsApp :

            !!this.contactInfo.whatsapp,

        hasPhone :

            !!this.contactInfo.phone,

        hasEmail :

            !!this.contactInfo.email,

        hasMap :

            !!this.contactInfo.map,

        businessHours :

            PWF.businessHours ?

            PWF.businessHours.getBusinessStatus() :

            null

    };

};


/*------------------------------------------------------------------------------
REFRESH CONTACT MODULE

------------------------------------------------------------------------------*/

PWF.contact.refresh = function(){

    this.renderContactInfo();

    this.renderBusinessStatus();

};


/*------------------------------------------------------------------------------
HEALTH CHECK

------------------------------------------------------------------------------*/

PWF.contact.healthCheck = function(){

    return{

        companyLoaded :

            this.company !== null,

        contactFormReady :

            this.form !== null,

        whatsappReady :

            !!this.contactInfo.whatsapp,

        phoneReady :

            !!this.contactInfo.phone,

        emailReady :

            !!this.contactInfo.email,

        mapReady :

            !!this.contactInfo.map,

        businessHoursReady :

            PWF.flags.businessHoursReady,

        moduleReady :

            PWF.flags.contactReady

    };

};


/*------------------------------------------------------------------------------
FINAL SUMMARY

------------------------------------------------------------------------------*/

PWF.contact.finalSummary = function(){

    console.group(

        "%cContact Module Completed",

        "color:#198754;font-weight:bold;"

    );

    console.table({

        "Company Loaded" :

            this.company !== null,

        "Contact Form" :

            this.form !== null,

        "WhatsApp" :

            !!this.contactInfo.whatsapp,

        "Phone" :

            !!this.contactInfo.phone,

        "Email" :

            !!this.contactInfo.email,

        "Business Hours" :

            PWF.flags.businessHoursReady,

        "Module Ready" :

            PWF.flags.contactReady

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

PWF.flags.contactReady = true;

// Final Summary

this.finalSummary();

// Notify Framework

document.dispatchEvent(

    new CustomEvent(

        "PWF:ContactReady",

        {

            detail : this.info()

        }

    )

);


/******************************************************************************
END OF FILE

contact.js

Premanandhan Web Framework

Version 1.0

Contact Module Completed

******************************************************************************/
