import React, { useEffect, useMemo, useRef, useState } from 'react';
import gsap from 'gsap';
const Counter = ({ data }) => {
  const firstNumberRef = useRef(null);
  const lastNumberRef = useRef(null);

  const animateNumber = (ref, value) => {
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
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
      <div className="flex space-x-[124px]">
        <h1 ref={firstNumberRef} className="text-[200px] text-[#5D5FEF]"></h1>
        <h1 ref={lastNumberRef} className="text-[200px] text-[#EF5DA8]"></h1>
      </div>
    </div>
  );
};

export default Counter;
