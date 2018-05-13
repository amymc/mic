import React from 'react';
import styled, { css } from 'react-emotion';

const wrapper = css`
  @media (min-width: 540px) {
    display: block;
  }
`;

const Arrow = styled('span')`
  color: ${props => (props.isActive ? '#000' : '#7f7f7f')};
`;

const Arrows = props => {
  return (
    <span className={wrapper}>
      <Arrow isActive={props.sortOrder === 'descending'}>&#9660;</Arrow>
      <Arrow isActive={props.sortOrder === 'ascending'}>&#9650;</Arrow>
    </span>
  );
};

export default Arrows;
