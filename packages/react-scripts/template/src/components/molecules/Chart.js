import React from 'react';
import Highcharts from 'highcharts/highstock';
import Exporting from 'highcharts/modules/exporting';

import { connect } from '../../store';

Exporting(Highcharts);

const createChart = ({ el, timeseries, selected }) =>
  Highcharts.stockChart(el, {
    exporting: { enabled: false },
    rangeSelector: { inputEnabled: false },
    scrollbar: { enabled: false },
    credits: { enabled: false },

    series: [
      {
        name: `${selected.symbol}, Stock Price (${selected.currency})`,
        data: timeseries,
        type: 'candlestick',
      },
    ],
  });

class Chart extends React.Component {
  chartRef = React.createRef();

  componentDidMount() {
    const { timeseries, selected } = this.props;

    this.chart = createChart({
      el: this.chartRef.current,
      timeseries,
      selected,
    });
  }

  shouldComponentUpdate() {
    return false;
  }

  componentWillUnmount() {
    if (this.chart) this.chart.destroy();
  }

  render() {
    return <div ref={this.chartRef} />;
  }
}

export default connect()(Chart);
