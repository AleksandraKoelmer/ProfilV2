import { renderMainSite } from "./renderFunctions.js";
import { ArticlesList } from "./ArticlesList.js";
import { constants } from "./constants.js";
import { setEventsListeners } from "./eventListeners.js";

export const articlesList = new ArticlesList();
renderMainSite();
articlesList.refreshDataFromLocalStorage();
articlesList.fetchArticlesList(constants.ARTICLES_LIMIT);
setEventsListeners();
