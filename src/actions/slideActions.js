import * as types from "./index";
import { getSlideByPositionService } from "../services/slideService";
import { SERVER_URL } from "../constants/server";

export const setSlidesUpData = dataSlide => {
  const paths = dataSlide.map(slide => {
    return SERVER_URL + slide.path;
  });
  return {
    type: types.SET_SLIDES_UP,
    payload: {
      paths,
      dataSlide
    }
  };
};

export const setSlidesDownData = dataSlide => {
  const paths = dataSlide.map(slide => {
    return SERVER_URL + slide.path;
  });
  return {
    type: types.SET_SLIDES_DOWN,
    payload: {
      paths,
      dataSlide
    }
  };
};

export const getSlidesAction = position => {
  return dispatch => {
    getSlideByPositionService(position).then(slideInfo => {
      if (position === "up") {
        dispatch(setSlidesUpData(slideInfo.data));
      } else {
        if (position === "down") {
          dispatch(setSlidesDownData(slideInfo.data));
        }
      }
    });
  };
};
