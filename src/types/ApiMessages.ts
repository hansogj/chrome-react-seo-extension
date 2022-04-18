import { GET_ARTIST, GET_TITLES } from "../store/posts/actionTypes";

export type GetTitleRequest = {
  type: typeof GET_TITLES;
};

export type GetArtistRequest = {
  type: typeof GET_ARTIST;
  artist: string;
};

export type TitleAndHeadlines = {
  title: string;
  headlines: string[];
};

export type DiscogsArtist = {
  artist: string;
  results: string[];
};

export type PostMessage = GetArtistRequest | GetTitleRequest;
