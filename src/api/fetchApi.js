import axios from "axios";

const baseURL = `https://pixabay.com/api/`
const API_KEY = '32070440-da23fcdb10bb13069c595106c';

export const fetchApi = async (search, page=1) => {
    const { data } = await axios.get(`${baseURL}?q=${search}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`);
    return data;
}