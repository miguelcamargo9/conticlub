import * as types from "./index";

export const setMessage = message => {
  return {
    type: types.MESSAGE,
    message
  };
};
