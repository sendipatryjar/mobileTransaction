import {GET_LIST_FAILED, GET_LIST_REQ, GET_LIST_SUCCESS} from './types';
import {getList} from './../services/Transaction';

export const GetList = () => async dispatch => {
  dispatch({type: GET_LIST_REQ, payload: null});
  try {
    const response = await getList();
    if (response != null) {
      dispatch({type: GET_LIST_SUCCESS, payload: response.data});
    } else {
      dispatch({type: GET_LIST_FAILED, payload: response.status});
    }
  } catch (err) {
    dispatch({type: GET_LIST_FAILED, payload: err});
  }
};
