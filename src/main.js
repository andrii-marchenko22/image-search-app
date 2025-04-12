import { getImagesByQuery } from "./js/pixabay-api.js";
import { createGallery, clearGallery, showLoader, hideLoader, showLoadMoreButton, hideLoadMoreButton, smoothScroll } from "./js/render-functions.js";

import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";


const form = document.querySelector(".form");
const btn = document.querySelector(".btn-form");
const loadMore = document.querySelector(".load-more-btn");

let page = 1;
let userInp = "";


form.addEventListener("submit", async event => {
    event.preventDefault();
    

    const userValue = event.target.elements['search-text'].value.trim();
    page = 1;

    if (!userValue) {
        iziToast.error({
            position: "topLeft",
            title: 'Error',
            message: 'Please enter a search query!',
        });
        return;
    }

    userInp = userValue;
    showLoader();
    
    try {

        const { data } = await getImagesByQuery(userInp, page);
        const imagesObj = data.hits;
        
        hideLoader(); 
        clearGallery();


        if (imagesObj.length === 0) {
            iziToast.error({
            position: "topLeft",
            title: 'Error',
            message: 'Sorry, there are no images matching your search query. Please try again!',
            });
        return;
    }
        

        if (data.totalHits > imagesObj.length) {
        showLoadMoreButton()
    }

        createGallery(imagesObj);
        
    }   catch (error) {
            hideLoader(); 
            iziToast.error({
            position: "topLeft",
            title: 'Error',
            message: 'There was an error fetching the images. Please try again later.',
            });
    }   finally {
        event.target.reset();
    }
});


loadMore.addEventListener("click", async event => {
    page++;
    loadMore.disabled = true;

    showLoader()

    try {
        const { data } = await getImagesByQuery(userInp, page);
        const imagesObj = data.hits;

        createGallery(imagesObj);
        smoothScroll();

        data.totalHits > page * 15 ? showLoadMoreButton() : hideLoadMoreButton();
        
    }   catch (error) {
            iziToast.error({
            position: "topLeft",
            title: 'Error',
            message: 'There was an error fetching the images. Please try again later.',
            });
        
    }   finally {
            hideLoader();
            loadMore.disabled = false;
    }
})