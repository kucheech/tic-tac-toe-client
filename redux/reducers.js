import Constants from 'expo-constants';
import PubNub from 'pubnub';
import { INIT, NEW_SESSION, JOIN_SESSION, GOTO_SESSION, SESSION_CREATED, AWAIT_SESSIONS_FETCHED, ADD_MOVE, END_SESSION, SET_PLAYER, SET_PLAYER_TURN, SESSION_UPDATED, START_GAME, SET_LOADING } from './actionTypes';
import { PLAYER_X, PLAYER_O, HOME_SCREEN, PLAYER_SCREEN, JOIN_SCREEN } from '../constants';

const { pubnubKeys, aws_api } = Constants.manifest.extra || {};

const changeTurn = current => (current === PLAYER_X ? PLAYER_O : PLAYER_X);

const INITIAL_STATE = {
  screen: HOME_SCREEN,
  player: null,
  playerTurn: null,
  sessionId: null,
  availableSessionsToJoin: [],
  pubnub: null,
  aws_api,
  moves: [{ squares: Array(9).fill(null) }],
  gameStarted: false,
  gameOver: false,
  isLoading: false
};

const rootReducer = (state = INITIAL_STATE, action) => {
  let pubnub;

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
        player: Object.assign({}, state.player, { name: PLAYER_X, type: PLAYER_X })
      };

    case JOIN_SESSION:
      return {
        ...state,
        screen: JOIN_SCREEN,
        player: Object.assign({}, state.player, { name: PLAYER_O, type: PLAYER_O })
      };

    case GOTO_SESSION:
      pubnub = new PubNub(Object.assign({}, pubnubKeys, {
        subscribeRequestTimeout: 60000,
        presenceTimeout: 122,
        uuid: state.player.Id
      }));
      return {
        ...state,
        screen: PLAYER_SCREEN,
        player: Object.assign({}, state.player, { name: PLAYER_O, type: PLAYER_O }),
        playerTurn: PLAYER_X,
        sessionId: action.payload,
        pubnub,
        gameStarted: true
      };

    case SESSION_CREATED:
      pubnub = new PubNub(Object.assign({}, pubnubKeys, {
        subscribeRequestTimeout: 60000,
        presenceTimeout: 122,
        uuid: state.player.Id
      }));

      return {
        ...state,
        sessionId: action.payload.Id,
        pubnub,
        playerTurn: PLAYER_X
      };

    case AWAIT_SESSIONS_FETCHED:
      return {
        ...state,
        availableSessionsToJoin: action.payload,
        isLoading: false
      };

    case ADD_MOVE:
      return {
        ...state,
        moves: state.moves.concat([{ squares: action.payload.squares }]),
        playerTurn: changeTurn(action.payload.playerTurn)
      };

    case SET_PLAYER_TURN:
      return {
        ...state,
        playerTurn: action.payload
      };

    case SET_PLAYER:
      return {
        ...state,
        player: action.payload,
        isLoading: false
      };

    case SESSION_UPDATED:
      return {
        ...state,
        status: action.payload
      };

    case START_GAME:
      return {
        ...state,
        gameStarted: true,
        isLoading: false
      };

    case END_SESSION:
      return {
        ...state,
        gameOver: true,
        result: action.payload
      };

    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload
      };

    default:
      return state;
  }
};

export default rootReducer;
