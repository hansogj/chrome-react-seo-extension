import { PaginatedWantList, Want } from "../../domain";
import { fetch } from "./api";
import { get, set } from "./local.storage";

export type Cache = Record<string, Object>;

const toWantList = (wants: Want[]) =>
  wants
    .map(({ basic_information }) => basic_information)
    .map(
      ({
        master_id,
        master_url,
        artists,
        formats,
        thumb,
        cover_image,
        title,
        year,
      }) => ({
        master_id,
        master_url,
        artists,
        thumb,
        title,
        year,
        cover_image,
        formats: formats.filter((_, i) => i === 0),
      })
    );

const wantListService = () => {
  const cachedValues: Cache = get("want-list", {});

  const call = async (url: string, page = 1, cache: Cache): Promise<Cache> => {
    const { pagination, wants }: PaginatedWantList = await fetch(url, {
      page,
      per_page: 50,
    });

    const build: Cache = toWantList(wants)
      .filter(({ master_id }) => !!master_id && !cachedValues[master_id])

      .reduce((curr, { master_id, ...rest }) => {
        try {
          curr[master_id] = rest;
        } catch (error) {
          debugger;
        }
        return curr;
      }, cache);

    console.log(build);

    return pagination.page < pagination.pages
      ? call(url, pagination.page + 1, build)
      : build;
  };

  const sync = async (url: string, page = 1) => {
    console.time();
    const res = await call(url, page, {});
    console.timeEnd();
    set("want-list", res);
    return Promise.resolve(res);
  };

  return {
    get: () => Promise.resolve(cachedValues),
    sync,
  };
};

export default wantListService;
