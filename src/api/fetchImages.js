import axios from "axios";

 const API_KEY = '32070440-da23fcdb10bb13069c595106c';

export const fetchImages = async (search) => {
    const { data } = await axios.get(`https://pixabay.com/api/?q=${search}&page=1&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
    return data;
}