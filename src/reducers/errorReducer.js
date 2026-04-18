import * as types from "../actions";

export default function(
  state = {
    message: null,
    networkError: false
  },
  action
) {
  switch (action.type) {
    case types.ERROR_MESSAGE:
      return {
        ...state,
        message: action.message
      };
    case types.NETWORK_ERROR:
      return {
        ...state,
        networkError: action.payload
      };
    default:
      return state;
  }
}
