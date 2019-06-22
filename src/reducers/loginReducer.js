import * as types from "../actions";

export default function(state = [], action) {
  switch (action.type) {
    case types.DATA_USER:
      return { ...state, user: action.user };
    default:
      return state;
  }
}
