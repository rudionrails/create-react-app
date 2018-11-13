import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

const create = ({
  settings = {},
  container,
  lng,
}) => {
  ReactDOM.render(
    <App lng={lng} settings={settings} />,
    container,
  );

  return {
    destroy: () => ReactDOM.unmountComponentAtNode(container),
  };
};

export {
  create,
};
