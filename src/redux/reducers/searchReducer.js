import { TEXT_SEARCH } from "../actions/search";
import { createReducer } from "./createReducer.js";

const initialState = {
    searchText: ''
};

const setSearchText = (state = initialState, { payload }) => ({...state, searchText: payload})
  
const searchReducer = createReducer(initialState, {
    [TEXT_SEARCH]: setSearchText
  });

export { searchReducer };