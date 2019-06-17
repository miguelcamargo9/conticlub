import * as types from "../actions";

export default function(state = { subsidiaries: [] }, action) {
  switch (action.type) {
    case types.SET_SUBSIDIARIES:
      return {
        ...state,
        subsidiaries: action.payload.subsidiaries
      };
    default:
      return state;
  }
}
