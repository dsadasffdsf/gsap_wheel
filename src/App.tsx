import React, { useState } from 'react';
import dataArray from './data';
import { CircleContainer, Container, DividerLine, SliderWrapper, SwitchContainer, VerticalLine, Wrapper } from './App.styles';
import CircleGsap from './components/CircleGsap';
import Counter from './components/Counter';
import Title from './components/Title';
import Switch from './components/Switch';
import Slider from './components/Slider';

const App = () => {
  const totalPage = dataArray.length;

  const [data, setData] = useState(dataArray[0]);
  const [currentPage, setCurrentPage] = useState(0);

  const changePageHandler = (page: number) => {
    setData(dataArray[page]);
    setCurrentPage(page);
  };
  return (
    <Container>
      <Wrapper>
        <CircleContainer>
          <CircleGsap
            currentPage={currentPage}
            changePageHandler={changePageHandler}
            numberOfDots={totalPage}
          />
          <Counter data={data} />
          <Title />
          <DividerLine />
        </CircleContainer>

        <SwitchContainer>
          <Switch
            totalPage={totalPage}
            changePageHandler={changePageHandler}
            currentPage={currentPage}
          />
        </SwitchContainer>

        <SliderWrapper>
          <Slider data={data} />
        </SliderWrapper>

        {/* Vertical lines */}
        <VerticalLine position="0" />
        <VerticalLine position="50%" />
        <VerticalLine position="100%" />
      </Wrapper>
    </Container>
  );
};

export default App;
