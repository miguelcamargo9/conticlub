import * as types from "../actions";

export default function(
  state = {
    message: null
  },
  action
) {
  switch (action.type) {
    case types.MESSAGE:
      return {
        ...state,
        message: action.message
      };
    default:
      return state;
  }
}
