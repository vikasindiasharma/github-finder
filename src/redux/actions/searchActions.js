import * as types from "./actionTypes";
import gql from 'graphql-tag';
import { beginApiCall, apiCallError } from "./apiStatusActions";

const SEARCH_REPO_BY_NAME = gql`
    query searchRepo($searchText : String!) {
    search(first: 50, query:$searchText , type: REPOSITORY  ) {       
        nodes {
        ... on Repository {
            nameWithOwner,
            name            
        }
        }
    }
    }
    `;

export function searchResultSuccess(searchResults) {
  return { type: types.SEARCH_REPOSITORIES_SUCCESS, searchResults };
}

export function searchRepositories(client, searchText) { 
  let queryText =searchText + ' in:name';

  return function (dispatch, getState) {
    dispatch(beginApiCall());
    return client.query({
      query: SEARCH_REPO_BY_NAME,
      variables: { searchText: queryText }
    }).then(response => {      
      dispatch(searchResultSuccess(response.data.search.nodes));
    })
      .catch(error => {        
        dispatch(apiCallError(error));
        throw error;
      });
  };
}