import { Artist, ArtistResult, Folder, User } from "../../api/domain";
import { ActionTypes } from "../types";

export type Error = { message: string };

export interface DiscogsState {
  readonly artist: Artist;
  readonly artistResult: ArtistResult[];
  readonly error?: Error;
  readonly folders: Array<Folder>;
  readonly user?: User;
}

export interface DiscogsActionData {
  artist: Optional<Artist>;
  artistResult: Optional<ArtistResult[]>;
  error: Optional<Error>;
  folders: Optional<Array<Folder>>;
  user: Optional<User>;
}

/* 
export type DiscogsUserActionType = Action<DiscogsAction> &
  Pick<DiscogsState, "user">;
export type DiscogsArtistActionType = Action<DiscogsAction> &
  Pick<DiscogsState, "artist" | "artistResult">;
export type DiscogsFolderActionType = Action<DiscogsAction> &
  Pick<DiscogsState, "folders">;

export type DiscogsActionType =
  | Action<DiscogsAction>
  | DiscogsUserActionType
  | DiscogsFolderActionType
  | DiscogsArtistActionType;

export type DiscogsActionProducer = Action<DiscogsAction> &
  DiscogsUserActionType &
  DiscogsFolderActionType &
  DiscogsArtistActionType; */

export enum DiscogsActions {
  getArtist = "GET_ARTIST",
  getArtistSuccess = "GET_ARTIST_SUCCESS",
  getArtistFailed = "GET_ARTIST_FAILED",

  getUser = "GET_USER",
  getUserSuccess = "GET_USER_SUCCESS",
  getUserFailed = "GET_USER_FAILED",

  getFolders = "GET_FOLDERS",
  getFoldersSuccess = "GET_FOLDERS_SUCCESS",
  getFoldersFailed = "GET_FOLDERS_FAILED",
}

export type DiscogsActionTypes = ActionTypes<DiscogsActions, DiscogsActionData>;