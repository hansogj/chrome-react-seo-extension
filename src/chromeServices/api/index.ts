import axios, { AxiosResponse } from "axios";
import maybe from "maybe-for-sure";
import { get, set } from "../local.storage";

const unRest = ({ data }: AxiosResponse) => data;
const serialize = (obj: Record<string, string | number>): string =>
  Object.keys(obj)
    .reduce(
      (a, k) => a.concat(`${k}=${encodeURIComponent(obj[k])}`),
      [] as string[]
    )
    .join("&");

export const fetch = async (resource: string, body?: SearchParams) =>
  axios
    .get(
      maybe(body)
        .orJust({} as SearchParams)
        .map((it) => ({ ...it, token: get("token", "") })) // token to be found in https://www.discogs.com/settings/developers
        .map((it) => serialize(it))
        .map((it) => resource + "?" + it)
        .valueOr(resource)
    )
    .then(unRest);

export function setUserToken(userToken: string): Promise<boolean> {
  set("token", userToken);
  return Promise.resolve(true);
}
