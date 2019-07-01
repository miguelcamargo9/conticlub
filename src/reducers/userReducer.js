import * as types from "../actions";

export default function(
  state = {
    users: [],
    invoices: []
  },
  action
) {
  switch (action.type) {
    case types.GET_USERS:
      return {
        ...state,
        users: action.payload.dataUser
      };
    case types.SET_HISTORY_INVOICE_BY_USER:
      return {
        ...state,
        invoices: action.payload.dataInvoices
      };
    default:
      return state;
  }
}
