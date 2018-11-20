import React from 'react';

import Detail from './pages/Detail';
import Search from './pages/Search';
import style from './App.module.css';
import { connect } from '../store';

const App = ({ isEditing }) => (
  <div className={`d-flex flex-column ${style.app}`}>
    {isEditing ? <Search /> : <Detail />}
  </div>
);

export default connect()(App);
