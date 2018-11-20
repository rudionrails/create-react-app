import React from 'react';
import ReactDOM from 'react-dom';

import { StoreProvider } from './store';
import App from './components/App';

export function create({ state = {}, container, lng }) {
  ReactDOM.render(
    <StoreProvider state={state} lng={lng}>
      <App />
    </StoreProvider>,
    container
  );

  return {
    destroy: () => ReactDOM.unmountComponentAtNode(container),
  };
}
