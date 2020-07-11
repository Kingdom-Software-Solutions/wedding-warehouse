import { combineReducers } from 'redux';
import { userReducer } from './userReducer';
import { warehouseReducer } from './warehouseReducer';

// export default combineReducers({
//     userReducer,
//     warehouseReducer
// });
export const rootReducer = combineReducers({
    userReducer,
    warehouseReducer
});