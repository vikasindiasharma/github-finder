import * as types from "../actions/actionTypes";
import initialState from "./initialState";

export default function repositoryReducers(state = initialState.repositories, action) {

    switch (action.type) {
      case types.ADD_CARD_SUCCESS:        
       let  newState = [...state, { ...action.newCard }];      
        return newState; 
      case types.REMOVE_CARD_SUCCESS:
           return state.filter(card => card.nameWithOwner !== action.repoNameWithOwner);      
       case types.LOAD_REPOSITORY_SUCCESS:         
         return action.cards ;
    
      default:
        return state;
    }
  }