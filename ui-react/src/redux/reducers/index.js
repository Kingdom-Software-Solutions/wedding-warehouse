import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { userReducer } from './userReducer';
import { warehouseReducer } from './warehouseReducer';
import { reserveReducer } from './reserveReducer';
import { cartReducer } from './cartReducer';
import { oktaReducer } from './oktaReducer';

const persistConfig = {
    key: 'root',
    storage,
    // might be able to add okta user state to only make one call and make code more DRY for okta?
    whitelist: ['cartReducer'] //Add any new reducers to this array for perisitence to work
}

const rootReducer = combineReducers({
    userReducer,
    warehouseReducer,
    reserveReducer,
    cartReducer,
    oktaReducer
});

export default persistReducer(persistConfig, rootReducer);