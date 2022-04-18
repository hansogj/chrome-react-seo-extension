import { call, put, takeLatest } from "redux-saga/effects";
import { getFolder } from "../../messages/handler";
import { getPosts } from "../helpers/backend_helper";
import { getPostsFail, getPostsSuccess } from "./actions";
import { GET_ARTIST, GET_TITLES } from "./actionTypes";

function* onGetTitlesOrArtists() {
  try {
    // @ts-ignore
    const response = yield call(getPosts);
    getFolder();
    yield put(getPostsSuccess(response));
  } catch (error) {
    yield put(getPostsFail((error as any).response));
  }
}

function* CartSaga() {
  yield takeLatest(GET_TITLES, onGetTitlesOrArtists);
  yield takeLatest(GET_ARTIST, onGetTitlesOrArtists);
}

export default CartSaga;
