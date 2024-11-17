import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  left: 0;
  top: -38px;
`;

const StyledTitle = styled.div`
  font-size: 56px;
  width: 353px;
  background: linear-gradient(to right, #5d5fef, #ef5da8); 
  -webkit-background-clip: text;
  color: #42567A;
`;

const GradLine = styled.div`
  position: relative;
  padding-left: 50px;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 10px; 
    height: 100%; 
    background: linear-gradient(0deg, rgba(56, 119, 238, 1) 0%, rgba(239, 93, 168, 1) 100%);
  }
`;

const Title = () => {
  return (
    <Wrapper>
      <GradLine>
        <StyledTitle>Исторические даты</StyledTitle>
      </GradLine>
    </Wrapper>
  );
};

export default Title;
