import React, { Component } from 'react';
import { css } from 'react-emotion';

const header = css`
  position: fixed;
  background-color: #0be6af;
  padding: 1rem;
  height: 3rem;
  width: 100%;
`;

class Header extends Component {
  render() {
    return (
      <header className={header}>
        <span>Unpublished articles</span>
        <span>Author</span>
        <span>Words</span>
        <span>Submitted</span>
      </header>
    );
  }
}

export default Header;
