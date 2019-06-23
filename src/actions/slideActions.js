import * as types from "./index";
import { slideService } from "../services/slideService";
import { SERVER_URL } from "../constants/server";

export const setSlideData = dataSlide => {
  const paths = dataSlide
    .filter(slide => slide.show === 1)
    .map(slide => {
      return SERVER_URL + slide.path;
    });
  return {
    type: types.GET_SLIDES,
    payload: {
      paths,
      dataSlide
    }
  };
};

export const getSlidesAction = () => {
  return dispatch => {
    slideService().then(slideInfo => {
      dispatch(setSlideData(slideInfo.data));
    });
  };
};
