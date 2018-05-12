import React, { Component } from 'react';
import { css } from 'react-emotion';
import Arrows from './Arrows';

const row = css`
  position: fixed;
  display: flex;
  justify-content: space-between;
  background-color: #0be6af;
  height: 3rem;
  width: 100%;
`;

const title = css`
  flex-basis: 65%;
`;

const button = css`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
`;

const Header = props => {
  return (
    <tr className={row}>
      <th className={title}>Unpublished articles</th>
      <th>Author</th>
      <th>
        <button className={button} onClick={() => props.sortBy('words')}>
          Words
          <Arrows sortOrder={props.wordSortOrder} />
        </button>
      </th>
      <th>
        <button className={button} onClick={() => props.sortBy('date')}>
          Submitted
          <Arrows sortOrder={props.dateSortOrder} />
        </button>
      </th>
    </tr>
  );
};

export default Header;
