import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '39476118-a69449891a99ee741726132f7';

const fetchPhotos = async (searchQuery, page = 1, perPage = 12) => {
  try {
    const params = {
      key: API_KEY,
      q: searchQuery,
      page,
      per_page: perPage,
    };

    const response = await axios.get(BASE_URL, { params });
    console.log('response in api', response);
    console.log('searchQuery', searchQuery);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export default fetchPhotos;
