import { chatbot, restAPI } from '../http';
import {
  WELCOME,
  START_SEND_MESSAGE,
  SEND_MESSAGE_SUCCESSFUL,
  SEND_MESSAGE_FAILED,
  WRITE_MESSAGE,
  START_API_REQUEST,
  API_REQUEST_SUCCESSFUL,
  API_REQUEST_FAILED,
  STATUS_CHANGE,
} from './actionTypes';

interface StatusChange {
  type: typeof STATUS_CHANGE;
  newStatus: string;
}

interface Welcome {
  type: typeof WELCOME;
}

interface WriteMessage {
  type: typeof WRITE_MESSAGE;
  message: string;
}

interface StartSendMessage {
  type: typeof START_SEND_MESSAGE;
}

interface SendMessageSuccessful {
  type: typeof SEND_MESSAGE_SUCCESSFUL;
  response: any;
}

interface SendMessageFailed {
  type: typeof SEND_MESSAGE_FAILED;
  error: string;
}

interface StartAPIRequest {
  type: typeof START_API_REQUEST;
}

interface APIRequestSuccessful {
  type: typeof API_REQUEST_SUCCESSFUL;
  originalData: any;
  response: any;
}

interface APIRequestFailed {
  type: typeof API_REQUEST_FAILED;
  error: string;
}

export type AppActions =
  | StatusChange
  | Welcome
  | WriteMessage
  | StartSendMessage
  | SendMessageSuccessful
  | SendMessageFailed
  | StartAPIRequest
  | APIRequestSuccessful
  | APIRequestFailed;

export function statusChange(newStatus: string): StatusChange {
  return {
    type: STATUS_CHANGE,
    newStatus,
  };
}

function welcome(): Welcome {
  return {
    type: WELCOME,
  };
}

export function writeMessage(message: string): WriteMessage {
  return {
    type: WRITE_MESSAGE,
    message,
  };
}

function startSendMessage(): StartSendMessage {
  return {
    type: START_SEND_MESSAGE,
  };
}

function sendMessageSuccessful(response: object[]): SendMessageSuccessful {
  return {
    type: SEND_MESSAGE_SUCCESSFUL,
    response,
  };
}

function sendMessageFailed(error: string): SendMessageFailed {
  return {
    type: SEND_MESSAGE_FAILED,
    error,
  };
}

export function startApp() {
  return async (dispatch: any) => {
    dispatch(welcome());
    try {
      const response = await chatbot.post('welcome.do', { user_id: '0' });
      const responseData = response.data.responseSet.result;
      console.log(responseData);
      return dispatch(sendMessageSuccessful(responseData));
    } catch (error) {
      return dispatch(sendMessageFailed(error));
    }
  };
}

export function sendMessage(chatInfo: object) {
  return async (dispatch: any) => {
    dispatch(startSendMessage());
    try {
      const response = await chatbot.post('message.do', chatInfo);
      const responseData = response.data.responseSet.result;
      return dispatch(sendMessageSuccessful(responseData));
    } catch (error) {
      return dispatch(sendMessageFailed(error));
    }
  };
}

function startAPIRequest(): StartAPIRequest {
  return { type: START_API_REQUEST };
}

export function apiRequestSuccessful(
  originalData: object,
  response: object
): APIRequestSuccessful {
  return {
    type: API_REQUEST_SUCCESSFUL,
    originalData,
    response,
  };
}

function apiRequsetFailed(error: string): APIRequestFailed {
  return {
    type: API_REQUEST_FAILED,
    error,
  };
}

export function apiRequest(originalData: object, requestBody: object) {
  return async (dispatch: any) => {
    dispatch(startAPIRequest());
    try {
      const response = await restAPI.post('/', requestBody);
      return dispatch(apiRequestSuccessful(originalData, response.data.result));
    } catch (error) {
      return dispatch(apiRequsetFailed(error));
    }
  };
}
