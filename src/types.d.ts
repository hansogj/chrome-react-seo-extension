declare module "*.png";
declare module "*.svg";
declare type Fn<H, T> = (..._: H) => T;
type Optional<T> = T | undefined;

interface Hash<T> {
  [key: string]: T;
}

type TypedRecord<K, T> = {
  [P in keyof K]: T;
};