import React from 'react';

import { connect } from '../../store';
import SearchHandle from '../molecules/SearchHandle';
import NoQuery from '../molecules/NoQuery';
import Results from '../organisms/Results';
import style from '../App.module.css';

class Search extends React.Component {
  componentDidMount() {
    const { query, results, dispatchSearch } = this.props;
    if (query && !results.length) dispatchSearch(query);
  }

  handleChange = ({ target: { value } }) => {
    const { dispatchSearch } = this.props;
    dispatchSearch(value);
  };

  handleKeyDown = ({ keyCode }) => {
    if (keyCode !== 13) return; // do nothing unless ENTER

    const { dispatchSelect, results } = this.props;
    const result = results[0];
    if (result) dispatchSelect(result);
  };

  render() {
    const { query, isFetchingResults } = this.props;

    return (
      <>
        <div className="card-header">
          <div className="input-group">
            <div className="input-group-prepend">
              <span className="input-group-text">
                <SearchHandle
                  isFetchingResults={isFetchingResults}
                  query={query}
                />
              </span>
            </div>

            <input
              type="text"
              className="form-control"
              placeholder="Type for search..."
              autoFocus
              value={query}
              onChange={this.handleChange}
              onKeyDown={this.handleKeyDown}
            />
          </div>
        </div>

        <div className={style.content}>
          {query.trim() === '' ? <NoQuery /> : <Results />}
        </div>
      </>
    );
  }
}

export default connect()(Search);
