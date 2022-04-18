import React from "react";
import { useSelector } from "react-redux";
import "./App.scss";
import { connect } from "./messages/handler";
import { RootState } from "./store/reducers";

function App() {
  const { title, headlines } = useSelector(
    (state: RootState) => state.PostReducer
  );

  React.useEffect(() => {
    connect();
  }, []);

  return (
    <div className="App">
      <h1>SEO Extension built with React!</h1>

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
          <div className="SEOVAlidationFieldValue">{title}</div>
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
