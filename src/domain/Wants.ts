import { Artist, Format, Pagination } from "./div";

export type WantList = Record<BasicInformation["master_id"], WantListItem>;

export interface WantListItem
  extends Pick<Want, "date_added">,
    Pick<
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

export interface Label {
  name: string;
  catno: string;
  entity_type: string;
  entity_type_name: string;
  id: number;
  resource_url: string;
}
