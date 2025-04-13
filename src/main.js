import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton, smoothScroll } from "./js/render-functions.js";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");
const btn = document.querySelector(".btn-form");
const loadMore = document.querySelector(".load-more-btn");

let page = 1;
let userValue = "";
let loadImages = 0;


form.addEventListener("submit", async event => {
    event.preventDefault();
    
    userValue = event.target.elements['search-text'].value.trim();

    if (!userValue) {
        errorToast();
        input.focus();
        return;
    }

        page = 1;
        loadImages = 0;
        clearGallery();
        hideLoadMoreButton();
        showLoader();
    
    try {
        const { data } = await getImagesByQuery(userValue, page);
        const imagesObj = data.hits;
        
        if (!imagesObj.length) {
        errorToast();
        input.focus();
        return;
    }
        
        createGallery(imagesObj);
        loadImages += imagesObj.length;

        if (loadImages < data.totalHits) {
        showLoadMoreButton();
        }
        
    }   catch (error) {
        errorToast();
        
    }   finally {
        hideLoader(); 
        event.target.reset();
    }
});


loadMore.addEventListener("click", async event => {
    page++;
    loadMore.disabled = true;
    showLoader()

    try {
        const { data } = await getImagesByQuery(userValue, page);
        const imagesObj = data.hits;

        createGallery(imagesObj);
        smoothScroll();
        loadImages += imagesObj.length;

        loadImages < data.totalHits ? showLoadMoreButton() : hideLoadMoreButton();
        
    }   catch (error) {
        errorToast();

    }   finally {
            hideLoader();
            loadMore.disabled = false;
    }
})

const errorToast = () => {
    iziToast.error({
    position: "topLeft",
    title: 'Error',
    message: 'There was an error fetching the images. Please try again later.',
    });
}