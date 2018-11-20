import React from 'react';

import Spinner from '../atoms/Spinner';
import style from '../App.module.css';

const SearchHandle = ({ isFetchingResults, query }) =>
  isFetchingResults ? <Spinner /> : <span className={style.search} />;

export default SearchHandle;
