import{a as L,S as x,i as a}from"./assets/vendor-b11e2a50.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function e(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerPolicy&&(r.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?r.credentials="include":t.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=e(t);fetch(t.href,r)}})();async function q(n,o=1,e=15){const s=new URLSearchParams({page:o,perPage:e,key:"44464847-e125504310873b884f25bab7c",q:n.trim(),image_type:"photo",orientation:"horizontal",safesearch:"true"});try{return(await L.get(`https://pixabay.com/api/?${s}`)).data}catch(t){throw console.error("Failed to fetch images:",t),t}}const v=document.querySelector(".gallery"),T=new x(".gallery a");function S(n){const o=n.map(e=>`
        <a class= "gallery-link" href="${e.largeImageURL}">
            <img src="${e.webformatURL}" class="gallery-image" alt="${e.tags}" />
            <div class="info">
                <p>Likes: ${e.likes}</p>
                <p>Views: ${e.views}</p>
                <p>Comments: ${e.comments}</p>
                <p>Downloads: ${e.downloads}</p>
            </div>
        </a>
    `).join("");v.insertAdjacentHTML("beforeend",o),T.refresh()}const m=document.querySelector(".search-input"),h=document.querySelector(".loader"),g=document.querySelector("#loadMoreButton"),p=document.querySelector("#totalHits"),c=document.querySelector("#loadingText");let l=1,y=15,d="",u=0,b=!0;document.querySelector(".form").addEventListener("submit",async function(n){n.preventDefault();const o=m.value.trim();if(c.style.display="block",d=o,l=1,v.innerHTML="",!o){a.error({title:"Error",message:"The search query cannot be empty. Please enter a valid query!"}),h.style.display="none",c.style.display="none";return}try{const e=await q(d,l,y),s=e.hits;if(u=e.totalHits,b&&(setTimeout(()=>{h.style.display="none",c.style.display="none",m.value=""},1e3),b=!1),!Array.isArray(s)||s.length===0){a.error({title:"Error",message:"No images found. Please try a different query!"}),g.style.display="none",c.style.display="none",p.textContent="";return}S(s),l+=1,g.style.display="block",p.textContent=`Total images found: ${u}`}catch(e){console.error("Failed to fetch images:",e),a.error({title:"Error",message:"Failed to load images. Please try again!"}),p.textContent=""}finally{c.style.display="none"}});document.querySelector("#loadMoreButton").addEventListener("click",async function(n){const o=document.querySelector(".loader"),e=document.querySelector("#loadMoreButton"),s=document.querySelector("#loadingText"),t=document.querySelector("#totalHits");o.style.display="block",e.style.display="none",s.style.display="block";try{const i=(await q(d,l,y)).hits;if(d===0){a.error({title:"Error",message:"We're sorry, but you've reached the end of search results."}),e.style.display="none",o.style.display="none";return}S(i),l+=1;const f=document.querySelector(".gallery-link");if(f){const w=f.getBoundingClientRect().height;window.scrollBy({top:w*2,behavior:"smooth"})}l*y>=u?(e.style.display="none",o.style.display="none",t.textContent="",a.info({title:"Info",message:"You have reached the end of the search results."})):e.style.display="block"}catch{setTimeout(()=>{o.style.display="none"},1e3),a.error({title:"Error",message:"We're sorry, but you've reached the end of search results."})}finally{setTimeout(()=>{o.style.display="none",l*y<u&&(e.style.display="block"),s.style.display="none"},1e3)}});
//# sourceMappingURL=commonHelpers.js.map
