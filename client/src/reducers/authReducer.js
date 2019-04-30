import isEmpty from '../validation/is-empty';

const { SET_CURRENT_USER } = '../actions/types';
const initialState = {
  inAuthenticated: false,
  user: {}
};

export default function(state = initialState, action) {
  switch(action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload
      }
    default: 
      return state;
  }
}