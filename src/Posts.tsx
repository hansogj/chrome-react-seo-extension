import React from "react";

import { useSelector } from "react-redux";
import { RootState } from "./redux";

export default function Posts() {
  const { folders, artist, artistResult, user } = useSelector(
    (state: RootState) => {
      return state.Discogs;
    }
  );

  return (
    <div>
      {!artist ? (
        <div className="loader">... Loading posts</div>
      ) : (
        <h1 className="loader">{artist}</h1>
      )}
      <hr />
      <h1>USER</h1>
      <pre>
        <code>{JSON.stringify(user, null, 4)}</code>
      </pre>
      <hr />

      <ul>
        {(artistResult || [])
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
      {JSON.stringify(folders)}
    </div>
  );
}
