import React from 'react';
import SliderButton from './SliderButton';
import styled from 'styled-components';

const Container = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 21px;
`;

const PageInfo = styled.div`
  font-size: 16px;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;
`;

const Switch = ({
  totalPage,
  currentPage,
  changePageHandler,
}: {
  totalPage: number;
  currentPage: number;
  changePageHandler: (currentPage: number) => void;
}) => {
  const plusPageHandler = () => {
    if (currentPage + 1 != totalPage) {
      changePageHandler(currentPage + 1);
    }
  };
  const minusPageHandler = () => {
    if (currentPage != 0) {
      changePageHandler(currentPage - 1);
    }
  };
  return (
    <>
      <Container>
        <PageInfo>
          0{currentPage + 1}/0{totalPage}
        </PageInfo>
        <ButtonContainer>
          <SliderButton rotate={'180'} onClick={minusPageHandler} />
          <SliderButton rotate={''} onClick={plusPageHandler} />
        </ButtonContainer>
      </Container>
    </>
  );
};

export default Switch;
