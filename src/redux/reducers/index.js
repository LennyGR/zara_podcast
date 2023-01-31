import { podcastReducer } from './podcastReducer';
import { searchReducer } from './searchReducer';

import { persistCombineReducers, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
//import storage from 'redux-persist/lib/storage';

export const rootPersistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ['podcasts']
};

const reducers = persistCombineReducers(rootPersistConfig, {
    podcasts: podcastReducer,
    search: searchReducer
});

export default persistReducer(rootPersistConfig, reducers);