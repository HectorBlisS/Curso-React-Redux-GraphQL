import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; 
import userReducer from './userDuck';

let rootReducer = combineReducers({
  user: userReducer
});

const composeEnhancers = window._REDUX_DEVTOOLS_EXTENSION_COMPOSE_ || compose;

export default function generateStore(){
  let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
  return store;
};