import invoiceReducer from "./invoiceReducer";
import * as types from "../actions";

describe("invoiceReducer", () => {
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

  it("should return the initial state", () => {
    expect(invoiceReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle SET_HISTORY_INVOICE", () => {
    const invoices = [{ id: 1 }, { id: 2 }];
    const action = {
      type: types.SET_HISTORY_INVOICE,
      payload: { dataInvoices: invoices }
    };
    const newState = invoiceReducer(initialState, action);
    expect(newState.invoices).toEqual(invoices);
    expect(newState.pagination).toEqual(initialState.pagination);
    expect(newState.loading).toBe(false);
  });

  it("should handle SET_INVOICE_PAGINATION", () => {
    const pagination = {
      currentPage: 3,
      lastPage: 10,
      perPage: 15,
      total: 150
    };
    const action = {
      type: types.SET_INVOICE_PAGINATION,
      payload: { pagination }
    };
    const newState = invoiceReducer(initialState, action);
    expect(newState.pagination).toEqual(pagination);
    expect(newState.invoices).toEqual([]);
  });

  it("should handle SET_INVOICE_LOADING true", () => {
    const action = {
      type: types.SET_INVOICE_LOADING,
      payload: { loading: true }
    };
    const newState = invoiceReducer(initialState, action);
    expect(newState.loading).toBe(true);
  });

  it("should handle SET_INVOICE_LOADING false", () => {
    const state = { ...initialState, loading: true };
    const action = {
      type: types.SET_INVOICE_LOADING,
      payload: { loading: false }
    };
    const newState = invoiceReducer(state, action);
    expect(newState.loading).toBe(false);
  });

  it("should not mutate state on unknown action", () => {
    const state = {
      invoices: [{ id: 1 }],
      pagination: { currentPage: 2, lastPage: 5, perPage: 15, total: 75 },
      loading: false
    };
    const newState = invoiceReducer(state, { type: "UNKNOWN" });
    expect(newState).toEqual(state);
  });
});
