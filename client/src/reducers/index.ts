import { AppActions } from '../actions/actions';
import {
  API_REQUEST_FAILED,
  API_REQUEST_SUCCESSFUL,
  SEND_MESSAGE_FAILED,
  SEND_MESSAGE_SUCCESSFUL,
  STATUS_CHANGE,
  WRITE_MESSAGE,
} from '../actions/actionTypes';

interface Error {
  error: boolean;
  detail?: string;
}

interface UserPreference {
  quality: number;
  credit: number;
  no_team: number;
  e_learn: number;
  no_morning: number;
  section: number[];
}

interface Message {
  me: boolean;
  message: string;
  carouselList: any[];
}

export interface AppState {
  error: Error;
  status: string;
  user_id: string;
  ins_id: string;
  intent_id: string;
  param_id: string;
  messages: Message[];
  userPreference: UserPreference;
  finalData: any[];
}

const initialState: AppState = {
  error: { error: false },
  status: 'HELLO',
  user_id: '0',
  ins_id: '',
  intent_id: '',
  param_id: '',
  messages: [],
  userPreference: {
    quality: 0,
    credit: 0,
    e_learn: 0,
    no_team: 0,
    no_morning: 0,
    section: [0],
  },
  finalData: [],
};

export default function appReducer(
  state: AppState = initialState,
  action: AppActions
) {
  switch (action.type) {
    case STATUS_CHANGE:
      return { ...state, status: action.newStatus };

    case WRITE_MESSAGE:
      return {
        ...state,
        messages: [
          ...state.messages,
          { me: true, message: action.message, carouselList: [] },
        ],
      };
    case SEND_MESSAGE_SUCCESSFUL:
      const {
        user_id,
        ins_id,
        intent_id,
        param_id,
        result,
        parameters,
      } = action.response;

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
        userPreference: {
          quality: parseInt(parameters['강의'], 10),
          credit: parseInt(parameters['학점'], 10),
          e_learn: parseInt(parameters['이러닝'], 10),
          no_team: parseInt(parameters['팀플'], 10),
          no_morning: parseInt(parameters['오전수업'], 10),
          section: [parseInt(parameters['선호분야'], 10)],
        },
      };
    case API_REQUEST_SUCCESSFUL:
      return state;
    case SEND_MESSAGE_FAILED:
    case API_REQUEST_FAILED:
      return { ...state, error: { error: true, detail: action.error } };
    default:
      return state;
  }
}
