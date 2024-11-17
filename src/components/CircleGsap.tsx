import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ReactComponent as Circle } from '../assets/Ellipse304.svg';
// import { ReactComponent as Dot } from '../assets/Ellipse 339.svg';
import gsap from 'gsap';
import { MotionPathPlugin } from 'gsap/MotionPathPlugin';
import Dot from './Dot';
import styled from 'styled-components';

const RADIUS = 265; // Радиус окружности

//! для tl использовать useref ,а не useState
//! проверить с другим количеством точек

const CircleWrapper = styled.div<{ radius: number }>`
  width: ${({ radius }) => radius * 2}px;
  height: ${({ radius }) => radius * 2}px;
  position: relative;
  z-index: 50;
`;

const CircleStyled = styled(Circle)`
  transform: rotate(30deg);
`;

const CircleGsap = ({
  numberOfDots,
  currentPage,
  changePageHandler,
}: {
  numberOfDots: number;
  currentPage: number;
  changePageHandler: (index: number) => void;
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [tl, setTl] = useState<gsap.core.Timeline | null>(null);

  const tracker = useRef({ item: 0 });
  const [activeIndex, setActiveIndex] = useState(0);

  let itemStep = 1 / numberOfDots;
  gsap.registerPlugin(MotionPathPlugin);
  let wrapProgress = gsap.utils.wrap(0, 1);
  let wrapTracker = gsap.utils.wrap(0, numberOfDots);

  let snap = gsap.utils.snap(itemStep);

  useLayoutEffect(() => {
    if (!containerRef.current) return;
  
    const dotsArray = Array.from(containerRef.current.querySelectorAll('.dot'));  // Преобразуем в массив
  console.log(dotsArray);
  
    let tl = gsap.timeline({ paused: true });
    tl = gsap.timeline({
      paused: true,
      onUpdate: () => {
        const progress = tl.progress();
        const currentIndex = wrapTracker(Math.round(progress * numberOfDots)); 
        tracker.current.item = currentIndex;
        setActiveIndex(currentIndex); 
      },
    });
  
    setTl(tl);

    gsap.set(dotsArray, {
      // @ts-ignore
      motionPath: {
        path: '#path',
        align: '#path',
        alignOrigin: [0.5, 0.5],
        end: (i: number) => (i / dotsArray.length) as number,
      },
      // scale: 0.9,
    });
    // Обновляем анимацию вращения
    tl.to(".wrapper", {
      rotation: 360,
      transformOrigin: 'center',
      duration: 1,
      ease: 'none',
    });
    tl.to(
      dotsArray,
      {
        rotation: -360,
        transformOrigin: 'center',
        duration: 1,
        ease: 'none',
      },
      0,
    );
    tl.to(
      tracker.current,
      {
        item: numberOfDots,
        duration: 1,
        ease: 'none',
        modifiers: {
          item(value) {
            return wrapTracker(numberOfDots - Math.round(value));
          },
        },
      },
      0,
    );
  }, [numberOfDots]);

  // Функция для обновления угла при каждом клике
  const move = (index: number) => {
    let current = tracker.current.item;

    if (index === current) {
      return;
    }

    let diff = index - current;

    // Проверяем, нужно ли двигаться в обратную сторону
    if (Math.abs(diff) > numberOfDots / 2) {
      if (diff > 0) {
        diff = diff - numberOfDots; // Движение против часовой стрелки
      } else {
        diff = diff + numberOfDots; // Движение по часовой стрелке
      }
    }

    console.log(`Current: ${current}, Target: ${index}, Diff: ${diff}`);

    tracker.current.item = index; // Обновляем текущее значение
    handlePlay(diff * itemStep);
  };

  const handlePlay = (itemStep: number) => {
    if (!tl) return;

    gsap.to(tl, {
      progress: snap(tl.progress() + itemStep),
      modifiers: {
        progress: wrapProgress,
      },
      onComplete: () => {
        // Синхронизация после завершения анимации
        const progress = tl.progress();
        tracker.current.item = wrapTracker(Math.round(progress * numberOfDots));
      },
    });
  };
  useEffect(() => {
    if (tl) {
      move(currentPage);
    }
  }, [tl, currentPage]);
  return (
    <>
      <CircleWrapper radius={RADIUS} ref={containerRef} className="wrapper">
        <CircleStyled width={`${RADIUS * 2}`} height={`${RADIUS * 2}`} className="rotate-[30deg]" />
        {Array.from({ length: numberOfDots }).map((_, index) => (
          // Создаём точки с уникальными ID и классами
          <Dot
            key={index}
            id={`dot${index}`}
            index={index}
            onClick={() => changePageHandler(index)}
            activeIndex={activeIndex}
          />
        ))}
      </CircleWrapper>
    </>
  );
};

export default CircleGsap;
