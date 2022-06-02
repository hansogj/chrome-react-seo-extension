import { DiscogsActions } from "../../../redux/discogs";
import { uniqueRelease } from "./unique.releases";
import { uniqueSeller } from "./unique.sellers";

const domResolver = (type: DiscogsActions) => {
  if (type === ("DiscogsActions.filterSellers" as any)) {
    return Promise.resolve(uniqueSeller());
  }

  if (type === ("DiscogsActions.filterReleases" as any)) {
    return Promise.resolve(uniqueRelease());
  }
  return Promise.resolve(undefined);
};

export default domResolver;
