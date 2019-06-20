import * as types from "../actions";

export default function(
  state = {
    products: []
  },
  action
) {
  switch (action.type) {
    case types.GET_PRODS:
      return {
        ...state,
        products: action.payload.dataProduct
      };
    default:
      return state;
  }
}
