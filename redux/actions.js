import { INIT, NEW_SESSION, JOIN_SESSION } from './actionTypes';

export const init = () => ({ type: INIT, payload: null, });
export const newSession = () => ({ type: NEW_SESSION, payload: null, });
export const joinSession = () => ({ type: JOIN_SESSION, payload: null, });
