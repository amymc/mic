import React from 'react';
import { css } from 'react-emotion';
import Arrows from './Arrows';

const row = css`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  position: fixed;
  background-color: #0be6af;
  height: 3.5rem;
  width: 100%;
  z-index: 1;
  border: 1px solid #ededed;
  @media (min-width: 540px) {
    display: table-row;
  }
`;

// display: none;
//   @media (min-width: 540px) {
//     position: fixed;
//     display: flex;
//     justify-content: space-between;
//     background-color: #0be6af;
//     height: 3rem;
//     width: 100%;
//   }

const title = css`
  flex: 0 0 100%;
  font-size: 1.2rem;
  padding-bottom: 0.2rem;
  @media (min-width: 540px) {
    display: table-cell;
  }
`;

const buttonWrapper = css`
  flex-basis: 40%;
`;

const button = css`
  background: none;
  border: none;
  padding: 0;
  font: inherit;
  cursor: pointer;
`;

const hidden = css`
  display: none;
  @media (min-width: 540px) {
    display: table-cell;
  }
`;

const Header = props => {
  return (
    <thead>
      <tr className={row}>
        <th className={title}>Unpublished articles</th>
        <th className={hidden}>Author</th>
        <th className={buttonWrapper}>
          <button className={button} onClick={() => props.sortBy('words')}>
            Words
            <Arrows sortOrder={props.wordSortOrder} />
          </button>
        </th>
        <th className={buttonWrapper}>
          <button className={button} onClick={() => props.sortBy('date')}>
            Submitted
            <Arrows sortOrder={props.dateSortOrder} />
          </button>
        </th>
      </tr>
    </thead>
  );
};

export default Header;
