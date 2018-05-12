import React, { Component } from 'react';
import { css } from 'react-emotion';
import Arrows from './Arrows';

const Base = css`
  position: fixed;
  display: flex;
  justify-content: space-between;
  background-color: #0be6af;
  height: 3rem;
  width: 100%;
`;

const Title = css`
  flex-basis: 45%;
`;

const Button = css`
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
      <tr className={Base}>
        <th className={Title}>Unpublished articles</th>
        <th>Author</th>
        <th>
          <button className={Button} onClick={props.sortByWords}>
            Words
            <Arrows sortOrder={props.wordsSortOrder} />
          </button>
        </th>
        <th>
          <button className={Button} onClick={props.sortByDate}>
            Submitted
            <Arrows sortOrder={props.dateSortOrder} />
          </button>
        </th>
      </tr>
    );
  }
}

export default Header;
