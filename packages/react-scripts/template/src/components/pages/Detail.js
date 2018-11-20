import React from 'react';

import { connect } from '../../store';
import PageSpinner from '../molecules/PageSpinner';
import ChartError from '../molecules/ChartError';
import Chart from '../molecules/Chart';
import style from '../App.module.css';

class Detail extends React.Component {
  componentDidMount() {
    const { selected, isFetchingTimeseries, dispatchSelect } = this.props;

    if (!isFetchingTimeseries) dispatchSelect(selected);
  }

  render() {
    const {
      selected,
      isFetchingTimeseries,
      dispatchIsEditing,
      timeseries,
    } = this.props;

    const showChart = !isFetchingTimeseries && timeseries.length > 0;
    const showError = !isFetchingTimeseries && timeseries.length === 0;

    return (
      <>
        <h5 className="card-header text-truncate">
          <button
            type="button"
            className="btn btn-link text-secondary mr-2"
            onClick={dispatchIsEditing}
          >
            <i className="material-icons">settings</i>
          </button>
          {selected.symbol}, {selected.name}
        </h5>

        <div className={`d-flex flex-column ${style.content}`}>
          {isFetchingTimeseries && <PageSpinner />}
          {showError && <ChartError />}
          {showChart && <Chart />}
        </div>
      </>
    );
  }
}

export default connect()(Detail);
