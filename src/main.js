
import { fetchImages } from './js/pixabay-api.js';
import { renderGalleryItems, gallery } from './js/render-functions.js';
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

const searchInput = document.querySelector('.search-input');
    const loader = document.querySelector('.loader');
    const loadMoreButton = document.querySelector('#loadMoreButton');
    const totalHitsDiv = document.querySelector('#totalHits');
    const loadingText = document.querySelector('#loadingText'); 

let page = 1;
let perPage = 15;
let currentQuery = '';
let totalHits = 0;
let isFirstLoad = true; 
document.querySelector('.form').addEventListener('submit',async function(event) {
    event.preventDefault();
    const searchQuery = searchInput.value.trim();
    loadingText.style.display = 'block';
    currentQuery = searchQuery;  
        page = 1;
        gallery.innerHTML = '';
    if (!searchQuery) {
        iziToast.error({
            title: 'Error',
            message: "The search query cannot be empty. Please enter a valid query!",
        });
        loader.style.display = 'none';
        loadingText.style.display = 'none';
        return; 
    }
    try{
        const response = await fetchImages(currentQuery, page, perPage);
        const images = response.hits;
        totalHits = response.totalHits;

        if (isFirstLoad) {
            setTimeout(() => {
                loader.style.display = 'none';
                loadingText.style.display = 'none';
                searchInput.value = '';
            }, 1000);
            isFirstLoad = false;
        }
        if (!Array.isArray(images) || images.length === 0) {
            iziToast.error({
                title: 'Error',
                message: "No images found. Please try a different query!",
            });
            loadMoreButton.style.display = 'none';
            loadingText.style.display = 'none';
            totalHitsDiv.textContent ='';
            return; 
        }
        renderGalleryItems(images);
        page += 1;
        loadMoreButton.style.display = 'block';
        totalHitsDiv.textContent = `Total images found: ${totalHits}`;


    } catch(error) {
        console.error("Failed to fetch images:", error);
        iziToast.error({
            title: 'Error',
            message: "Failed to load images. Please try again!",
        });
        totalHitsDiv.textContent = '';
    } 
    
     finally {
        loadingText.style.display = 'none'; }

});

document.querySelector('#loadMoreButton').addEventListener('click', async function(event) {
    // event.preventDefault()
    const loader = document.querySelector('.loader');
    const loadMoreButton = document.querySelector('#loadMoreButton');
    const loadingText = document.querySelector('#loadingText');
    const totalHitsDiv = document.querySelector('#totalHits');
    loader.style.display = 'block';
    loadMoreButton.style.display = 'none';
    loadingText.style.display = 'block';
    try {
        const response = await fetchImages(currentQuery, page, perPage);
        const images = response.hits;
        

        if (currentQuery === 0) {
            iziToast.error({
                title: 'Error',
                message: "We're sorry, but you've reached the end of search results.",
            });
            loadMoreButton.style.display = 'none';
            loader.style.display = 'none';
            return;
        }
        renderGalleryItems(images);
        page += 1;  

        const firstGalleryItem = document.querySelector('.gallery-link');
        if (firstGalleryItem) {
            const itemHeight = firstGalleryItem.getBoundingClientRect().height;
            window.scrollBy({
                top: itemHeight * 2,
                behavior: "smooth",
            });
        }
        if (page * perPage >= totalHits) {
            loadMoreButton.style.display = 'none';
            loader.style.display = 'none';
            totalHitsDiv.textContent = '';
            iziToast.info({
                title: 'Info',
                message: "You have reached the end of the search results.",
            });
        } else {
            loadMoreButton.style.display = 'block'; 
        }
    } catch (error) {
        setTimeout(() => {
            loader.style.display = 'none';
        }, 1000);
        iziToast.error({
            title: 'Error',
            message: "We're sorry, but you've reached the end of search results.",
        });
    } finally {
        setTimeout(() => {
            loader.style.display = 'none';
            if (page * perPage < totalHits) {
                loadMoreButton.style.display = 'block';
            }
            loadingText.style.display = 'none';
            
        }, 1000);
    }
});