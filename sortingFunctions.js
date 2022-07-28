import { constants } from "./constants.js";
import { articlesList } from "./main.js";

export const sortListByDate = (sortByDateButton) => {
  setSortFlag(sortByDateButton);
  if (sortByDateButton.getAttribute("flag") === constants.ASCENDING_FLAG) {
    return articlesList.favouritesList.sort(compareAscendingByDate);
  } else {
    return articlesList.favouritesList.sort(compareDescendingByDate);
  }
};

const compareAscendingByDate = (a, b) => {
  return b.publishedAt.localeCompare(a.publishedAt);
};

const compareDescendingByDate = (a, b) => {
  return a.publishedAt.localeCompare(b.publishedAt);
};

export const sortListByTitle = (sortByTitleButton) => {
  setSortFlag(sortByTitleButton);
  if (sortByTitleButton.getAttribute("flag") === constants.ASCENDING_FLAG) {
    return articlesList.favouritesList.sort(compareAscendingByTitle);
  } else {
    return articlesList.favouritesList.sort(compareDescendingByTitle);
  }
};

const compareAscendingByTitle = (a, b) => {
  return b.title.localeCompare(a.title);
};

const compareDescendingByTitle = (a, b) => {
  return a.title.localeCompare(b.title);
};

const setSortFlag = (buttonType) => {
  if (buttonType.getAttribute("flag") === constants.ASCENDING_FLAG) {
    buttonType.setAttribute("flag", constants.DESCENDING_FLAG);
    buttonType.innerHTML = buttonType.id + constants.DESCENDING_SYMBOL;
  } else {
    buttonType.setAttribute("flag", constants.ASCENDING_FLAG);
    buttonType.innerHTML = buttonType.id + constants.ASCENDING_SYMBOL;
  }
};
