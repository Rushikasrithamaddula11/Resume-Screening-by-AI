import React from "react";

const Results = ({ score }) => {
  return (
    <div className="results">
      <h2>Resume Relevance Score</h2>
      <p>Relevance Score: {score.toFixed(2)}</p>
      <div>
        {score > 0.8 ? (
          <p style={{ color: "green" }}>Highly relevant</p>
        ) : score > 0.5 ? (
          <p style={{ color: "orange" }}>Moderately relevant</p>
        ) : (
          <p style={{ color: "red" }}>Low relevance</p>
        )}
      </div>
    </div>
  );
};

export default Results;
