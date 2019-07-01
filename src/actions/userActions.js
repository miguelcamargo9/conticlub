import * as types from "./index";
import {
  userService,
  getInvoiceHistoryByUserService
} from "../services/userService";

export const setUserData = dataUser => {
  return {
    type: types.GET_USERS,
    payload: {
      dataUser
    }
  };
};

export const setInvoiceHistoryData = dataInvoices => {
  return {
    type: types.SET_HISTORY_INVOICE_BY_USER,
    payload: {
      dataInvoices
    }
  };
};

export const getUsersAction = () => {
  return dispatch => {
    userService().then(dataUsers => {
      dispatch(setUserData(dataUsers.data));
    });
  };
};

export const getInvoiceHistoryByUser = userId => {
  return dispatch => {
    getInvoiceHistoryByUserService(userId).then(dataInvoices => {
      dispatch(setInvoiceHistoryData(dataInvoices.data));
    });
  };
};
