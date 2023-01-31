import { STORE_POPULAR } from "../actions/podcast";
import { createReducer } from "./createReducer.js";

const initialState = {
    popular: []
};

const storePopular = (state = initialState, { payload }) => ({...state, popular: payload})
  
const podcastReducer = createReducer(initialState, {
    [STORE_POPULAR]: storePopular
  });

export { podcastReducer };