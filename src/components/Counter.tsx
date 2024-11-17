import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

const NumberContainer = styled.div`
  display: flex;
  gap: 124px;
`;

const Number = styled.h1<{ color: string }>`
  font-size: 200px;
  color: ${({ color }) => color};
`;

const Counter = ({ data }: { data: { date: string; description: string }[] }) => {
  const firstNumberRef = useRef(null);
  const lastNumberRef = useRef(null);

  const animateNumber = (ref: React.RefObject<HTMLHeadingElement>, value: string) => {
    gsap.to(ref.current, {
      innerText: value,
      duration: 1,
      snap: { innerText: 1 },
    });
  };

  useEffect(() => {
    animateNumber(firstNumberRef, data[0].date);
    animateNumber(lastNumberRef, data[data.length - 1].date);
  }, [data]);

  return (
    <Wrapper>
      <NumberContainer>
        <Number ref={firstNumberRef} color="#5D5FEF"></Number>
        <Number ref={lastNumberRef} color="#EF5DA8"></Number>
      </NumberContainer>
    </Wrapper>
  );
};

export default Counter;
