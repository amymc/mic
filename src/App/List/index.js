import React, { Component } from 'react';
import { css } from 'react-emotion';
import ListItem from './ListItem';

const base = css`
  display: block;
  margin-top: 3rem;
`;

class List extends Component {
  render() {
    return (
      <tbody className={base}>
        {this.props.articles.map((article, i) => (
          <ListItem key={i} item={article} />
        ))}
      </tbody>
    );
  }
}

export default List;
