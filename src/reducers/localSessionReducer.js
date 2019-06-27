import * as types from "../actions";

export default function(
  state = {
    points: 0
  },
  action
) {
  switch (action.type) {
    case types.SET_SESSION_POINTS:
      return {
        ...state,
        points: action.payload.points
      };
    default:
      return state;
  }
}
