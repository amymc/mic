import React, { Component } from 'react';
import { css } from 'react-emotion';
import ListItem from './ListItem';

const list = css`
  margin-top: 3rem;
`;

class List extends Component {
  render() {
    return (
      <ul className={list}>
        {this.props.articles.map((article, i) => (
          <ListItem key={i} item={article} />
        ))};
      </ul>
    );
  }
}

export default List;
