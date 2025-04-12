import axios from "axios";

const KEY = "49660989-ba495770243477578b97293ac";

export const getImagesByQuery = async (query, page) => {
    const searchParams = new URLSearchParams({
        key: KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page,   
        per_page: 15,
    })
    
    return await axios(`https://pixabay.com/api/?${searchParams}`);
}