import authorApi from '../api/mockAuthorApi';
import * as types from './actionTypes';

export function loadAuthorsSuccess(courses){
  return {type: types.LOAD_AUTHORS_SUCCESS, courses};
}

export function loadAuthors() {
  return function (dispatch) {
    return authorApi.getAllAuthors().then((authors)=>{
      dispatch(loadAuthorsSuccess(authors));
    }).catch((error)=>{ //catch any exception
      throw(error);
    });
  };
}
