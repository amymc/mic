import React, { Component } from 'react';

class Header extends Component {
  render() {
    return (
      <header className="App-header">
        <span>Unpublished articles</span>
        <span>Author</span>
        <span>Words</span>
        <span>Submitted</span>
      </header>
    );
  }
}

export default Header;
