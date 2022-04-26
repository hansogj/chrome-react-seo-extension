import React from "react";
import { useSelector } from "react-redux";
import "./App.scss";
import { store } from "./redux/store";
import { getFolders, getUser } from "./redux/discogs/discogs.actions";
import { action, RootState } from "./redux";

function App() {
  const { artist } = useSelector((state: RootState) => state.Discogs);

  const fetchFolders = () => {
    action(getUser());
  };

  return (
    <div className="App">
      <h1>SEO Extension built with React!</h1>
      <button onClick={fetchFolders}>Fetch folders</button>

      <ul className="SEOForm">
        <li className="SEOValidation">
          <div className="SEOValidationField">
            <span className="SEOValidationFieldTitle">Title</span>
            {/*  <span
              className={`SEOValidationFieldStatus ${
                title?.length < 30 || title?.length > 65 ? "Error" : "Ok"
              }`}
            >
              {title?.length} Characters
            </span> */}
          </div>
          <div className="SEOVAlidationFieldValue">{artist}</div>
        </li>

        <li className="SEOValidation">
          <div className="SEOValidationField">
            <span className="SEOValidationFieldTitle">Main Heading</span>
            {/* <span
              className={`SEOValidationFieldStatus ${
                headlines?.length !== 1 ? "Error" : "Ok"
              }`}
            >
              {headlines?.length}
            </span> */}
          </div>
          <div className="SEOVAlidationFieldValue">
            {/* <ul>
              {headlines?.map((headline, index) => (
                <li key={index}>{headline}</li>
              ))}
            </ul> */}
          </div>
        </li>
      </ul>
    </div>
  );
}

export default App;
