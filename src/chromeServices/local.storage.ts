/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import packageJson from "../../package.json";
import maybe from "maybe-for-sure";

type StorageKeys = "token";

const { name } = packageJson;

const parse = (val: unknown) => {
  try {
    return JSON.parse(val as string);
  } catch (error) {
    return val;
  }
};
export const set = (key: StorageKeys, val: any): typeof val => {
  window?.localStorage?.setItem(`${name}-${key}`, JSON.stringify(val, null, 2));
  return val;
};

export const get = <T>(key: StorageKeys, or?: T): any =>
  maybe(window?.localStorage?.getItem)
    .map(() => window?.localStorage?.getItem(`${name}-${key}`))
    .nothingIf((it) => [undefined, null, ""].some((filter) => filter === it))
    .orJust(JSON.stringify(!or ? ({} as T) : or, null, 2))
    .map(parse)
    .valueOr(undefined) as T;
