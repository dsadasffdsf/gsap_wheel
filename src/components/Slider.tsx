import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import { Navigation } from 'swiper/modules';
import SliderButton from './SliderButton';
import styled from 'styled-components';

const SliderWrapper = styled.div`
  position: relative;
  width: 100%;
`;
const NavButton = styled.div<{ hidden: boolean; rotate: string }>`
  position: absolute;
  z-index: 40;
  top: 50%;
  transform: translateY(-50%);
  font-size: 3rem;
  cursor: pointer;
  left: ${({ rotate }) => (rotate === 'rotate-[180deg]' ? '0' : 'unset')};
  right: ${({ rotate }) => (rotate === '' ? '0' : 'unset')};
  visibility: ${({ hidden }) => (hidden ? 'hidden' : 'visible')};
`;
const SlideContainer = styled.div`
  width: 320px;
  height: 135px;
`;
const DateText = styled.h3`
  margin-bottom: 15px;
  color: #3877ee;
  font-size: 25px;
`;
const Slider = ({ data }: { data: { date: string; description: string }[] }) => {
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const swiperRef = useRef<SwiperRef | null>(null);

  const handleSlideChange = () => {
    const swiperInstance = swiperRef.current?.swiper;
    if (!swiperInstance) return;
    setIsLastSlide(swiperInstance.isEnd);
    setIsFirstSlide(swiperInstance.isBeginning);
  };

  return (
    <SliderWrapper>
      <Swiper
        spaceBetween={80}
        slidesPerView={3}
        slidesPerGroup={1}
        navigation={{
          prevEl: '.swiper-button-prev',
          nextEl: '.swiper-button-next',
        }}
        modules={[Navigation]}
        ref={swiperRef}
        onSlideChange={handleSlideChange}
        onInit={handleSlideChange}
        style={{
          marginLeft: '8rem',
          marginRight: '8rem',
        }}>
        {data.map((item, index) => (
          <SwiperSlide key={index}>
            <SlideContainer>
              <DateText>{item.date}</DateText>
              <p>{item.description}</p>
            </SlideContainer>
          </SwiperSlide>
        ))}
      </Swiper>
      <NavButton hidden={isFirstSlide} rotate="rotate-[180deg]" className="swiper-button-prev">
        <SliderButton rotate="180" />
      </NavButton>
      <NavButton hidden={isLastSlide} rotate="" className="swiper-button-next">
        <SliderButton rotate="" />
      </NavButton>
    </SliderWrapper>
  );
};

export default Slider;
