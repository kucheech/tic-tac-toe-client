import { INIT, NEW_SESSION, JOIN_SESSION, ADD_MOVE, END_SESSION } from './actionTypes';

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
export const endSession = payload => ({ type: END_SESSION, payload, });
