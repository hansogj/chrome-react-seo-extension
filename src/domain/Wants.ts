export type WantList = Record<BasicInformation["master_id"], WantListItem>;

export interface WantListItem
  extends Pick<
    BasicInformation,
    | "master_url"
    | "artists"
    | "thumb"
    | "title"
    | "year"
    | "cover_image"
    | "formats"
  > {}

export interface PaginatedWantList {
  pagination: Pagination;
  wants: Want[];
}

export interface Pagination {
  page: number;
  pages: number;
  per_page: number;
  items: number;
  urls: Urls;
}

export interface Urls {
  first: string;
  last: string;
  prev: string;
  next: string;
}

export interface Want {
  id: number;
  resource_url: string;
  rating: number;
  date_added: Date;
  basic_information: BasicInformation;
}

export interface BasicInformation {
  id: number;
  master_id: number;
  master_url: string;
  resource_url: string;
  title: string;
  year: number;
  formats: Format[];
  labels: Label[];
  artists: Artist[];
  thumb: string;
  cover_image: string;
  genres: string[];
  styles: string[];
}

export interface Artist {
  name: string;
  anv: string;
  join: string;
  role: string;
  tracks: string;
  id: number;
  resource_url: string;
}

export interface Format {
  name: string;
  qty: string;
  descriptions: string[];
}

export interface Label {
  name: string;
  catno: string;
  entity_type: string;
  entity_type_name: string;
  id: number;
  resource_url: string;
}
