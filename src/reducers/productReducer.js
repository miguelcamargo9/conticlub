import * as types from "../actions";

export default function(state = { products: [] }, action) {
  switch (action.type) {
    case types.GET_PRODS:
      return {
        ...state,
        products: action.payload.dataProduct,
        prods: action.payload.prod
      };
    default:
      return state;
  }
}
