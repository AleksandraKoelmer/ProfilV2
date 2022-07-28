import { buttonsHandler, scrollHandler } from "./eventHandlers.js";
import { constants } from "./constants.js";
import { articlesList } from "./main.js";

export const setEventsListeners = () => {
  window.addEventListener("click", (event) => {
    buttonsHandler(event);
  });

  document
    .getElementById(constants.ARTICLES_INPUT)
    .addEventListener("keydown", (event) => {
      if (event.code === "Enter") {
        articlesList.fetchArticlesList(
          Number(document.getElementById(constants.ARTICLES_INPUT).value)
        );
      }
    });

  window.addEventListener(
    "scroll",
    () => {
      scrollHandler();
    },
    {
      passive: true,
    }
  );
};
