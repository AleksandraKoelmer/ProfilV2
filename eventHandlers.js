import { constants } from "./constants.js";
import { articlesList } from "./main.js";
import {
  renderLibrary,
  renderMainSite,
  renderSortedList,
} from "./renderFunctions.js";
import { sortListByDate, sortListByTitle } from "./sortingFunctions.js";
import { clearBoard } from "./helpers.js";

export const buttonsHandler = (event) => {
  if (event.target.classList.contains(constants.ADD_TO_LIBRARY_BUTTON)) {
    handleAddToLibraryButton(event);
  }
  if (event.target.id === constants.LIBRARY_BUTTON) {
    goToLibraryButtonHandler();
  }
  if (event.target.id === constants.GO_TO_LIST_BUTTON) {
    goToListButtonHandler();
  }
  if (event.target.id === constants.SORT_BY_TITLE_BUTTON_TEXT) {
    sortArticlesByTitleHandler();
  }
  if (event.target.id === constants.SORT_BY_DATE_BUTTON_TEXT) {
    sortArticlesByDateHandler();
  }
  if (event.target.classList.contains(constants.IN_LIBRARY)) {
    deleteArticleFromLibraryAndListHandler(event);
  }
};

const sortArticlesByTitleHandler = () => {
  const sortByTitleButton = document.getElementById(
    constants.SORT_BY_TITLE_BUTTON_TEXT
  );
  articlesList.favouritesList = sortListByTitle(sortByTitleButton);
  renderSortedList();
};
const sortArticlesByDateHandler = () => {
  const sortByDateButton = document.getElementById(
    constants.SORT_BY_DATE_BUTTON_TEXT
  );
  articlesList.favouritesList = sortListByDate(sortByDateButton);
  renderSortedList();
};

const handleAddToLibraryButton = (event) => {
  const favouriteButton = event.target;
  if (favouriteButton.getAttribute("flag") === constants.NOT_CLICKED_FLAG) {
    favouriteButton.setAttribute("flag", constants.CLICKED_FLAG);

    const clickedButtonID = event.target.parentNode.id.slice(17);
    const selectedItem = articlesList.articlesList.find(
      (element) => element.id === Number(clickedButtonID)
    );

    articlesList.favouritesList.push(selectedItem);
    window.localStorage.setItem(
      constants.LIBRARY_LIST,
      JSON.stringify(articlesList.favouritesList)
    );
    favouriteButton.innerText = constants.BUTTON_TEXT_DELETE;
  } else {
    favouriteButton.setAttribute("flag", constants.NOT_CLICKED_FLAG);
    const deleteFromFavID = event.target.parentNode.id.slice(17);

    articlesList.favouritesList = articlesList.favouritesList.filter((data) => {
      return data.id !== Number(deleteFromFavID);
    });

    window.localStorage.setItem(
      constants.LIBRARY_LIST,
      JSON.stringify(articlesList.favouritesList)
    );
    favouriteButton.innerText = constants.BUTTON_TEXT_ADD;
  }
};

const deleteArticleFromLibraryAndListHandler = (event) => {
  const deleteFromFavID = event.target.parentNode.id.slice(17);
  articlesList.favouritesList = articlesList.favouritesList.filter(
    (data) => data.id !== deleteFromFavID
  );
  window.localStorage.setItem(
    constants.LIBRARY_LIST,
    JSON.stringify(articlesList.favouritesList)
  );
  event.target.parentNode.remove();
};

const goToListButtonHandler = () => {
  clearBoard();
  renderMainSite();
  articlesList.fetchArticlesList(constants.ARTICLES_LIMIT);
};

const goToLibraryButtonHandler = () => {
  clearBoard();
  renderLibrary();
};

//SCROLL

const fetchOnScroll = () => {
  articlesList.fetchArticlesList(
    document.getElementById(constants.ARTICLES_INPUT).value
  );
};

export const scrollHandler = () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  if (
    scrollTop + clientHeight >= scrollHeight &&
    document.getElementById(constants.ARTICLES_INPUT)
  ) {
    debounce(fetchOnScroll, 1000);
  }
};

const debounce = (method, delay) => {
  clearTimeout(method);
  setTimeout(() => {
    fetchOnScroll();
  }, delay);
};
