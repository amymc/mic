import React from 'react';
import { css } from 'react-emotion';
import { parseTimestamp } from '../../../utils';

const row = css`
  margin-bottom: 0.5rem;
  &:hover {
    background-color: black;
    color: #0be6af;
  }
`;

// display: flex;
// flex-direction: row;
// align-items: center;
const cell = css`
  padding: 0 0.7rem;
`;
//width: 10%;

const small = css`
  width: 5%;
`;

const imageWrapper = css``;
//   display: flex;
// width: 12%;
// margin: 0.5rem 0;

const image = css`
  width: 100px;
  height: 63px;
  vertical-align: middle;
  margin: 0.2rem 0;
`;

// padding: 0 0.5rem;

const title = css``;
// width: 60%;
//   flex-grow: 1;

const Row = props => {
  const { item } = props;
  return (
    <tr className={row}>
      <td
        className={css`
          ${cell} ${imageWrapper};
        `}
      >
        <img className={image} src={item.image} alt="" />
      </td>
      <td
        className={css`
          ${cell} ${title};
        `}
      >
        {item.title}
      </td>
      <td className={cell}>
        {item.profile.first_name} {item.profile.last_name}
      </td>
      <td
        className={css`
          ${cell} ${small};
        `}
      >
        {item.words}
      </td>
      <td className={cell}>{parseTimestamp(item.publish_at)} ago</td>
    </tr>
  );
};

export default Row;
