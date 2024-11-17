import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

const Dot = ({ index, id, onClick, activeIndex }) => {
  const dotRef = useRef(null);

  useEffect(() => {
    if (dotRef.current) {
      if (activeIndex === index) {
        gsap.to(dotRef.current, {
          scale: 1, // Активируем масштабирование для текущего индекса
          backgroundColor: 'white', // Устанавливаем цвет для активной точки
          duration: 0.3,
          border: 'solid 1px rgba(66,86,122,0.1)',
        });
      } else {
        gsap.to(dotRef.current, {
          scale: 0.1, // Для остальных точек меньший масштаб
          backgroundColor: 'rgba(66,86,122)', // Цвет по умолчанию
          duration: 0.3,
        });
      }
    }
  }, [activeIndex, index]); // Перезапускаем при изменении activeIndex или индекса точки

  const handleHover = () => {
    gsap.to(dotRef.current, {
      scale: 1, // Увеличиваем размер при наведении
      backgroundColor: 'white', // Белый фон
      border: 'solid 1px rgba(66,86,122,0.1)', // Легкий бордер
      duration: 0.2,
    });
  };

  const handleHoverLeave = () => {
    if (activeIndex !== index) {
      gsap.to(dotRef.current, {
        scale: 0.1, // Возвращаемся к исходному масштабу
        backgroundColor: 'rgba(66,86,122)', // Возвращаем цвет
        border: 'none', // Убираем бордер
        duration: 0.2,
      });
    }
  };

  return (
    <div
      ref={dotRef}
      id={id}
      className={`w-16 h-16 bg-[rgba(66,86,122)] rounded-full dot cursor-pointer relative    ${
        activeIndex === index ? 'scale-100' : ''
      }`}
      onClick={() => onClick(index)}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverLeave}>
      {index + 1}
    </div>
  );
};

export default Dot;
