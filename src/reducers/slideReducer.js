import * as types from "../actions";

export default function(state = { slides: [] }, action) {
  switch (action.type) {
    case types.GET_SLIDES:
      return {
        ...state,
        slides: action.payload.dataSlide,
        paths: action.payload.paths
      };
    default:
      return state;
  }
}
