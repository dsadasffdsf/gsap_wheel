import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import styled from 'styled-components';
const DotWrapper = styled.div<{ active: boolean }>`
  width: 64px;
  height: 64px;
  background-color: rgba(66, 86, 122);
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  position: relative;
  transition: all 0.3s ease;
  scale: ${({ active }) => (active ? 1 : 0.1)};
  background-color: ${({ active }) => (active ? 'white' : 'rgba(66, 86, 122)')};
  border: ${({ active }) => (active ? 'solid 1px rgba(66,86,122,0.1)' : 'none')};

  &:hover {
    scale: 1;
    background-color: white;
    border: solid 1px rgba(66, 86, 122, 0.1);
  }
`;

const Dot = ({
  index,
  id,
  onClick,
  activeIndex,
}: {
  index: number;
  id: string;
  onClick: (index: number) => void;
  activeIndex: number;
}) => {
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
    <DotWrapper
      ref={dotRef}
      id={id}
      active={activeIndex === index}
      onClick={() => onClick(index)}
      onMouseEnter={handleHover}
      onMouseLeave={handleHoverLeave}
      className="dot">
      {index + 1}
    </DotWrapper>
  );
};

export default Dot;
