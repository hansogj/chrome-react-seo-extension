import { DiscogsActions } from "../../../redux/discogs";
import { uniqueRelease } from "./unique.releases";
import { uniqueSeller } from "./unique.sellers";

const domResolver = (type: DiscogsActions) => {
  if (type === DiscogsActions.filterSellers) {
    return Promise.resolve(uniqueSeller());
  }

  if (type === DiscogsActions.filterReleases) {
    return Promise.resolve(uniqueRelease());
  }
  return Promise.resolve(undefined);
};

export default domResolver;
