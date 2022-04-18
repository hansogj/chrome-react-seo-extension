import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "./store/reducers";

export default function Posts() {
  const { artist, results } = useSelector((state: RootState) => {
    return state.PostReducer;
  });

  return (
    <div>
      {!artist ? (
        <div className="loader">... Loading posts</div>
      ) : (
        <h1 className="loader">{artist}</h1>
      )}
      <ul>
        {(results || [])
          .filter((_, i) => i < 10)
          .map(({ id, results, uri, title }: any) => (
            <li key={id}>
              <b>{title}</b>
              <br />
              <span>{uri}</span>
              <br />
            </li>
          ))}
      </ul>
    </div>
  );
}
