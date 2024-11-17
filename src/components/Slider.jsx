import React, { useRef, useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { Navigation } from 'swiper/modules';
import SliderButton from './SliderButton';

const Slider = ({ data }) => {
  const [isLastSlide, setIsLastSlide] = useState(false);
  const [isFirstSlide, setIsFirstSlide] = useState(true);
  const swiperRef = useRef(null);

  const handleSlideChange = () => {
    const swiperInstance = swiperRef.current?.swiper;

    setIsLastSlide(swiperInstance.isEnd);
    setIsFirstSlide(swiperInstance.isBeginning);
  };

  return (
    <div className="relative w-full">
      <Swiper
        spaceBetween={80} // Расстояние между слайдами
        slidesPerView={3} // Количество слайдов, отображаемых одновременно
        slidesPerGroup={1} // Прокрутка по одному слайду за раз
        navigation={{
          prevEl: '.swiper-button-prev', // Привязка кастомных кнопок
          nextEl: '.swiper-button-next',
        }}
        modules={[Navigation]}
        ref={swiperRef}
        onSlideChange={handleSlideChange} // Обновление состояния при смене слайда
        onInit={handleSlideChange} // Устанавливает начальное состояние
        className="mx-32">
        {data.map((item, index) => (
          <SwiperSlide key={index} className="select-none w-[320px]">
            <div className="w-[320px] h-[135px]">
              <h3 className="mb-[15px] text-[#3877EE] text-[25px]">{item.date}</h3>
              <p>{item.description}</p>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      <div
        className={`swiper-button-prev absolute z-40 top-1/2 left-0 transform -translate-y-1/2 text-3xl cursor-pointer ${
          isFirstSlide ? 'hidden' : ''
        }`}>
        <SliderButton rotate={'rotate-[180deg]'} />
      </div>
      <div
        className={`swiper-button-next absolute z-40 top-1/2 right-0 transform -translate-y-1/2 text-3xl cursor-pointer ${
          isLastSlide ? 'hidden' : ''
        }`}>
        <SliderButton rotate={''} />
      </div>
    </div>
  );
};

export default Slider;
