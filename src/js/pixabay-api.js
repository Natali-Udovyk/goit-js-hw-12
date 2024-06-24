import axios from "axios";

export async function fetchImages(query, page = 1, perPage = 15) {
    const params = new URLSearchParams({
        page: page,
        limit: perPage, // Corrected parameter name and value
        key: '44464847-e125504310873b884f25bab7c', // Corrected parameter name
        q: query.trim(), // Corrected parameter name
        image_type: 'photo', // Corrected parameter name
        orientation: 'horizontal', // Corrected parameter name
        safesearch: 'true' // Corrected parameter name
    });
    const url = `https://pixabay.com/api/?${params}`;
    console.log("Request URL:", url);
    try {
        const response = await axios.get(`https://pixabay.com/api/?${params}`);
        console.log("API Response:", response.data); // Log the response
        return response.data;
    } catch (error) {
        console.error("Failed to fetch images:", error);
        throw error;
    }
   
}