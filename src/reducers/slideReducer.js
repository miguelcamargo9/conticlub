import * as types from "../actions";

export default function(state = { slides: [], flag: false }, action) {
  switch (action.type) {
    case types.GET_SLIDES:
      return {
        ...state,
        slides: action.payload.dataSlide,
        // slides: [
        //   ["1", "Andrew Mike", "Develop", "2013", "€ 99,225"],
        //   ["2", "John Doe", "Design", "2012", "€ 89,241"],
        //   ["3", "Alex Mike", "Design", "2010", "€ 92,144"],
        //   ["4", "Mike Monday", "Marketing", "2013", "€ 49,990"],
        //   ["5", "Paul Dickens", "Communication", "2015", "€ 69,201"]
        // ],
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
