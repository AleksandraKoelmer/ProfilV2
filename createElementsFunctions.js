import { constants } from "./constants.js";
import { articlesList } from "./main.js";

//HEADER
export const createHeaderContainer = () => {
  return createContainer(constants.HEADER_CONTAINER);
};
export const createCounterContainer = () => {
  return createContainer(constants.COUNTER_CONTAINER);
};

export const createInputForArticlesLimit = () => {
  const inputForArticlesLimit = document.createElement("input");
  inputForArticlesLimit.setAttribute("id", constants.ARTICLES_INPUT);
  inputForArticlesLimit.setAttribute("type", "number");
  inputForArticlesLimit.defaultValue = constants.ARTICLES_LIMIT.toString();
  return inputForArticlesLimit;
};

export const createGoToLibraryButton = () => {
  const goToLibraryButton = document.createElement("button");
  goToLibraryButton.innerText = constants.BUTTON_TEXT_TO_LIBRARY;
  goToLibraryButton.setAttribute("id", constants.LIBRARY_BUTTON);
  return goToLibraryButton;
};

export const createSortByTitleButton = () => {
  return createButton(
    constants.SORT_BY_TITLE_BUTTON_TEXT + constants.ASCENDING_SYMBOL,
    constants.SORT_BY_TITLE_BUTTON_TEXT
  );
};

export const createSortByDateButton = () => {
  return createButton(
    constants.SORT_BY_DATE_BUTTON_TEXT + constants.ASCENDING_SYMBOL,
    constants.SORT_BY_DATE_BUTTON_TEXT
  );
};

const createButton = (text, buttonID) => {
  const button = document.createElement("button");
  button.innerHTML = text;
  button.setAttribute("flag", constants.ASCENDING_FLAG);
  button.classList.add(constants.SORTING_BUTTON);
  button.setAttribute("id", buttonID);
  return button;
};
export const createGoToListButton = () => {
  const goToListButton = document.createElement("button");
  goToListButton.innerText = constants.BUTTON_TEXT_TO_LIST;
  goToListButton.setAttribute("id", constants.GO_TO_LIST_BUTTON);
  return goToListButton;
};

//LIST
export const createListContainer = () => {
  return createContainer(constants.LIST_CONTAINER);
};

export const createArticleContainer = (id) => {
  const articleContainer = createContainer(constants.ARTICLE_CONTAINER + id);
  articleContainer.classList.add(constants.ARTICLE_CONTAINER);
  return articleContainer;
};

export const createArticleTitle = (title) => {
  const titleHeader = document.createElement("h2");
  titleHeader.textContent = title;
  return titleHeader;
};

export const createNewsSite = (newsSite) => {
  const newsSiteHeader = document.createElement("h4");
  newsSiteHeader.textContent = newsSite;
  return newsSiteHeader;
};
export const createArticlePublishedDate = (date) => {
  const dateSpan = document.createElement("span");
  const parsedDate = new Date(Date.parse(date));
  const year = parsedDate.getFullYear();
  const month = parsedDate.getMonth() + 1;
  const day = parsedDate.getDate();
  dateSpan.textContent = year + "." + month + "." + day;
  return dateSpan;
};
export const createArticleSummary = (summary) => {
  const summaryDescription = document.createElement("p");
  if (summary.length < constants.SUMMARY_LIMITER) {
    summaryDescription.textContent = summary;
  } else {
    summaryDescription.textContent =
      summary.slice(0, constants.SUMMARY_LIMITER) + "...";
  }
  return summaryDescription;
};
export const createLinkToArticle = (url) => {
  const articleURL = document.createElement("a");
  articleURL.href = url;
  articleURL.innerHTML = constants.READ_ARTICLE;
  return articleURL;
};

export const createFavouriteButton = (id, className) => {
  const inLibraryIDs = articlesList.favouritesList.map((item) => {
    return Number(item.id);
  });

  const favouriteButton = document.createElement("button");
  favouriteButton.classList.add(constants.ADD_TO_LIBRARY_BUTTON, className);
  if (inLibraryIDs.includes(Number(id))) {
    favouriteButton.innerText = constants.BUTTON_TEXT_DELETE;
    favouriteButton.setAttribute("flag", constants.CLICKED_FLAG);
  } else {
    favouriteButton.innerText = constants.BUTTON_TEXT_ADD;
    favouriteButton.setAttribute("flag", constants.NOT_CLICKED_FLAG);
  }
  return favouriteButton;
};

export const createIDArticle = (id) => {
  const articleID = document.createElement("h6");
  articleID.innerHTML = id;
  return articleID;
};

//HELPERS

const createContainer = (id) => {
  const container = document.createElement("div");
  container.setAttribute("id", id);
  return container;
};
