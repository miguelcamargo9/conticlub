import * as types from "../actions";

const initialState = {
  invoices: [],
  pagination: {
    currentPage: 1,
    lastPage: 1,
    perPage: 15,
    total: 0
  },
  loading: false
};

export default function(state = initialState, action) {
  switch (action.type) {
    case types.SET_HISTORY_INVOICE:
      return {
        ...state,
        invoices: action.payload.dataInvoices
      };
    case types.SET_INVOICE_PAGINATION:
      return {
        ...state,
        pagination: action.payload.pagination
      };
    case types.SET_INVOICE_LOADING:
      return {
        ...state,
        loading: action.payload.loading
      };
    default:
      return state;
  }
}
