import { WantListItem } from "../../../domain";
export type Item = [string, WantListItem];

type CompareFn = (a: Item, b: Item) => number;
export interface SortMethods {
  Name: CompareFn;
  "Name (rev)": CompareFn;
  Year: CompareFn;
  "Year (rev)": CompareFn;
  added: CompareFn;
  "Added (rev)": CompareFn;
}

const sort = (a: any, b: any) => {
  if (a < b) {
    return -1;
  }
  if (a > b) {
    return 1;
  }

  return 0;
};

export const byName = ([_, a]: Item, [__, b]: Item) =>
  sort(a.artists[0].name, b.artists[0].name);

export const byNameRev = ([_, a]: Item, [__, b]: Item) =>
  sort(b.artists[0].name, a.artists[0].name);

export const byReleaseYear = ([_, a]: Item, [__, b]: Item) =>
  sort(a.year, b.year);

export const byReleaseYearRev = ([_, a]: Item, [__, b]: Item) =>
  sort(b.year, a.year);

export const byAdded = ([_, a]: Item, [__, b]: Item) =>
  sort(new Date(a.date_added).getTime(), new Date(b.date_added).getTime());

export const byAddedReverse = ([_, a]: Item, [__, b]: Item) =>
  sort(new Date(b.date_added).getTime(), new Date(a.date_added).getTime());

export const sortMethods: SortMethods = {
  Name: byName,
  "Name (rev)": byNameRev,
  Year: byReleaseYear,
  "Year (rev)": byReleaseYearRev,
  added: byAdded,
  "Added (rev)": byAddedReverse,
};

export type SortMethod = keyof SortMethods;
