import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { userReducer } from './userReducer';
import { warehouseReducer } from './warehouseReducer';
import { reserveReducer } from './reserveReducer';
import { cartReducer } from './cartReducer';

const persistConfig = {
    key: 'root',
    storage,
    whitelist: ['cartReducer'] //Add any new reducers to this array for perisitence to work
}

const rootReducer = combineReducers({
    userReducer,
    warehouseReducer,
    reserveReducer,
    cartReducer
});

export default persistReducer(persistConfig, rootReducer);