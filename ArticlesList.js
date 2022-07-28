import { constants } from "./constants.js";
import { renderCounter, renderSiteContent } from "./renderFunctions.js";

export class ArticlesList {
  articlesList;
  numberOfArticles;
  favouritesList;
  displayedArticles;
  constructor() {
    this.articlesList = [];
    this.numberOfArticles = 0;
    this.favouritesList = [];
    this.displayedArticles = 0;
  }
  refreshDataFromLocalStorage = () => {
    if (window.localStorage.getItem(constants.LIBRARY_LIST) != null)
      try {
        //prevent for adding null at beginning
        this.favouritesList = JSON.parse(
          window.localStorage.getItem(constants.LIBRARY_LIST)
        );
      } catch (error) {
        document.getElementById(constants.SITE_CONTAINER).innerHTML =
          constants.ERROR_MESSAGE;
      }
  };

  fetchArticlesList = (numberOfFetchedArticles) => {
    const previousNumberOfDisplayedArticles = this.articlesList.length;
    const fetchNumberOfArticles = fetch(constants.ARTICLES_COUNT)
      .then((res) => res.json())

      .catch(() => {
        document.getElementById(constants.SITE_CONTAINER).innerHTML =
          constants.ERROR_MESSAGE;
      });
    const fetchArticles = fetch(
      constants.ARTICLES_URL +
        numberOfFetchedArticles +
        constants.ARTICLES_URL_CONNECTOR +
        this.articlesList.length
    )
      .then((res) => res.json())
      .catch(() => {
        document.getElementById(constants.SITE_CONTAINER).innerHTML =
          constants.ERROR_MESSAGE;
      });
    const articles = Promise.all([fetchArticles, fetchNumberOfArticles]);
    articles.then((res) => {
      this.articlesList = [...this.articlesList, ...res[0]];
      this.numberOfArticles = res[1];

      const actualNumberOfDisplayedArticles = this.articlesList.length;
      renderSiteContent(
        previousNumberOfDisplayedArticles,
        actualNumberOfDisplayedArticles
      );
      renderCounter();
    });
  };
}
