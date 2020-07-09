import axios from 'axios';

// constants
let initialData = {
  fetching: false,
  array: [],
  current: {}
};

let URL = "https://rickandmortyapi.com/api/character";

let GET_CHARACTERS = "GET_CHARACTERS";
let GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS";
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR";

// reducer
export default function reducer(state = initialData, action){
  switch(action.type){
    case GET_CHARACTERS:
    case GET_CHARACTERS_ERROR:
    case GET_CHARACTERS_SUCCESS: 
      return { ...state, array: action.payload }
    default:
      return state;
  }
};

// actions o (thunks) || Estas funciones devuelven otra función | también llamados action creators
// dispatch y getState son parte del store
// dispatch ejecuta las acciones 
// getState entrega el store
export const getCharactersActions = () => (dispatch, getState) => {
  return  axios.get(URL)
    .then(res => {
      dispatch({
        type: GET_CHARACTERS_SUCCESS,
        payload: res.data.results
      })
    })
};
