import * as types from "../actions";

export default function(state = { slides: [] }, action) {
  switch (action.type) {
    case types.SET_SLIDES_UP:
      return {
        ...state,
        slidesUp: action.payload.dataSlide,
        pathsUp: action.payload.paths
      };
    case types.SET_SLIDES_DOWN:
      return {
        ...state,
        slidesDown: action.payload.dataSlide,
        pathsDown: action.payload.paths
      };
    default:
      return state;
  }
}
