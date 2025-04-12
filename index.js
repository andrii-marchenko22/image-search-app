import{a as y,S as p,i as n}from"./assets/vendor-Db2TdIkw.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))i(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&i(s)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const g="49660989-ba495770243477578b97293ac",h=async(o,t)=>{const a=new URLSearchParams({key:g,q:o,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t});return await y(`https://pixabay.com/api/?${a}`)},l=document.querySelector(".gallery"),m=document.querySelector(".loader");document.querySelector(".load-more-btn");let b=new p(".gallery a",{captions:!0,captionsData:"alt",captionDelay:250});const L=o=>{const t=o.map(({id:a,largeImageURL:i,webformatURL:e,tags:r,likes:s,views:u,comments:d,downloads:f})=>`
           <a class="gallery-link" href="${i}">
               <div class="gallery-item" id="${a}">
                   <img class="gallery-item-img" src="${e}" alt="${r}" loading="lazy" />
                   <div class="info">
                       <p class="info-item"><b>Likes </b>${s}</p>
                       <p class="info-item"><b>Views </b>${u}</p>
                       <p class="info-item"><b>Comments </b>${d}</p>
                       <p class="info-item"><b>Downloads </b>${f}</p>
                   </div>
               </div>
           </a>
       `).join("");l.insertAdjacentHTML("beforeend",t),b.refresh()},w=()=>{l.innerHTML=""},S=()=>{m.classList.add("show")},c=()=>{m.classList.remove("show")},q=document.querySelector(".form");document.querySelector(".btn-form");q.addEventListener("submit",o=>{o.preventDefault();const t=o.target.elements["search-text"].value.trim();if(!t){n.error({title:"Error",message:"Please enter a search query!"});return}S(),o.target.reset(),h(t).then(a=>{if(c(),w(),a.data.hits.length===0){n.error({title:"Error",message:"Sorry, there are no images matching your search query. Please try again!"});return}L(a.data.hits)}).catch(a=>{c(),n.error({title:"Error",message:"There was an error fetching the images. Please try again later."})})});
//# sourceMappingURL=index.js.map
