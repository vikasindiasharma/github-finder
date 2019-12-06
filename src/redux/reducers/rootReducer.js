import { combineReducers } from "redux";
import searchResults from "./searchRepoReducer";
import repositories from './repositoryReducers';
import apiCallsInProgress from "./apiStatusReducer";
const rootReducer = combineReducers({
   searchResults,
   repositories,
   apiCallsInProgress
});

export default rootReducer;