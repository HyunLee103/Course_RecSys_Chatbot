import { AppActions } from '../actions/actions';
import {
  SEND_MESSAGE_FAILED,
  SEND_MESSAGE_SUCCESSFUL,
  WRITE_MESSAGE,
} from '../actions/actionTypes';

interface Error {
  error: boolean;
  detail?: string;
}

interface Message {
  // timestamp: number;
  me: boolean;
  message: string;
  carouselList: [];
}

export interface AppState {
  error: Error;
  user_id: string;
  ins_id: string;
  intent_id: string;
  param_id: string;
  messages: Message[];
}

const initialState: AppState = {
  error: { error: false },
  user_id: '0',
  ins_id: '',
  intent_id: '',
  param_id: '',
  messages: [],
};

export default function appReducer(
  state: AppState = initialState,
  action: AppActions
) {
  switch (action.type) {
    case WRITE_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          { me: true, message: action.message, carouselList: [] },
        ],
      };
    case SEND_MESSAGE_SUCCESSFUL:
      const { user_id, ins_id, intent_id, param_id, result } = action.response;
      const newMessages = result.map((message: any) => ({
        ...message,
        me: false,
      }));
      return {
        ...state,
        user_id,
        ins_id,
        intent_id,
        param_id,
        messages: [...state.messages, ...newMessages],
      };
    case SEND_MESSAGE_FAILED:
      return { ...state, error: { error: true, detail: action.error } };
    default:
      return state;
  }
}
