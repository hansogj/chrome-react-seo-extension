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

const mergeWithToken = (it: SearchParams) => {
  const token = get("token", {}); // token to be found in https://www.discogs.com/settings/developers
  return { ...it, ...(empty(token) && { token }) };
};

const url = (resource: string, params?: SearchParams) => {
  return maybe(params)
    .orJust({} as SearchParams)
    .map(mergeWithToken)
    .map((it) => serialize(it))
    .map((it) => (it ? `${resource}?${it}` : resource))
    .valueOr(resource);
};

export const fetch = async (resource: string, params?: SearchParams) =>
  axios.get(url(resource, params)).then(unRest);

export const post = async (
  resource: string,
  paramsAndPayload?: SearchParams & PayLoad
) => {
  const { payLoad, ...body } = maybe(
    paramsAndPayload as SearchParams & PayLoad
  ).valueOr({ payLoad: undefined });
  return axios.post(url(resource, body as SearchParams), payLoad).then(unRest);
};

export const setUserToken = (userToken: string): Promise<boolean> =>
  Promise.resolve(!!set("token", userToken));