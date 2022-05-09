import maybe from "maybe-for-sure";
import { MasterRelease, Release } from "../../domain";

import { DISCOGS_BASE_URL } from "../../redux/app";
import * as api from "./api";

export const masterRelease = (
  url = window.location.href
): Promise<MasterRelease> => {
  const release_url = maybe(url.split(/(\/release\/)|(\/master\/)/))
    .map((it) => it.pop())
    .nothingIf((it) => it === undefined)
    .map((it) => `${it}`.split("-").shift())
    .map((it) => [DISCOGS_BASE_URL, "releases", it].join("/"))
    .valueOr(undefined);

  return release_url
    ? api
        .fetch(release_url)
        .then(({ master_url }: Release) => api.fetch(master_url))
    : Promise.reject(undefined);
};
