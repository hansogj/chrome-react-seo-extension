import { PostMessage, TitleAndHeadlines } from "../types";
import { fetchArtist } from "./api";

const messagesFromReactAppListener = (
  msg: PostMessage,
  sender: chrome.runtime.MessageSender,
  sendResponse: (response: TitleAndHeadlines) => void
) => {
  console.log("[content.js]. Message received", msg, sender);
  sendResponse({ title: "Henter titler", headlines: [] });
  update();
};

/**
 * Fired when a message is sent from either an extension process or a content script.
 */
chrome.runtime.onMessage.addListener(messagesFromReactAppListener);

const update = () => {
  var port = chrome.runtime.connect({ name: "knockknock" });

  setTimeout(() => {
    const response: TitleAndHeadlines = {
      title: document.title,
      headlines: Array.from(document.getElementsByTagName<"h1">("h1")).map(
        (h1) => h1.innerText
      ),
    };
    console.log("[content.js]. Message response", response);
    port.postMessage(response);
  }, 1000);

  port.onMessage.addListener(({ title, headlines }: TitleAndHeadlines) => {
    console.log(title, headlines);
    if (title === "hent-discogs")
      fetchArtist("").then((results) =>
        port.postMessage({ artist: "Magma", results })
      );
  });
};
