import{a as b,S as q,i}from"./assets/vendor-b11e2a50.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&s(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function s(e){if(e.ep)return;e.ep=!0;const t=r(e);fetch(e.href,t)}})();async function p(l,o=1,r=15){const s=new URLSearchParams({page:o,limit:r,key:"44464847-e125504310873b884f25bab7c",q:l.trim(),image_type:"photo",orientation:"horizontal",safesearch:"true"}),e=`https://pixabay.com/api/?${s}`;console.log("Request URL:",e);try{const t=await b.get(`https://pixabay.com/api/?${s}`);return console.log("API Response:",t.data),t.data}catch(t){throw console.error("Failed to fetch images:",t),t}}const f=document.querySelector(".gallery"),v=new q(".gallery a");function g(l){const o=l.map(r=>`
        <a class= "gallery-link" href="${r.largeImageURL}">
            <img src="${r.webformatURL}" class="gallery-image" alt="${r.tags}" />
            <div class="info">
                <p>Likes: ${r.likes}</p>
                <p>Views: ${r.views}</p>
                <p>Comments: ${r.comments}</p>
                <p>Downloads: ${r.downloads}</p>
            </div>
        </a>
    `).join("");f.insertAdjacentHTML("beforeend",o),v.refresh()}let c=1,h=15,u="",y=0,m=!0;document.querySelector(".form").addEventListener("submit",async function(l){l.preventDefault();const o=document.querySelector(".search-input"),r=o.value.trim(),s=document.querySelector(".loader"),e=document.querySelector("#loadMoreButton"),t=document.querySelector("#totalHits"),n=document.querySelector("#loadingText");n.style.display="block";try{if(!r){i.error({title:"Error",message:"The search query cannot be empty. Please enter a valid query!"}),s.style.display="none";return}u=r,c=1,f.innerHTML="";const a=await p(u,c,h),d=a.hits;if(y=a.totalHits,m&&(setTimeout(()=>{s.style.display="none",o.value=""},1e3),m=!1),!Array.isArray(d)||d.length===0){i.error({title:"Error",message:"No images found. Please try a different query!"});return}g(d),c+=1,e.style.display="block",t.textContent=`Total images found: ${y}`}catch(a){console.error("Failed to fetch images:",a),setTimeout(()=>{s.style.display="none",o.value=""},1e3),i.error({title:"Error",message:"Failed to load images. Please try again!"})}finally{n.style.display="none"}});document.querySelector("#loadMoreButton").addEventListener("click",async function(l){l.preventDefault();const o=document.querySelector(".loader"),r=document.querySelector("#loadMoreButton"),s=document.querySelector("#loadingText");o.style.display="block",r.style.display="none",s.style.display="block";try{const t=(await p(u,c,h)).hits;if(u===0){i.error({title:"Error",message:"We're sorry, but you've reached the end of search results."}),r.style.display="none";return}g(t),c+=1;const n=document.querySelector(".gallery-item");if(n){const a=n.getBoundingClientRect().height;window.scrollBy({top:a*2,behavior:"smooth"})}}catch{setTimeout(()=>{o.style.display="none"},1e3),i.error({title:"Error",message:"We're sorry, but you've reached the end of search results."})}finally{setTimeout(()=>{o.style.display="none",r.style.display="block",s.style.display="none"},1e3)}});
//# sourceMappingURL=commonHelpers.js.map
