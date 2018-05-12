import React, { Component } from 'react';
import { css } from 'react-emotion';
import Arrows from './Arrows';

const base = css`
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

class Header extends Component {
  render() {
    const { props } = this;
    return (
      <tr className={base}>
        <th className={title}>Unpublished articles</th>
        <th>Author</th>
        <th>
          <button className={button} onClick={props.sortByWords}>
            Words
            <Arrows sortOrder={props.wordsSortOrder} />
          </button>
        </th>
        <th>
          <button className={button} onClick={props.sortByDate}>
            Submitted
            <Arrows sortOrder={props.dateSortOrder} />
          </button>
        </th>
      </tr>
    );
  }
}

export default Header;
