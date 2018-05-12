import React from 'react';
import styled from 'react-emotion';

const Arrow = styled('span')`
  color: ${props => (props.isActive ? '#000' : '#7f7f7f')};
`;

const Arrows = props => {
  return (
    <span>
      <Arrow isActive={props.sortOrder === 'descending'}>&#9660;</Arrow>
      <Arrow isActive={props.sortOrder === 'ascending'}>&#9650;</Arrow>
    </span>
  );
};

export default Arrows;
