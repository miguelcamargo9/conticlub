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

export const setSlidesUpResponsiveData = dataSlide => {
  const paths = dataSlide.map(slide => {
    return SERVER_URL + slide.path;
  });
  return {
    type: types.SET_SLIDES_UP_RESPONSIVE,
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

export const setSlidesDownResponsiveData = dataSlide => {
  const paths = dataSlide.map(slide => {
    return SERVER_URL + slide.path;
  });
  return {
    type: types.SET_SLIDES_DOWN_RESPONSIVE,
    payload: {
      paths,
      dataSlide
    }
  };
};

export const getSlidesAction = (position, responsive) => {
  return dispatch => {
    getSlideByPositionService(position, responsive).then(slideInfo => {
      if (position === "up") {
        if (responsive === 1) {
          dispatch(setSlidesUpResponsiveData(slideInfo.data));
        } else {
          dispatch(setSlidesUpData(slideInfo.data));
        }
      } else {
        if (position === "down") {
          if (responsive === 1) {
            dispatch(setSlidesDownResponsiveData(slideInfo.data));
          } else {
            dispatch(setSlidesDownData(slideInfo.data));
          }
        }
      }
    });
  };
};
