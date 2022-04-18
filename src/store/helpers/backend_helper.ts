// src/helpers/backend_helper.js

import { get } from "./api_helper";
import * as url from "./url_helper";

//Post
export const getPosts = (): Promise<Record<string, unknown>> =>
  get(url.GET_POSTS, undefined);

//Post
export const getPostDetails = (id: string): Promise<Record<string, unknown>> =>
  get(url.GET_POST_DETAILS, {
    params: {
      id: id,
    },
  });
