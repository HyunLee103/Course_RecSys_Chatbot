import { chatbot } from '../http';
import {
  WELCOME,
  START_SEND_MESSAGE,
  SEND_MESSAGE_SUCCESSFUL,
  SEND_MESSAGE_FAILED,
  WRITE_MESSAGE,
} from './actionTypes';

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

export type AppActions =
  | Welcome
  | WriteMessage
  | StartSendMessage
  | SendMessageSuccessful
  | SendMessageFailed;

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
