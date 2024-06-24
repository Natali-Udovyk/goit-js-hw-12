
import { fetchImages } from './js/pixabay-api.js';
import { renderGalleryItems, gallery } from './js/render-functions.js';
// Описаний у документації
import iziToast from "izitoast";
// Додатковий імпорт стилів
import "izitoast/dist/css/iziToast.min.css";

let page = 1;
let perPage = 15;
let currentQuery = '';
let totalHits = 0;
let isFirstLoad = true; 
document.querySelector('.form').addEventListener('submit',async function(event) {
    event.preventDefault();
    const searchInput = document.querySelector('.search-input');
    const searchQuery = searchInput.value.trim();
    const loader = document.querySelector('.loader');
    const loadMoreButton = document.querySelector('#loadMoreButton');
    const totalHitsDiv = document.querySelector('#totalHits');
    const loadingText = document.querySelector('#loadingText'); 

    // if (isFirstLoad) {
    //     loader.style.display = 'block';
    // }
    loadingText.style.display = 'block';
    
    try{
        if (!searchQuery) {
            iziToast.error({
                title: 'Error',
                message: "The search query cannot be empty. Please enter a valid query!",
            });
            loader.style.display = 'none'; 
            return; 
        }

        currentQuery = searchQuery;  // Зберігаємо поточний запит
        page = 1;  // Скидаємо сторінку на 1 при новому пошуку
        gallery.innerHTML = '';

        const response = await fetchImages(currentQuery, page, perPage);
        const images = response.hits;
        totalHits = response.totalHits;

        // setTimeout(() => {
        //     loader.style.display = 'none';
        //     searchInput.value = ''; 
        // }, 1000); 
        if (isFirstLoad) {
            setTimeout(() => {
                loader.style.display = 'none';
                searchInput.value = '';
            }, 1000);
            isFirstLoad = false; // Після першого завантаження виставляємо змінну в false
        }
        if (!Array.isArray(images) || images.length === 0) {
            iziToast.error({
                title: 'Error',
                message: "No images found. Please try a different query!",
            });
            return; 
        }
        renderGalleryItems(images);
        page += 1;
        loadMoreButton.style.display = 'block';
        totalHitsDiv.textContent = `Total images found: ${totalHits}`;

    } catch(error) {
        console.error("Failed to fetch images:", error);
        setTimeout(() => {
            loader.style.display = 'none';
            searchInput.value = ''; 
        }, 1000);
        iziToast.error({
            title: 'Error',
            message: "Failed to load images. Please try again!",
        });
    } finally {
        loadingText.style.display = 'none'; }

});

document.querySelector('#loadMoreButton').addEventListener('click', async function(event) {
    event.preventDefault()
    const loader = document.querySelector('.loader');
    const loadMoreButton = document.querySelector('#loadMoreButton');
    const loadingText = document.querySelector('#loadingText');

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
            return;
        }
        renderGalleryItems(images);
        page += 1;  
        const firstGalleryItem = document.querySelector('.gallery-item');
        if (firstGalleryItem) {
            const itemHeight = firstGalleryItem.getBoundingClientRect().height;
            window.scrollBy({
                top: itemHeight * 2,
                behavior: "smooth",
            });
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
            loadMoreButton.style.display = 'block';
            loadingText.style.display = 'none';
        }, 1000);
    }
});