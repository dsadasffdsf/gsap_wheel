import React from 'react';

const SliderButton = ({ rotate, onClick ,disable }) => {
  return (
    <div
      className={`btn_shadow w-[40px] h-[40px] rounded-full flex justify-center ${disable} items-center ${rotate}`}
      onClick={onClick}>
      <svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M1 1L6 6L1 11" stroke="#3877EE" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default SliderButton;
