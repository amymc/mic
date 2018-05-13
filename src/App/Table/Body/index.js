import React from 'react';
import { css } from 'react-emotion';
import Row from './Row';

const body = css`
  display: block;
  @media (min-width: 540px) {
    display: table;
    width: 100%;
    margin-top: 0;
  }
`;

const Body = props => {
  return (
    <tbody className={body}>
      {props.articles.map((article, i) => <Row key={i} item={article} />)}
    </tbody>
  );
};

export default Body;
