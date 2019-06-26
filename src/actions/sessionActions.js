import * as types from "./index";

export const setPoints = points => {
  return {
    type: types.SET_SESSION_POINTS,
    payload: {
      points
    }
  };
};
