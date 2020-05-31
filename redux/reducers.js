import { INIT, NEW_SESSION, JOIN_SESSION, SESSION_CREATED, AWAIT_SESSIONS_FETCHED } from './actionTypes';
import { PLAYER_X, PLAYER_Y, HOME_SCREEN, PLAYER_SCREEN, JOIN_SCREEN } from '../constants';
import Constants from 'expo-constants';

const { pubnubKeys, aws_api } = Constants.manifest.extra;

const INITIAL_STATE = {
  screen: HOME_SCREEN,
  player: null,
  playerTurn: null,
  playerX: {
    name: 'Player X'
  },
  playerY: {
    name: 'Player Y'
  },
  sessionId: null,
  availableSessionsToJoin: [],
  pubnubKeys, aws_api
};

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT:
      return INITIAL_STATE;

    case NEW_SESSION:
      return {
        ...state,
        screen: PLAYER_SCREEN,
        player: PLAYER_X
      };

    case JOIN_SESSION:
      return {
        ...state,
        screen: JOIN_SCREEN,
        player: PLAYER_Y
      };
    case SESSION_CREATED:
      return {
        ...state,
        sessionId: action.payload.Id
      };
    case AWAIT_SESSIONS_FETCHED:
      return {
        ...state,
        availableSessionsToJoin: action.payload
      };
    default:
      return state;
  }
};

export default rootReducer;
