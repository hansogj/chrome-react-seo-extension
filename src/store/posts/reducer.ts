import {
  GET_TITLES,
  GET_POSTS_SUCCESS,
  GET_POSTS_FAIL,
  GET_POST_DETAILS,
  GET_POST_DETAILS_SUCCESS,
  GET_POST_DETAILS_FAIL,
  GET_ARTIST,
} from "./actionTypes";

export interface PostState {
  posts: any[];
  post: any;
  loadingPosts: boolean;
  loadingPostDetails: boolean;
  title: string;
  artist: string;
  results: [];
  headlines: string[];
  error: {
    message: string;
  };
}
const initialState: PostState = {
  posts: [],
  post: {},
  loadingPosts: false,
  loadingPostDetails: false,
  error: {
    message: "",
  },
  title: "",
  headlines: [],
  artist: "",
  results: [],
};

const PostReducer = (state = initialState, action: any): PostState => {
  switch (action.type) {
    case GET_ARTIST:
      state = {
        ...state,
        loadingPosts: false,
        artist: action.artist,
        results: action.results,
      };
      break;
    case GET_TITLES:
      state = {
        ...state,
        loadingPosts: false,
        title: action.title,
        headlines: action.headlines,
      };
      break;
    case GET_POSTS_SUCCESS:
      state = { ...state, posts: action.payload, loadingPosts: false };
      break;
    case GET_POSTS_FAIL:
      state = {
        ...state,
        error: {
          message: "Error",
        },
        loadingPosts: false,
      };
      break;
    case GET_POST_DETAILS:
      state = { ...state, loadingPostDetails: true };
      break;
    case GET_POST_DETAILS_SUCCESS:
      state = { ...state, post: action.payload[0], loadingPostDetails: false };
      break;
    case GET_POST_DETAILS_FAIL:
      state = {
        ...state,
        error: {
          message: "Error",
        },
        loadingPostDetails: false,
      };
      break;
    default:
      state = { ...state };
      break;
  }
  return state;
};

export default PostReducer;
