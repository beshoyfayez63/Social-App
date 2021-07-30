import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://europe-west1-social-app-44406.cloudfunctions.net',
});

export default instance;
