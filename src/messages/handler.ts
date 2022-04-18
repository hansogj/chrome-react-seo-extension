import { getArtist, getTitles } from "../store/posts/actions";
import { PostMessage, TitleAndHeadlines } from "../types";
import store from "../store/index";
import * as api from "../chromeServices/api";
import { GET_ARTIST, GET_TITLES } from "../store/posts/actionTypes";
import { getAllByDisplayValue } from "@testing-library/react";

let queryOptions = { active: true, currentWindow: true };

type Response = any;

const getCurrentTab = (): Promise<chrome.tabs.Tab> =>
  chrome && chrome.tabs && chrome.tabs.query
    ? chrome.tabs.query(queryOptions).then(([tab]) => tab)
    : Promise.reject();

const dispatcher = (response: Response) => {
  console.log(response);
  if (response && !!response.title)
    store.dispatch(getTitles(response.title, response.headlines));
  if (response && !!response.artist)
    store.dispatch(getArtist(response.artist, response.results));
};

const addListener = (myTabId?: number) =>
  chrome.runtime.onMessage.addListener(dispatcher);

const sendMessage = (id = 0, body: PostMessage): Promise<Response> =>
  new Promise((resolve, reject) =>
    chrome.tabs.sendMessage(id, body, (response: Response) => resolve(response))
  );

export const getFolder = async () => {
  getCurrentTab()
    .then(({ id }) => {
      sendMessage(id, { type: "GET_FOLDERS" } as any).then((e) =>
        console.log(e)
      );
    })

    .catch(() =>
      api.fetchFolders().then((e) => {
        console.log(e);
      })
    );
};

export const connect = async () => {
  getCurrentTab()
    .then(({ id }) => {
      addListener(id);
      setTimeout(() => {
        sendMessage(id, { type: GET_TITLES }).then(dispatcher);
      }, 7000);

      setTimeout(() => {
        sendMessage(id, { type: GET_ARTIST, artist: "Magma" }).then(dispatcher);
      }, 5000);
    })
    .catch(() => {
      console.log("call api direct");
      api
        .fetchArtist("Magma")
        .then((results) => store.dispatch(getArtist("Magma", results)));

      store.dispatch(getTitles("Some Page Title", ["many ", "headlines"]));
    });
};
