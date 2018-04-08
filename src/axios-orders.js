import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://burger-builder-580a8.firebaseio.com/'
});

export default instance;
