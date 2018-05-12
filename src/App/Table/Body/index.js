import React from 'react';
import { css } from 'react-emotion';
import Row from './Row';

const body = css`
  display: block;
  margin-top: 4rem;
  @media (min-width: 540px) {
    margin-top: 3.5rem;
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
