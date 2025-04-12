import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css"

const gallery = document.querySelector(".gallery");
const loader = document.querySelector(".loader");
const loadMore = document.querySelector(".load-more-btn");


let lightbox = new SimpleLightbox('.gallery a', {
    captions: true,
    captionsData: 'alt',
    captionDelay: 250,
});

export const createGallery = (images) => {
    const markup = images.map(
        ({
           id, 
           largeImageURL,
           webformatURL,
           tags,
           likes,
           views,
           comments,
           downloads,
        }) =>
        `
           <a class="gallery-link" href="${largeImageURL}">
               <div class="gallery-item" id="${id}">
                   <img class="gallery-item-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
                   <div class="info">
                       <p class="info-item"><b>Likes </b>${likes}</p>
                       <p class="info-item"><b>Views </b>${views}</p>
                       <p class="info-item"><b>Comments </b>${comments}</p>
                       <p class="info-item"><b>Downloads </b>${downloads}</p>
                   </div>
               </div>
           </a>
       `).join('');
    
    gallery.insertAdjacentHTML('beforeend', markup);

    lightbox.refresh();
};

export const clearGallery = () => {
    gallery.innerHTML = '';
};
export const showLoader = () => {
   loader.classList.add("show");
};

export const hideLoader = () => {
   loader.classList.remove("show"); 
};

export const showLoadMoreButton = () => {
    loadMore.classList.add("load-more-show");
}

export const hideLoadMoreButton = () => {
    loadMore.classList.remove("load-more-show");
}