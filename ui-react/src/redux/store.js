import { createStore, applyMiddleware } from 'redux';
// persist the store for the cart
import { persistStore } from 'redux-persist';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import  rootReducer from './reducers'

export const store = createStore(rootReducer, applyMiddleware(thunk, logger))

export const persistor = persistStore(store)
