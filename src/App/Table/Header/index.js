import React from 'react';
import { css } from 'react-emotion';
import Arrows from './Arrows';

const head = css`
  display: table;
  width: 100%;
`;

const row = css`
  box-sizing: border-box;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  background-color: #0be6af;
  height: 3.5rem;
  width: 100%;
  z-index: 1;
  border: 1px solid #ededed;
  @media (min-width: 540px) {
    display: table-row;
    padding: 0.5rem 0;
  }
`;

const title = css`
  flex: 0 0 100%;
  font-size: 1.2rem;
  padding-bottom: 0.2rem;
  @media (min-width: 540px) {
    padding-left: 130px;
    flex: none;
    width: 60%;
    text-align: left;
  }
`;

const buttonWrapper = css`
  flex-basis: 40%;
  @media (min-width: 540px) {
    flex: none;
    width: 8%;
  }
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
    width: 10%;
  }
`;

const Header = props => {
  return (
    <thead className={head}>
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
