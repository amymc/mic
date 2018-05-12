import React from 'react';
import { css } from 'react-emotion';
import { parseTimestamp } from '../../../utils';

const row = css`
  display: block;
  background-color: white;
  border: 1px solid #ededed;
  margin: 0.5rem;
  padding: 0.2rem;
  &:hover {
    background-color: black;
    color: #0be6af;
  }
  @media (min-width: 540px) {
    display: table-row;
    border: none;
    background-color: #fafafa;
    margin-bottom: 0.5rem;
    padding: 0;
  }
`;

const cell = css`
  position: relative;
  display: block;
  padding-left: 30%;
  &:before {
    position: absolute;
    left: 6px;
    content: attr(data-column);
    font-weight: bold;
  }
  @media (min-width: 540px) {
    display: table-cell;
    position: static;
    padding: 0 0.7rem;
    &:before {
      display: none;
    }
  }
`;

const imageWrapper = css`
  display: none;
  @media (min-width: 540px) {
    display: table-cell;
  }
`;

const image = css`
  width: 100px;
  height: 63px;
  vertical-align: middle;
  margin: 0.2rem 0;
`;

const Row = props => {
  const { item } = props;
  return (
    <tr className={row}>
      <td className={imageWrapper}>
        <img className={image} src={item.image} alt="" />
      </td>
      <td data-column="title" className={cell}>
        {item.title}
      </td>
      <td data-column="author" className={cell}>
        {item.profile.first_name} {item.profile.last_name}
      </td>
      <td data-column="words" className={cell}>
        {item.words}
      </td>
      <td data-column="submitted" className={cell}>
        {parseTimestamp(item.publish_at)} ago
      </td>
    </tr>
  );
};

export default Row;
