import * as types from "../actions";

export default function(state = { slides: [], flag: false }, action) {
  switch (action.type) {
    case types.GET_SLIDES:
      return {
        ...state,
        slides: action.payload.dataSlide,
        paths: action.payload.paths
      };
    case types.SET_SRCIMG:
      return {
        ...state,
        flag: action.payload.flag
      };
    default:
      return state;
  }
}
