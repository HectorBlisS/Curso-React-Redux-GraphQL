import axios from 'axios'
import { updateDB, getFavs } from '../firebase'
import ApolloClient, { gql } from 'apollo-boost'

// constantes
let initialData = {
    fetching: false,
    array: [],
    current: {},
    favorites: [],
    nextPage: 1
}
let URL = "https://rickandmortyapi.com/api/character"

let client = new ApolloClient({
    uri: "https://rickandmortyapi.com/graphql"
})

let UPDATE_PAGE = "UPDATE_PAGE"

let GET_CHARACTERS = "GET_CHARACTERS"
let GET_CHARACTERS_SUCCESS = "GET_CHARACTERS_SUCCESS"
let GET_CHARACTERS_ERROR = "GET_CHARACTERS_ERROR"

let REMOVE_CHARACTER = "REMOVE_CHARACTER"
let ADD_TO_FAVORITES = "ADD_TO_FAVORITES"

let GET_FAVS = "GET_FAVS"
let GET_FAVS_SUCCESS = "GET_FAVS_SUCCESS"
let GET_FAVS_ERROR = "GET_FAVS_ERROR"

// reducer
export default function reducer(state = initialData, action) {
    switch (action.type) {
        case UPDATE_PAGE:
            return { ...state, nextPage: action.payload }

        case GET_FAVS_SUCCESS:
            return { ...state, fetching: false, favorites: action.payload }
        case GET_FAVS_ERROR:
            return { ...state, fetching: false, error: action.payload }
        case GET_FAVS:
            return { ...state, fetching: true }

        case ADD_TO_FAVORITES:
            return { ...state, ...action.payload }
        case REMOVE_CHARACTER:
            return { ...state, array: action.payload }

        case GET_CHARACTERS:
            return { ...state, fetching: true }
        case GET_CHARACTERS_ERROR:
            return { ...state, fetching: false, error: action.payload }
        case GET_CHARACTERS_SUCCESS:
            return { ...state, array: action.payload, fetching: false }
        default:
            return state
    }
}

// actions (thunks)
export let retreiveFavs = () => (dispatch, getState) => {
    dispatch({
        type: GET_FAVS
    })
    let { uid } = getState().user
    return getFavs(uid)
        .then(array => {
            dispatch({
                type: GET_FAVS_SUCCESS,
                payload: [...array]
            })
        })
        .catch(e => {
            console.log(e)
            dispatch({
                type: GET_FAVS_ERROR,
                payload: e.message
            })
        })
}

export let addToFavoitesAction = () => (dispatch, getState) => {
    let { array, favorites } = getState().characters
    let { uid } = getState().user
    let char = array.shift()
    favorites.push(char)
    updateDB(favorites, uid)
    dispatch({
        type: ADD_TO_FAVORITES,
        payload: { array: [...array], favorites: [...favorites] }
    })
}

export let removeCharacterAction = () => (dispatch, getState) => {
    // ?? donde estan lo ch
    let { array } = getState().characters
    array.shift()
    if (!array.length) {
        getCharactersAction()(dispatch, getState)
        return
    }
    dispatch({
        type: REMOVE_CHARACTER,
        payload: [...array]
    })

}

export let getCharactersAction = () => (dispatch, getState) => {
    let query = gql`
    query ($page:Int){
        characters(page:$page){
          info{
            pages
            next
            prev
          }
          results{
            name
            image
          }
        }
      }
    `
    dispatch({
        type: GET_CHARACTERS
    })
    let { nextPage } = getState().characters
    return client.query({
        query,
        variables: { page: nextPage }
    })
        .then(({ data, error }) => {
            if (error) {
                dispatch({
                    type: GET_CHARACTERS_ERROR,
                    payload: error
                })
                return
            }
            dispatch({
                type: GET_CHARACTERS_SUCCESS,
                payload: data.characters.results
            })
            console.log(data.characters.info.next)
            dispatch({
                type: UPDATE_PAGE,
                payload: data.characters.info.next ? data.characters.info.next : 1
            })
        })

    // dispatch({
    //     type: GET_CHARACTERS
    // })
    // return axios.get(URL)
    //     .then(res => {
    //         dispatch({
    //             type: GET_CHARACTERS_SUCCESS,
    //             payload: res.data.results
    //         })
    //     })
    //     .catch(err => {
    //         console.log(err)
    //         dispatch({
    //             type: GET_CHARACTERS_ERROR,
    //             payload: err.response.message
    //         })
    //     })
}