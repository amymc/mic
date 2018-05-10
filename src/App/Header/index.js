import React, { Component } from 'react';
import { css } from 'react-emotion';

const Base = css`
  position: fixed;
  display: flex;
  justify-content: space-between;
  background-color: #0be6af;
  height: 3rem;
  width: 100%;
`;

const title = css`
  flex-basis: 45%;
`;

class Header extends Component {
  render() {
    const { props } = this;
    return (
      <tr className={Base}>
        <th className={title}>Unpublished articles</th>
        <th>Author</th>
        <th>
          <button onClick={props.sort}>Words</button>
        </th>
        <th>Submitted</th>
      </tr>
    );
  }
}

export default Header;
