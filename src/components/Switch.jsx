import React from 'react';
import SliderButton from './SliderButton';

const Switch = ({ totalPage, currentPage, changePageHandler }) => {
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
      <div className="space-y-[21px] absolute bottom-0 left-0">
        <div>
          0{currentPage + 1}/0{totalPage}
        </div>
        <div className="flex space-x-[20px]">
          <SliderButton rotate={'rotate-[180deg]'} onClick={minusPageHandler} />
          <SliderButton rotate={''} onClick={plusPageHandler} />
        </div>
      </div>
    </>
  );
};

export default Switch;
