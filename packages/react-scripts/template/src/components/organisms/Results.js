import React from 'react';

import { connect } from '../../store';
import NoResults from '../molecules/NoResults';

const Results = ({ results, dispatchSelect }) => (
  <>
    {results.length === 0 && <NoResults />}

    <ul className="list-group list-group-flush">
      {results.map((result, id) => (
        <button
          type="button"
          className="list-group-item list-group-item-action"
          onClick={() => dispatchSelect(result)}
          key={id}
        >
          <div className="text-truncate">
            {result.symbol}, {result.name}
          </div>
          <small>
            {result.region} ({result.marketOpen} - {result.marketClose})
          </small>
        </button>
      ))}
    </ul>
  </>
);

export default connect()(Results);
