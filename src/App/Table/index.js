import React from 'react';
import { css } from 'react-emotion';
import Header from './Header';
import Body from './Body';

const table = css`
  width: 100%;
  table-layout: fixed;
  margin-bottom: 0.5rem;
  border-collapse: collapse;
`;

const Table = props => {
  return (
    <table className={table}>
      <Header
        sortBy={props.sortBy}
        wordSortOrder={props.wordSortOrder}
        dateSortOrder={props.dateSortOrder}
      />
      <Body articles={props.articles} />
    </table>
  );
};

export default Table;
