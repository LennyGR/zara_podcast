import { podcastReducer } from './podcastReducer';

import { persistCombineReducers, persistReducer } from 'redux-persist';
import storageSession from 'redux-persist/lib/storage/session';
//import storage from 'redux-persist/lib/storage';

export const rootPersistConfig = {
    key: 'root',
    storage: storageSession,
    whitelist: ['podcasts']
};

const reducers = persistCombineReducers(rootPersistConfig, {
    podcasts: podcastReducer
});

export default persistReducer(rootPersistConfig, reducers);