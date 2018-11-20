import React from 'react';

const NoResults = () => (
  <div className="text-center overflow-hidden my-3 p-3">
    <h4 className="display-5">Oops</h4>

    <p className="lead font-weight-normal">
      your query did not return a result. Please try again with something else.
    </p>
  </div>
);

export default NoResults;
