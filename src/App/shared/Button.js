import React from 'react';
import styled, { keyframes } from 'react-emotion';

const buttonPop = keyframes`
  0%{
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
`;

const StyledButton = styled('button')`
  background-color: #0be6af;
  padding: 1.125rem 1rem;
  border-radius: 4rem;
  font-size: 0.9rem;
  cursor: pointer;
  border: 0;
  width: 40%;
  align-self: center;
  &:hover {
    animation: ${buttonPop} 0.4s ease;
  }
`;

const Button = props => {
  return <StyledButton onClick={props.onClick}> {props.text}</StyledButton>;
};

export default Button;
