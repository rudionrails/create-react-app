import { stringify } from 'query-string';

// The overall API documentation can be found here:
//    https://www.alphavantage.co/documentation
const apikey = 'demo';

const { fetch } = window;
const stripLeadingNumber = string => string.replace(/^\d\.\s*/, '');
const sanitize = object =>
  Object.entries(object).reduce(
    (acc, [key, value]) => ({ ...acc, [stripLeadingNumber(key)]: value }),
    {}
  );

// The API response has this shape (as of 2018-11)
//
//  GET https://www.alphavantage.co/query?function=SYMBOL_SEARCH&keywords=xiaomi&apikey=demo
//
//  {
//    "bestMatches": [
//      {
//        "1. symbol": "LTGJ",
//        "2. name": "Xiamen Lutong International Travel Agency Co. Ltd.",
//        "3. type": "Equity",
//        "4. region": "United States",
//        "5. marketOpen": "09:30",
//        "6. marketClose": "16:00",
//        "7. timezone": "UTC-05",
//        "8. currency": "USD",
//        "9. matchScore": "0.2857"
//      },
//      { ... },
//    ],
//  }
function search(keywords) {
  const params = stringify({ function: 'SYMBOL_SEARCH', apikey, keywords });

  return fetch(`https://www.alphavantage.co/query?${params}`)
    .then(response => response.json())
    .then(json => (json.bestMatches || []).map(sanitize));
}

// The API response has this shape (as of 2018-11)
//
//  GET https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=MSFT&apikey=demo
//
//  {
//    "Meta Data": {
//      "1. Information": "Daily Prices (open, high, low, close) and Volumes",
//      "2. Symbol": "MSFT",
//      "3. Last Refreshed": "2018-11-14",
//      "4. Output Size": "Compact",
//      "5. Time Zone": "US/Eastern"
//     },
//    "Time Series (Daily)": {
//      "2018-11-14": {
//        "1. open": "108.1000",
//        "2. high": "108.2600",
//        "3. low": "104.4700",
//        "4. close": "104.9700",
//        "5. volume": "39451205"
//      },
//      "2018-11-13": {
//        ...
//      },
//    },
//  }
function daily(symbol) {
  const params = stringify({ function: 'TIME_SERIES_DAILY', apikey, symbol });

  return fetch(`https://www.alphavantage.co/query?${params}`)
    .then(response => response.json())
    .then(json =>
      Object.entries(json['Time Series (Daily)'] || {}).reduce(
        (acc, [key, value]) => ({ ...acc, [key]: sanitize(value) }),
        {}
      )
    );
}

export default {
  search,
  daily,
};
