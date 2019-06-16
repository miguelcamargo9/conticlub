import * as types from "./index";
import { getSubsidiariesService } from "../services/subsidiaryService";

export const registerUserAction = user => {
  return {
    type: types.REGISTER_USER,
    user
  };
};

export const setSubsidiariesData = subsidiaries => {
  return {
    type: types.SET_SUBSIDIARIES,
    payload: {
      subsidiaries
    }
  };
};

export const getSubsidiariesData = () => {
  return dispatch => {
    getSubsidiariesService().then(subsidiaries => {
      dispatch(setSubsidiariesData(subsidiaries));
    });
  };
};
