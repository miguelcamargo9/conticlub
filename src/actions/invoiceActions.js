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

export const getInvoiceHistory = () => {
  return dispatch => {
    getInvoiceHistoryService().then(dataInvoices => {
      dispatch(setInvoiceHistoryData(dataInvoices.data));
    });
  };
};
