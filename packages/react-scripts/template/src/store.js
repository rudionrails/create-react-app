import React, { Children } from 'react';
import debounce from 'lodash.debounce';

import api from './api';

// const selected = {
//   symbol: 'SON',
//   name: 'Sonoco Products Company',
//   type: 'Equity',
//   region: 'United States',
//   marketOpen: '09:30',
//   marketClose: '16:00',
//   timezone: 'UTC-05',
//   currency: 'USD',
//   matchScore: '1.0000',
// }

const stripLeadingNumber = string => string.replace(/^\d\.\s*/, '');
const sanitize = object =>
  Object.entries(object).reduce(
    (acc, [key, value]) => ({ ...acc, [stripLeadingNumber(key)]: value }),
    {}
  );
const formatResults = results => results.slice(0, 6).map(sanitize);
const formatTimeseries = timeseries =>
  Object.entries(timeseries)
    .map(([date, value]) => {
      const { open, high, low, close } = sanitize(value);

      return [
        Date.parse(date), // '2018-11-16'
        Number(open),
        Number(high),
        Number(low),
        Number(close),
      ];
    })
    .sort(
      (a, b) => a[0] - b[0] // epoch date is the first element
    );

const StoreContext = React.createContext({});

export const connect = () => WrappedComponent => props => (
  <StoreContext.Consumer>
    {store => <WrappedComponent {...store} {...props} />}
  </StoreContext.Consumer>
);

export class StoreProvider extends React.Component {
  state = {
    query: '',
    results: [],
    selected: null,
    timeseries: [],

    isEditing: true,
    isFetchingResults: false,
    isFetchingTimeseries: false,

    dispatchSearch: query => this.handleSearch(query),
    dispatchSelect: selected => this.handleSelect(selected),
    dispatchIsEditing: (isEditing = true) => this.setState({ isEditing }),
  };

  search = debounce(
    query =>
      api
        .search(query)
        .then(results => this.setState({ results: formatResults(results) }))
        .finally(() => this.setState({ isFetchingResults: false })),
    250
  );

  handleSearch = query => {
    this.setState(state => ({
      isFetchingResults: true,
      query,
    }));

    this.search(query);
  };

  handleSelect = selected => {
    if (selected === this.state.selected) {
      this.setState(state => ({ isEditing: false }));
      return;
    }

    this.setState(state => ({
      isEditing: false,
      isFetchingTimeseries: true,
      selected,
    }));

    api
      .daily(selected.symbol)
      .then(timeseries =>
        this.setState({ timeseries: formatTimeseries(timeseries) })
      )
      .finally(() => this.setState({ isFetchingTimeseries: false }));
  };

  render() {
    const { children } = this.props;

    return (
      <StoreContext.Provider value={this.state}>
        {Children.only(children)}
      </StoreContext.Provider>
    );
  }
}
