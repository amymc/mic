import React, { Component } from 'react';
import { css } from 'react-emotion';
import ListItem from './ListItem';

const Base = css`
  display: block;
  margin-top: 5rem;
`;

class List extends Component {
  render() {
    return (
      <tbody className={Base}>
        {this.props.articles.map((article, i) => (
          <ListItem key={i} item={article} />
        ))}
      </tbody>
    );
  }
}

export default List;
