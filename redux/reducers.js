import { INIT, NEW_SESSION, JOIN_SESSION } from './actionTypes';
import { PLAYER_X, PLAYER_Y, HOME_SCREEN, PLAYER_SCREEN, JOIN_SCREEN } from '../constants';

const INITIAL_STATE = {
  screen: HOME_SCREEN,
  player: null,
  playerTurn: null,
  playerX: {
    name: 'Player X'
  },
  playerY: {
    name: 'Player Y'
  }
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

    default:
      return state;
  }
};

export default rootReducer;
