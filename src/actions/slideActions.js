import * as types from "./index";
import { slideService } from "../services/slideService";

export const setSlideData = dataSlide => {
  const paths = dataSlide
    .filter(slide => slide.show === 1)
    .map(slide => {
      return "http://conticlub.co" + slide.path;
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
