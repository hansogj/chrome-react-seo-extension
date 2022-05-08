import axios, { AxiosResponse } from "axios";
import maybe from "maybe-for-sure";
import { get, set } from "../local.storage";

const equals = (a: Object, b: Object) =>
  JSON.stringify(a, null, 0) !== JSON.stringify(b, null, 0);
const empty = (obj: Object) => equals(obj, {});

const unRest = ({ data }: AxiosResponse) => data;
const serialize = (obj: Record<string, string | number>): string =>
  Object.keys(obj)
    .reduce(
      (a, k) => a.concat(`${k}=${encodeURIComponent(obj[k])}`),
      [] as string[]
    )
    .join("&");

export const fetch = async (resource: string, body?: SearchParams) => {
  const cache = get("cache", {});
  const url = maybe(body)
    .orJust({} as SearchParams)

    .map((it) => {
      const token = get("token", {});
      return { ...it, ...(empty(token) && { token }) };
    }) // token to be found in https://www.discogs.com/settings/developers
    .map((it) => serialize(it))
    .map((it) => (it ? `${resource}?${it}` : resource))
    .valueOr(resource);
  return (
    cache[url] || axios.get(url).then(unRest)
    //      .then((result) => set("cache", { ...cache, [url]: result })[url])
  );
};

export const setUserToken = (userToken: string): Promise<boolean> =>
  Promise.resolve(!!set("token", userToken));
