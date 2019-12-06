import * as types from "./actionTypes";
import gql from 'graphql-tag';
import { beginApiCall, apiCallError } from "./apiStatusActions";
import * as restCardApi from "../../api/restCardApi";

const GET_REPOSITORY_DETAIL = gql`
query searchRepo($nameWithOwner : String!) {
  search(first: 1, query:$nameWithOwner , type: REPOSITORY  ) {    
    nodes {
      ... on Repository {
        nameWithOwner
          name
          owner
          {
            login            
            avatarUrl
          }
          forkCount           
          watchers
          {
           totalCount  
          }
          stargazers
          {
            totalCount
          }
      }
    }
  }
}
`;

export function addCardSuccess(newCard) {
  return { type: types.ADD_CARD_SUCCESS, newCard };
}

export function removeCard(repoNameWithOwner) {
  return function (dispatch) {
    dispatch(beginApiCall());
    return restCardApi
      .removeCard(repoNameWithOwner)
      .then(dispatch(cardRemovedSuccess(repoNameWithOwner)))
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function loadCardSuccess(cards) {
  return { type: types.LOAD_REPOSITORY_SUCCESS, cards };
}

export function cardRemovedSuccess(repoNameWithOwner) {
  return { type: types.REMOVE_CARD_SUCCESS, repoNameWithOwner };
}

export function loadCards() {
  return function (dispatch) {
    dispatch(beginApiCall());
    return restCardApi
      .getCards()
      .then(cards => {
        dispatch(loadCardSuccess(cards));
      })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}

export function getRepositoryDetail(client, nameWithOwner) {

  return function (dispatch) {
    dispatch(beginApiCall());

    return client.query({
      query: GET_REPOSITORY_DETAIL,
      variables: { nameWithOwner }
    }).then(response => {
      let newCard = response.data.search.nodes[0];      
      dispatch({ type: "_SUCCESS" })
      dispatch(beginApiCall());
      restCardApi.saveCard(newCard).then(dispatch(addCardSuccess(newCard))).catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });

    })
      .catch(error => {
        dispatch(apiCallError(error));
        throw error;
      });
  };
}