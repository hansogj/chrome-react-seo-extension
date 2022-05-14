import maybe from "maybe-for-sure";
import { Release, ReleaseInView } from "../../domain";
import { DISCOGS_BASE_URL } from "../../redux/app";
import * as api from "./api";

export const masterRelease = (
  url = window.location.href
): Promise<ReleaseInView> => {
  const releaseId = maybe(url.split(/(\/release\/)|(\/master\/)/))
    .map((it) => it.pop())
    .nothingIf((it) => it === undefined)
    .map((it) => `${it}`.split("-").shift())
    .map((it) => parseInt(it!, 10))
    .valueOr(undefined);

  return releaseId
    ? api
        .fetch([DISCOGS_BASE_URL, "releases", releaseId].join("/"))
        .then(({ master_url, ...rest }: Release) =>
          master_url ? api.fetch(master_url) : rest
        )
        .then((master) => ({ master, releaseId }))
    : Promise.reject(undefined);
};
