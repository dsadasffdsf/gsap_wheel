import React from 'react';
import styled from 'styled-components';
const Button = styled.div<{ rotate?: string; disable?: string }>`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0px 0px 15px rgba(56, 119, 238, 0.1);
  cursor: pointer;
  ${({ rotate }) => rotate && `transform: rotate(${rotate}deg);`}
  ${({ disable }) => disable && `opacity: 0.5; pointer-events: none;`}
`;

const SliderButton = ({
  rotate,
  onClick,
  disable,
}: {
  rotate?: string;
  onClick?: () => void;
  disable?: string;
}) => {
  return (
    <Button rotate={rotate} disable={disable} onClick={onClick}>
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2" />
      </svg>
    </Button>
  );
};

export default SliderButton;
