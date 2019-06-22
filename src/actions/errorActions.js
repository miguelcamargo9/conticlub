import * as types from "./index";

export const setMessageError = message => {
  return {
    type: types.ERROR_MESSAGE,
    message
  };
};
