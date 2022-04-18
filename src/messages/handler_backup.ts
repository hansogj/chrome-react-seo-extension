import { getArtist, getTitles } from "../store/posts/actions";
import { PostMessage, TitleAndHeadlines } from "../types";
import store from "../store/index";
import { fetchArtist } from "../chromeServices/api";

async function getCurrentTab() {
  let queryOptions = { active: true, currentWindow: true };
  let [tab] = await chrome.tabs.query(queryOptions);
  return tab;
}

function addListener(myTabId?: number) {
  chrome.runtime.onMessage.addListener(function ({ title }: TitleAndHeadlines) {
    store.dispatch(getTitles(title, ["ventemelding"]));
  });
}

const openConnection = (id = 0) =>
  chrome.tabs.sendMessage(
    id,
    // @ts-ignore
    { type: "GET_DOM" } as PostMessage,
    (response: TitleAndHeadlines) =>
      response && response.title
        ? store.dispatch(getTitles(response.title, response.headlines))
        : store.dispatch(getArtist("discogs", (response as any).results))
  );

const addConnection = () => {
  chrome.runtime.onConnect.addListener((port) => {
    port.onMessage.addListener(
      ({ title, headlines, ...rest }: TitleAndHeadlines) => {
        store.dispatch(getTitles(title, headlines));
        // @ts-ignore
        if (!rest.artist)
          setTimeout(() => {
            port.postMessage({ title: "hent-discogs" });
          }, 3000);
      }
    );
  });
};

export const connect = async () => {
  try {
    const { id } = await getCurrentTab();
    addListener(id);
    setTimeout(() => {
      openConnection(id);
      addConnection();
    }, 500);
  } catch (e) {
    console.log("call api direct");
    // @ts-ignore
    fetchArtist("").then((headlines) =>
      store.dispatch(getArtist("Magma", headlines))
    );

    store.dispatch(getTitles("Some Page Title", ["many ", "headlines"]));
  }
};
