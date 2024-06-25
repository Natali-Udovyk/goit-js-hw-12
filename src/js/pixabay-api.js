import axios from "axios";

export async function fetchImages(query, page = 1, perPage = 15) {
    const params = new URLSearchParams({
        page: page,
        perPage: perPage,
        key: '44464847-e125504310873b884f25bab7c',
        q: query.trim(),
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: 'true' 
    });
    try {
        const response = await axios.get(`https://pixabay.com/api/?${params}`);
        return response.data;
    } catch (error) {
        console.error("Failed to fetch images:", error);
        throw error;
    }
   
}