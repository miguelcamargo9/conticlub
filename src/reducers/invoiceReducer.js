import * as types from "../actions";

export default function(
  state = {
    invoices: []
  },
  action
) {
  switch (action.type) {
    case types.SET_HISTORY_INVOICE:
      return {
        ...state,
        invoices: action.payload.dataInvoices
      };
    default:
      return state;
  }
}
