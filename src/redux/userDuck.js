// constants 
let initialData = {
  loggedIn: false
}
let LOGIN = 'LOGIN';

// reducer | recibe state y action 
export default function reducer(state = initialData, action) {
  switch(action.type){
    case LOGIN:
    default:
      return state
  }
}

// action (action creator)