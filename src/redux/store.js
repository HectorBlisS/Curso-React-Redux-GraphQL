import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'; 
import userReducer from './userDuck';
import charactersReducer, { getCharactersActions } from './charactersDuck';

let rootReducer = combineReducers({
  user: userReducer,
  characters: charactersReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore(){
  let store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))
  // Consiguiendo los personajes por primera vez
  getCharactersActions()(store.dispatch, store.getState);
  return store
};