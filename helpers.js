import { constants } from "./constants.js";

export const findContainer = (i) => {
  return document.getElementById(constants.ARTICLE_CONTAINER + i);
};
export const clearBoard = () => {
  document.getElementById(constants.HEADER_CONTAINER).remove();
  document.getElementById(constants.LIST_CONTAINER).remove();
};

export const clearList = () => {
  document.getElementById(constants.LIST_CONTAINER).remove();
};
