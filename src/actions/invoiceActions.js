import * as types from "./index";
import { getInvoiceHistoryService } from "../services/invoiceService";

export const setInvoiceHistoryData = dataInvoices => {
  return {
    type: types.SET_HISTORY_INVOICE,
    payload: {
      dataInvoices
    }
  };
};

export const setInvoicePagination = pagination => {
  return {
    type: types.SET_INVOICE_PAGINATION,
    payload: { pagination }
  };
};

export const setInvoiceLoading = loading => {
  return {
    type: types.SET_INVOICE_LOADING,
    payload: { loading }
  };
};

export const getInvoiceHistory = (page = 1, perPage = 15, search = "") => {
  return dispatch => {
    dispatch(setInvoiceLoading(true));
    getInvoiceHistoryService(page, perPage, search).then(response => {
      if (response && response.data) {
        const { data, current_page, last_page, per_page, total } = response.data;
        dispatch(setInvoiceHistoryData(data));
        dispatch(
          setInvoicePagination({
            currentPage: current_page,
            lastPage: last_page,
            perPage: per_page,
            total: total
          })
        );
      }
      dispatch(setInvoiceLoading(false));
    });
  };
};
