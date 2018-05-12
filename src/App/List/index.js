import React, { Component } from 'react';
import { css } from 'react-emotion';
import ListItem from './ListItem';

const body = css`
  display: block;
  margin-top: 3rem;
`;

const List = props => {
  return (
    <tbody className={body}>
      {props.articles.map((article, i) => <ListItem key={i} item={article} />)}
    </tbody>
  );
};

export default List;
