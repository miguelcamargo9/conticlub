import * as types from "./index";
import {
  userService,
  getInvoiceHistoryByUserService,
  getRedeemListService,
  getRedeemListByUserIdService
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

export const setRedeemListData = dataRedeem => {
  return {
    type: types.SET_REDEEM_LIST,
    payload: {
      dataRedeem
    }
  };
};

export const getUsersAction = () => {
  return dispatch => {
    userService().then(dataUsers => {
      if (!dataUsers || !dataUsers.data) return;
      dispatch(setUserData(dataUsers.data));
    });
  };
};

export const getInvoiceHistoryByUser = userId => {
  return dispatch => {
    getInvoiceHistoryByUserService(userId).then(dataInvoices => {
      if (!dataInvoices || !dataInvoices.data) return;
      dispatch(setInvoiceHistoryData(dataInvoices.data));
    });
  };
};

export const getRedeemList = () => {
  return dispatch => {
    getRedeemListService().then(dataRedeem => {
      if (!dataRedeem || !dataRedeem.data) return;
      dispatch(setRedeemListData(dataRedeem.data));
    });
  };
};

export const getRedeemListByUserId = userId => {
  return dispatch => {
    getRedeemListByUserIdService(userId).then(dataRedeem => {
      if (!dataRedeem || !dataRedeem.data) return;
      dispatch(setRedeemListData(dataRedeem.data));
    });
  };
};
