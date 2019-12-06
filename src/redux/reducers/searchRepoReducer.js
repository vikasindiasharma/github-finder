import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function searchRepoReducer(state = initialState.searchResults, action) {
  switch (action.type) {
    case types.SEARCH_REPOSITORIES_SUCCESS:
      return [...action.searchResults];
    default:
      return state;
  }
}