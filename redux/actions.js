import { INIT, NEW_SESSION, JOIN_SESSION, ADD_MOVE, SET_MOVES, END_SESSION, SET_PLAYER } from './actionTypes';

export const init = () => ({ type: INIT, payload: null, });
export const newSession = () => ({ type: NEW_SESSION, payload: null, });
export const joinSession = () => ({ type: JOIN_SESSION, payload: null, });

export const makeRequest = (url, options, type) => {
  return dispatch => {
    return fetch(url, options)
      .then(response => response.json())
      .then(json => { dispatch({ type, payload: json }); });
  };
};

export const addMove = payload => ({ type: ADD_MOVE, payload, });
export const setMoves = payload => ({ type: SET_MOVES, payload, });
export const setPlayer = payload => ({ type: SET_PLAYER, payload, });
export const endSession = payload => ({ type: END_SESSION, payload, });
