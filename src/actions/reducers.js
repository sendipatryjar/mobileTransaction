import {GET_LIST_SUCCESS, GET_LIST_REQ, GET_LIST_FAILED} from './types';
import INITIAL_STATE from './initial-state';

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_LIST_SUCCESS:
      return {...state, listTransaction: action.payload};
    // case GET_LIST_REQ:
    //   return {...state, listTransaction: null};
    // case GET_LIST_FAILED:
    //   return {...state, listTransaction: null};
    default:
      return state;
  }
};
