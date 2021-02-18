import axios from 'axios';

export const restAPI = axios.create({ baseURL: '' });

export const chatbot = axios.create({
  baseURL:
    'https://danbee.ai/chatflow/chatbot/v2.0/cae73c2e-bdb4-49e6-bf22-4137eade4c19/',
});
