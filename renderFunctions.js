import {
  createInputForArticlesLimit,
  createGoToLibraryButton,
  createHeaderContainer,
  createListContainer,
  createCounterContainer,
  createArticleContainer,
  createArticleTitle,
  createNewsSite,
  createArticlePublishedDate,
  createArticleSummary,
  createLinkToArticle,
  createIDArticle,
  createFavouriteButton,
  createGoToListButton,
  createSortByTitleButton,
  createSortByDateButton,
} from "./createElementsFunctions.js";
import { constants } from "./constants.js";
import { articlesList } from "./main.js";
import { clearList, findContainer } from "./helpers.js";
export const renderMainSite = () => {
  renderHeaderContainer();
  renderHeaderElements();
  renderListContainer();
  articlesList.refreshDataFromLocalStorage();
};
export const renderLibrary = () => {
  renderHeaderContainer();
  createLibraryHeaderElements();
  renderListContainer();
  renderLibraryList();
};
export const renderLibraryList = () => {
  const libraryListLength = articlesList.favouritesList.length;
  if (libraryListLength > 0) {
    renderArticlesList(
      articlesList.favouritesList,
      0,
      libraryListLength,
      constants.IN_LIBRARY
    );
  } else {
    document.getElementById(constants.LIST_CONTAINER).innerHTML =
      constants.EMPTY_LIBRARY_ALERT;
  }
};
//HEADER
const renderHeaderContainer = () => {
  const container = document.getElementById(constants.SITE_CONTAINER);
  container.appendChild(createHeaderContainer());
};

const renderHeaderElements = () => {
  const headerContainer = document.getElementById(constants.HEADER_CONTAINER);
  renderInputForArticlesLimit(headerContainer);
  renderCounterContainer(headerContainer);
  renderGoToLibraryButton(headerContainer);
};

const renderCounterContainer = (headerContainer) => {
  headerContainer.appendChild(createCounterContainer());
};

const renderInputForArticlesLimit = (headerContainer) => {
  headerContainer.appendChild(createInputForArticlesLimit());
};

const renderGoToLibraryButton = (headerContainer) => {
  headerContainer.appendChild(createGoToLibraryButton());
};

export const renderCounter = () => {
  document.getElementById(constants.COUNTER_CONTAINER).innerHTML =
    constants.DISPLAYED_ARTICLES +
    articlesList.articlesList.length +
    "/" +
    articlesList.numberOfArticles;
};

export const createLibraryHeaderElements = () => {
  const headerContainer = document.getElementById(constants.HEADER_CONTAINER);
  headerContainer.appendChild(createGoToListButton());
  headerContainer.appendChild(createSortByTitleButton());
  headerContainer.appendChild(createSortByDateButton());
};

//LIST
export const renderListContainer = () => {
  const container = document.getElementById(constants.SITE_CONTAINER);
  container.appendChild(createListContainer());
};

export const renderSiteContent = (minIndex, maxIndex) => {
  renderArticlesList(articlesList.articlesList, minIndex, maxIndex);
};

export const renderArticlesList = (
  list,
  minIndex,
  maxIndex,
  className = null
) => {
  for (let i = minIndex; i <= maxIndex - 1; i++) {
    renderArticle(list[i], className);
  }
};
const renderArticle = (article, className) => {
  const container = document.getElementById(constants.LIST_CONTAINER);
  container.appendChild(createArticleContainer(article.id));
  findContainer(article.id).appendChild(
    createArticleTitle(article.title, article.id)
  );
  findContainer(article.id).appendChild(createNewsSite(article.newsSite));
  findContainer(article.id).appendChild(
    createArticlePublishedDate(article.publishedAt)
  );
  findContainer(article.id).appendChild(createArticleSummary(article.summary));
  findContainer(article.id).appendChild(createLinkToArticle(article.url));
  findContainer(article.id).appendChild(
    createFavouriteButton(article.id, className)
  );
  findContainer(article.id).appendChild(createIDArticle(article.id));
};

export const renderSortedList = () => {
  clearList();
  renderListContainer();
  renderLibraryList();
};
