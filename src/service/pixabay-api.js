import axios from 'axios';

const PIXABAY_API_URL =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal&per_page=12&key=12576439-4d1f98aea9d85243038051cc1&q=';

export const fetchPictures = (query, pageNumber) => {
  return query === ''
    ? axios.get(`${PIXABAY_API_URL}`)
    : axios.get(`${PIXABAY_API_URL + query}&page=${pageNumber}`);
};

export const fn = () => null;
