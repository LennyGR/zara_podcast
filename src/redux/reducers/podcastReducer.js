import { STORE_POPULAR } from "../actions/constants";
import { createReducer } from "./createReducer.js";

const initialState = {
    popular: []
};

const storePopular = (state = initialState, { payload }) => ({...state, popular: payload})
  
const podcastReducer = createReducer(initialState, {
    [STORE_POPULAR]: storePopular
  });

export { podcastReducer };