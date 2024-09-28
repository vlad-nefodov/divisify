import ApiMockAdapter from './mock/ApiMockAdapter';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://jsonplaceholder.typicode.com'
});

const mockAdapter = new ApiMockAdapter(api, {
  delayResponse: 1500
});
mockAdapter.mock();

export default api;
