// src/store/posts/actionTypes.js

import {
  GET_TITLES,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_POST_DETAILS,
  GET_POST_DETAILS_SUCCESS,
  GET_POST_DETAILS_FAIL,
  GET_ARTIST,
} from "./actionTypes";

export const getTitles = (title: string, headlines: string[]) => {
  return {
    type: GET_TITLES,
    title,
    headlines,
  };
};

export const getArtist = (artist: string, results: string[]) => {
  return {
    type: GET_ARTIST,
    artist,
    results,
  };
};

export const getPostsSuccess = (posts: unknown) => {
  return {
    type: GET_POSTS_SUCCESS,
    payload: posts,
  };
};

export const getPostsFail = (error: unknown) => {
  return {
    type: GET_POSTS_FAIL,
    payload: error,
  };
};

export const getPostDetails = (id: unknown) => {
  return {
    type: GET_POST_DETAILS,
    payload: id,
  };
};

export const getPostDetailsSuccess = (post: unknown) => {
  return {
    type: GET_POST_DETAILS_SUCCESS,
    payload: post,
  };
};

export const getPostDetailsFail = (error: unknown) => {
  return {
    type: GET_POST_DETAILS_FAIL,
    payload: error,
  };
};
