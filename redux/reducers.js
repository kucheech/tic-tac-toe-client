import { INIT, NEW_SESSION, JOIN_SESSION, SESSION_CREATED, AWAIT_SESSIONS_FETCHED, ADD_MOVE, END_SESSION, SET_PLAYER } from './actionTypes';
import { PLAYER_X, PLAYER_Y, HOME_SCREEN, PLAYER_SCREEN, JOIN_SCREEN } from '../constants';
import Constants from 'expo-constants';
import PubNub from 'pubnub';

const { pubnubKeys, aws_api } = Constants.manifest.extra;
const pubnub = new PubNub(Object.assign({}, pubnubKeys, {
  subscribeRequestTimeout: 60000,
  presenceTimeout: 122,
}));

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
  pubnub,
  aws_api,
  moves: [{ squares: Array(9).fill(null) }],
  gameOver: false
};

const rootReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT:
      return {
        ...INITIAL_STATE,
        player: state.player
      };

    case NEW_SESSION:
      return {
        ...state,
        screen: PLAYER_SCREEN,
        player: Object.assign({}, state.player, { name: PLAYER_X })
      };

    case JOIN_SESSION:
      return {
        ...state,
        screen: JOIN_SCREEN,
        player: Object.assign({}, state.player, { name: PLAYER_Y })
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

    case ADD_MOVE:
      return {
        ...state,
        moves: state.moves.concat([{ squares: action.payload.squares }]),
        playerTurn: action.payload.playerTurn
      };

    case SET_PLAYER:
      return {
        ...state,
        player: action.payload
      };

    case END_SESSION:
      return {
        ...state,
        gameOver: true,
        result: action.payload
      };

    default:
      return state;
  }
};

export default rootReducer;
