import axios, { AxiosResponse } from 'axios';

interface ChatbotData {
  ins_id: string;
  intent_id: string;
  param_id: string;
  user_id: string;
  parameters: {
    강의: string;
    선호분야: string;
    오전수업: string;
    이러닝: string;
    팀플: string;
    학점: string;
  };
  result: {
    message: string;
    carouselList: any[];
  };
}

interface ChatbotResponseFormat {
  code: string;
  result: ChatbotData;
}

export type ChatbotResponse = AxiosResponse<ChatbotResponseFormat>;

export const restAPI = axios.create({
  baseURL: 'https://chatbot-tsy3pfrytq-du.a.run.app/',
});

export const chatbot = axios.create({
  baseURL:
    'https://danbee.ai/chatflow/chatbot/v2.0/cae73c2e-bdb4-49e6-bf22-4137eade4c19/',
});
