import axios, { AxiosResponse } from "axios";
import { get } from "../local.storage";

const token = get("token", ""); // to be found in https://www.discogs.com/settings/developers

const serialize = (obj: Record<string, string | number>): string =>
  Object.keys(obj)
    .reduce(
      (a, k) => a.concat(`${k}=${encodeURIComponent(obj[k])}`),
      [] as string[]
    )
    .join("&");

const unRest = ({ data }: AxiosResponse) => data;
export const fetch = async (resource: string, body?: SearchParams) =>
  axios.get(`${resource}?${serialize({ token, ...body })}`).then(unRest);
