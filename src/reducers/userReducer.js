import * as types from "../actions";

export default function(
  state = {
    users: [],
    invoices: [],
    redeemList: []
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
    case types.SET_REDEEM_LIST:
      return {
        ...state,
        redeemList: action.payload.dataRedeem
      };
    default:
      return state;
  }
}
